<template>
    <div class="header">
        <div v-if="loading">加载中。。。</div>
        <div class="bagdImg"><img src="@/assets/img/test.jpg"></div>
        <div class="myInfo">
            <Avatar style="width: 100px; height: 100px; margin-top: -50px; margin-right:20px; background-color: white;">
                <AvatarImage :src="userInfo.headPortrait!='(暂无)' ? userInfo.headPortrait : '/logo.png'" alt="@radix-vue" />
                <AvatarFallback>头像</AvatarFallback>
            </Avatar>
            <div class="infoBox">
                <p class="nameAndSex">
                    {{ userInfo.name }}
                    <Icon style="display: inline-block;" v-if="userInfo.sex == '男'" icon="mdi:gender-male" />
                    <Icon style="display: inline-block;" v-if="userInfo.sex == '女'" icon="ph:gender-female" />
                </p>
                <p class="job">{{userInfo.direction}}</p>
            </div>
        </div>
        <div class="signature">
            <p>
                <Icon style="display: inline-block;" icon="fluent:document-signature-16-regular" /> 个性签名个性签名个性签名
            </p>
        </div>

        <div class="moreInfoBox">
            <div class="arrowBox" @click="changeIsShow">
                <Icon width="20px" v-show="!isShow" icon="quill:chevron-down" />
                <Icon width="20px" v-show="isShow" icon="quill:chevron-up" />
            </div>
            <div class="moreInfo" v-show="isShow">
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="tabler:number" /> 学号:
                    <span>{{userInfo.studyId}}</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="ri:group-line" /> 组别:
                    <span>{{ userInfo.group }}</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="ic:outline-email" /> 邮箱:
                    <span>{{ userInfo.email }}</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="icon-park-outline:classroom" />
                    班级:
                    <span>{{ userInfo.clazz}}</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="solar:phone-linear" /> 电话:
                    <span>{{ userInfo.phone }}</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="ri:qq-line" /> QQ:
                    <span>{{ userInfo.qq }}</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="teenyicons:direction-outline" />
                    毕业去向:
                    <span>{{ userInfo.graduationDestination }}</span>
                </p>
            </div>
        </div>

        <div class="lastLoginTime">

            <p>
                <Icon style="display: inline-block;" icon="mdi:calendar-outline" />
                上次登录时间：<span>2020-01-01</span>
            </p>

        </div>

    </div>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import {reactive, ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRequest } from '@/composables/useRequest';
const { data, error, loading, executeRequest } = useRequest()
import { useLocalStorageWithExpire } from '@/composables/useLocalStorage';
const { getLocalStorageWithExpire, setLocalStorageWithExpire } = useLocalStorageWithExpire()

//控制更多信息的显示于隐藏
let isShow = ref(false)
function changeIsShow() {
    isShow.value = !isShow.value
}

const userId = getLocalStorageWithExpire('userId')

let userInfo =reactive<UserInfo>({
    clazz: '',
    direction: '',
    email: '',
    grade: '',
    graduationDestination: '',
    group: '',
    headPortrait: '',
    lastLoginTime: '',
    lifePhoto: [],
    name: '',
    phone: '',
    qq: '',
    sex: '',
    studyId: ''
})

interface UserInfo{
    clazz: string,
    direction: string,
    email: string,
    grade: string,
    graduationDestination: string,
    group: string,
    headPortrait: string,
    lastLoginTime: string,
    lifePhoto: [],
    name: string,
    phone: string,
    qq: string,
    sex: string,
    studyId: string
}
async function getUserInfo() {
    await executeRequest({ url: `/user/getUserInfoByUserId/${userId}` })
    if (data.value && data.value.code == 200) {
        Object.assign(userInfo, data.value.data);
    }
}
getUserInfo()

</script>
<style lang="scss" scoped>
.header {
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #ccc;

    .bagdImg {
        width: 100%;
        height: 30vh;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .myInfo {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;


        .infoBox {
            height: 50px;

            .job {
                font-size: 14px;
                color: #999;
            }

        }
    }

    .signature {
        margin: 20px 0px 0px 20px;
        font-size: large;
        color: #999;
    }

    .moreInfoBox {
        position: relative;

        .arrowBox {
            width: 20px;
            border-radius: 50%;
            background-color: #cccccc;
            color: white;
            position: absolute;
            right: 10px;
            bottom: 0px;
            cursor: pointer;
        }

        .moreInfo {
            margin-top: 10px;
            width: 100%;

            p {
                height: 22px;
                line-height: 22px;
                margin: 10px;
                margin-left: 20px;
                color: #999;
                font-size: 14px;
            }
        }
    }

    .lastLoginTime {
        width: 100%;
        border-top: 1px solid #999;
        border-bottom: 1px solid #999;
        margin: 20px 0px;
        padding: 20px;
        text-align: center;
    }

}
</style>