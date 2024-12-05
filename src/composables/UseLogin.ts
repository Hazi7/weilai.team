import { useLocalStorageWithExpire } from "@/composables/useLocalStorage";
import { useRequest } from "@/composables/useRequest";
import { useLoginStore } from "@/store/useLoginStore";
import { useRouter } from "vue-router";
import { useAlert } from "./alert";

const loginStore = useLoginStore();
const { setLocalStorageWithExpire, getLocalStorageWithExpire } =
  useLocalStorageWithExpire();
const { showAlert } = useAlert();
interface EmailResponse {
  code: number;
  message?: string;
}

interface Data {
  code: number;
  message?: string;
  data?: {
    token: string;
    userId: string;
  };
}
export default function () {
  const router = useRouter();
  const { data, error, loading, executeRequest } = useRequest();

  async function getLogin(account: string, password: string) {
    if (!account) {
      showAlert("账号不能为空", "waring");
      // loginError.value = '账号不能为空'
    } else if (!password) {
      showAlert("密码不能为空", "waring");
      // loginError.value = '密码不能为空'
    } else {
      // loginError.value = ''
      await executeRequest({
        url: `/index/login`,
        method: "post",
        requestData: { account, password },
      }); // 在这里传入请求的 URL 和 method
      const res = data.value as Data;
      const resData = res.data;
      if (res.code == 1000) {
        if (resData) {
          setLocalStorageWithExpire("token", resData.token, 1000 * 60 * 60);
          setLocalStorageWithExpire("userId", resData.userId, 1000 * 60 * 60);
          router.push("/");
        } else {
          // loginError.value = ''
          await executeRequest({
            url: `/index/login`,
            method: "post",
            requestData: { account, password },
          }); // 在这里传入请求的 URL 和 method
          const res = data.value as Data;
          const resData = res.data;
          console.log(error);
          console.log(data);
          if (res.code == 1000) {
            if (resData) {
              setLocalStorageWithExpire("token", resData.token, 1000 * 60 * 60);
              setLocalStorageWithExpire(
                "userId",
                resData.userId,
                1000 * 60 * 60,
              );
              router.push("/");
            } else {
              showAlert("服务器返回数据异常", "error");
            }
          }
          if (res.code == 1002) {
            showAlert("用户名不存在", "error");
            // loginError.value = '用户名不存在'
          } else if (res.code == 1001) {
            showAlert("密码错误", "error");
            // loginError.value = '用户名不存在'
          } else if (res.code == 1003) {
            showAlert("账户已在别处登录，请重新登录", "waring");
            // loginError.value = '用户名不存在'
          } else if (res.code == 403) {
            showAlert("请勿重新登录！", "waring");
          }
        }
      }
      if (res.code == 1002) {
        showAlert("用户名不存在", "error");
        // loginError.value = '用户名不存在'
      } else if (res.code == 1001) {
        showAlert("密码错误", "error");
        // loginError.value = '用户名不存在'
      } else if (res.code == 1003) {
        showAlert("账户已在别处登录，请重新登录", "waring");
        // loginError.value = '用户名不存在'
      }
    }
  }

  async function useGetCode(email: string) {
    if (!email) {
      // loginError.value = "邮箱不能为空"
      showAlert("邮箱不能为空", "waring");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      // loginError.value = "请输入正确的邮箱"
      showAlert("请输入正确的邮箱", "waring");
    } else {
      // loginError.value = ''
      await executeRequest({
        url: `/index/sendEmailCode/${email}`,
        method: "get",
      });
      const res = data.value as EmailResponse;
      if (res.code == 1007) {
        showAlert("验证码发送成功", "pass");
        loginStore.startCountdown();
        // alert("验证码发送成功!");
      } else if (res.code == 1005) {
        showAlert("验证码未过期", "waring");
        // alert("验证码未过期")
      } else if (res.code == 1004) {
        showAlert("邮箱格式错误", "waring");
        // alert("邮箱格式错误")
      } else if (res.code == 1002) {
        showAlert("该用户不存在", "error");
        // alert("该用户不存在")
      }
    }
  }

  async function useResetPassword(
    email: string,
    code: string,
    password: string,
    passwordAgin: string,
  ) {
    if (password == passwordAgin) {
      await executeRequest({
        url: `/index/findPassword?email=${email}&code=${code}&newPassword=${password}`,
        method: "put",
      });
      const res = data.value as Data;
      if (res.code == 1006) {
        showAlert("验证码已过期", "error");
        // alert("验证码已过期")
      } else if (res.code == 1009) {
        showAlert("密码修改成功", "pass");
        // alert("密码修改成功")
      }
    } else {
      showAlert("两次密码不一致", "waring");
      // alert("两次密码不一致")
    }
  }

  async function logout() {
    await executeRequest({ url: `/index/logout`, method: "delete" });
    console.log("退出成功");
  }

  return {
    data,
    error,
    loading,
    getLogin,
    useGetCode,
    useResetPassword,
    logout,
  };
}
