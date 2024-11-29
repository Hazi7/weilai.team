import axios from 'axios'
import { ref, reactive } from 'vue'
import { useRequest } from '@/composables/useRequest';
import { useAlert } from './alert';
import { applicationStore } from '@/store/applicationStore';

const useApplicationStore = applicationStore()

interface ClassList {
    data: string[]
}

interface EmailResponse {
    code: number;
    message?: string;
}
export default function () {
    const { data, error, loading, executeRequest } = useRequest();
    const { showAlert } = useAlert()
    const classListData = ref<string[]>([])

    async function getClass() {
        await executeRequest({ url: `/recruit/user/listAllClass`, method: 'get' })
        const res = data.value as ClassList;
        classListData.value = res.data
    }


    async function getCode(email: string) {
        if (!email) {
            // loginError.value = "邮箱不能为空"
            showAlert('邮箱不能为空', 'waring')
        } else if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)) {
            // loginError.value = "请输入正确的邮箱"
            showAlert('请输入正确的邮箱', 'waring')
        } else {
            await executeRequest({ url: `/recruit/user/sendEmailCode/${email}`, method: 'get' })
            const res = data.value as EmailResponse;
            if (res.code == 1007) {
                showAlert("验证码发送成功!", 'pass');
                useApplicationStore.startCountdown()
            } else if (res.code == 1005) {
                showAlert("验证码未过期", 'waring')
            } else if (res.code == 1004) {
                showAlert("邮箱格式错误", 'error')
            }
        }
    }

    async function sentStuInfo(stuInform: FormData) {
        console.log(stuInform);
        const email = stuInform.get('email') as string | null;
        const studentId = stuInform.get('studentId') as string | null;
        const clazz = stuInform.get('clazz') as string | null;
        const code = stuInform.get('clazz') as string | null;
        const name = stuInform.get('clazz') as string | null;
        const qqNumber = stuInform.get('clazz') as string | null;
        const sex = stuInform.get('clazz') as string | null;
        const file = stuInform.get('clazz') as string | null;

        if (email == '' || studentId == '' || clazz == '' || code == '' || name == '' || qqNumber == '' || sex == '') {
            showAlert('请填写完整信息', 'waring')
        } else if (file == null) {
            showAlert('请上传简历', 'waring')
        } else if (!email || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)) {
            // loginError.value = "请输入正确的邮箱"
            showAlert('请输入正确的邮箱', 'waring')
        } else if (!studentId || !(/^.{11}$/).test(studentId)) {
            showAlert('请输入正确格式的学号', 'waring')
        } else {
            await executeRequest({ url: '/recruit/user/register', method: 'post', headers: { 'Content-Type': 'multipart/form-data' }, requestData: stuInform })
            console.log(data, error);
        }

    }
    return { getClass, classListData, getCode, sentStuInfo }
}