<template>
    <div class="header">
        <div class="bagdImg"><img src="@/assets/img/test.jpg"></div>
        <div class="myInfo">
            <Avatar style="width: 100px; height: 100px; margin-top: -50px; margin-right:20px ;">
                <AvatarImage src="/src/assets/img/test.jpg" alt="@radix-vue" />
                <AvatarFallback>头像</AvatarFallback>
            </Avatar>
            <div class="infoBox">
                <p class="nameAndSex">name
                    <Icon style="display: inline-block;" v-if="gender == '男'" icon="mdi:gender-male" />
                    <Icon style="display: inline-block;" v-if="gender == '女'" icon="ph:gender-female" />
                </p>
                <p class="job">前端</p>

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
                    <span>20201514101</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="ri:group-line" /> 组别:
                    <span>六组</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="ic:outline-email" /> 邮箱:
                    <span>2020202020@qq.com</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="icon-park-outline:classroom" />
                    班级:
                    <span>计科231</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="solar:phone-linear" /> 电话:
                    <span>12345678910</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="ri:qq-line" /> QQ:
                    <span>2020202020</span>
                </p>
                <p>
                    <Icon style="display: inline-block;font-size: 18px;" icon="teenyicons:direction-outline" />
                    毕业去向:
                    <span>华为</span>
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
<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
let isShow = ref(false)
function changeIsShow() {
    isShow.value = !isShow.value
}
const gender = '男'
</script>
<style lang="scss" scoped>
.header {
    margin-top: 10px;
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #999;

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