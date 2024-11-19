import axios from 'axios'
import { useRouter } from 'vue-router';
import { reactive } from 'vue'
import { useRequest } from '@/composables/useRequest';

export default function () {
    const router = useRouter();
    const { data, error, loading, executeRequest } = useRequest();

    async function getLogin(account, password) {
        // if (account || password){
        //     alert()
        // }
        await executeRequest({ url: `/index/login?account=${account}&password=${password}`, method: 'post', data: { account, password } })  // 在这里传入请求的 URL 和 method
        console.log(data.value);
        if (data.value.code == 1000) {
            localStorage.setItem('token', data.value.data.token)
            // setLocalStorageWithExpire('token', data.value.data.token, 1000*60*30);
            router.push('/');
            // window.location.href = '/';
        }
    }



    async function useGetCode(email) {
        console.log(email);
        await executeRequest({ url: `/index/sendEmailCode/${email}`, method: 'get' })
        if (data.value.code == 1007) {
            alert("验证码发送成功!");
        } else if (data.value.code == 1005) {
            alert("验证码未过期")
        } else if (data.value.code == 1004) {
            alert("邮箱格式错误")
        } else if (data.value.code == 1002) {
            alert("该用户不存在")
        }
        console.log(data.value);
    }

    async function useResetPassword(email, code, password, passwordAgin) {
        if (password == passwordAgin) {
            await executeRequest({ url: `/index/findPassword?email=${email}&code=${code}&newPassword=${password}`, method: 'put' })
            if (data.value.code == 1006) {
                alert("验证码已过期")
            } else if (data.value.code == 1009) {
                alert("密码修改成功")
            }
            console.log(data);
        } else {
            alert("两次密码不一致")
        }

    }

    return { data, error, loading, getLogin, useGetCode, useResetPassword }
}