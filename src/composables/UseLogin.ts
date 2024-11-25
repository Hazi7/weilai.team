import axios from 'axios'
import { useRouter } from 'vue-router';
import { reactive } from 'vue'
import { useRequest } from '@/composables/useRequest';
import { useLocalStorageWithExpire } from '@/composables/useLocalStorage';
import { ref } from 'vue';
import { useAlert } from './alert';

const { setLocalStorageWithExpire, getLocalStorageWithExpire } = useLocalStorageWithExpire();
const { showAlert } = useAlert();
export default function () {
    const router = useRouter();
    const { data, error, loading, executeRequest } = useRequest();

    async function getLogin(account, password) {
        if (!account) {
            showAlert('账号不能为空', 'waring')
            // loginError.value = '账号不能为空'
        } else if (!password) {
            showAlert('密码不能为空', 'waring')
            // loginError.value = '密码不能为空'
        } else {
            // loginError.value = ''
            await executeRequest({ url: `/index/login?account=${account}&password=${password}`, method: 'post', data: { account, password }, headers: { 'Content-Type': 'multipart/form-data' } })  // 在这里传入请求的 URL 和 method
            console.log(data);
            console.log('111',error.value);
            if (data.value.code == 1000) {
                setLocalStorageWithExpire('token', data.value.data.token, 1000 * 60 * 30);
                setLocalStorageWithExpire('userId', data.value.data.userId, 1000 * 60 * 30);
                router.push('/');
            } else if (data.value.code == 1002) {
                showAlert('用户名不存在', 'error')
                // loginError.value = '用户名不存在'
            } else if (data.value.code == 1001) {
                showAlert('密码错误', 'error')
                // loginError.value = '用户名不存在'
            }
        }
    }

    async function useGetCode(email) {
        if (!email) {
            // loginError.value = "邮箱不能为空"
            showAlert('邮箱不能为空', 'waring')
        } else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)) {
            // loginError.value = "请输入正确的邮箱"
            showAlert('请输入正确的邮箱', 'waring')
        }
        else {
            // loginError.value = ''
            await executeRequest({ url: `/index/sendEmailCode/${email}`, method: 'get' })
            if (data.value.code == 1007) {
                showAlert('验证码发送成功', 'pass')
                // alert("验证码发送成功!");
            } else if (data.value.code == 1005) {
                showAlert('验证码未过期', 'waring')
                // alert("验证码未过期")
            } else if (data.value.code == 1004) {
                showAlert('邮箱格式错误', 'waring')
                // alert("邮箱格式错误")
            } else if (data.value.code == 1002) {
                showAlert('该用户不存在', 'error')
                // alert("该用户不存在")
            }
        }
    }

    async function useResetPassword(email, code, password, passwordAgin) {
        if (password == passwordAgin) {
            await executeRequest({ url: `/index/findPassword?email=${email}&code=${code}&newPassword=${password}`, method: 'put' })
            if (data.value.code == 1006) {
                showAlert('验证码已过期', 'error')
                // alert("验证码已过期")
            } else if (data.value.code == 1009) {
                showAlert('密码修改成功', 'pass')
                // alert("密码修改成功")
            }
            console.log(data);
        } else {
            showAlert('两次密码不一致', 'waring')
            // alert("两次密码不一致")
        }

    }

    return { data, error, loading, getLogin, useGetCode, useResetPassword }
}