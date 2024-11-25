import axios from 'axios'
import { ref, reactive } from 'vue'
import { useRequest } from '@/composables/useRequest';
import { useAlert } from './alert';

export default function () {
    const { data, error, loading, executeRequest } = useRequest();
    const { showAlert } = useAlert()
    const classListData = []

    async function getClass() {
        await executeRequest({ url: `/recruit/user/listAllClass`, method: 'get' })
        classListData.value = data.value.data
    }


    async function getCode(email) {
        if (!email) {
            // loginError.value = "邮箱不能为空"
            showAlert('邮箱不能为空', 'waring')
        } else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)) {
            // loginError.value = "请输入正确的邮箱"
            showAlert('请输入正确的邮箱', 'waring')
        } else {
            console.log(email);
            await executeRequest({ url: `/recruit/user/sendEmailCode/${email}`, method: 'get' })
            if (data.value.code == 200) {
                alert("验证码发送成功!");
            } else if (data.value.code == 1005) {
                alert("验证码未过期")
            } else if (data.value.code == 1004) {
                alert("邮箱格式错误")
            }
        }
        console.log(data.value);
    }

    async function sentStuInfo(stuInform) {
        console.log(stuInform);
        await executeRequest({ url: '/recruit/user/register', method: 'post', headers: { 'Content-Type': 'multipart/form-data' }, data: stuInform })
        console.log(data, error);
    }
    return { getClass, classListData, getCode, sentStuInfo }
}