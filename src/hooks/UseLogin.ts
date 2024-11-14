import axios from 'axios'
import { reactive } from 'vue'
import { useRequest } from '@/composables/useRequest';


export default function () {

    const { data, error, loading, executeRequest } = useRequest<User>();

    async function getLogin(account, password){
        await executeRequest({ url: `/index/login?account=${account}&password=${password}`, method: 'post', data: { account, password } })  // 在这里传入请求的 URL 和 method
        console.log(data.value);
        if(data.value.code == 1000){
            localStorage.setItem('token',data.value.data.token)
            console.log(this);
            // this.$router.push({ path: '/home' })
        }
    }

    return { data, error, loading, getLogin }
}