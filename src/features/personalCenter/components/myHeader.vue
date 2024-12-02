<template>
  <div class="header">
    <Carousel class="relative" :plugins="[plugin]" @mouseenter="plugin.stop"
      @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')]">
      <CarouselContent>
        <CarouselItem v-for="(item, index) in userInfo.lifePhoto" :key="index">
          <div class="p-1">
            <Card>
              <CardContent class="flex items-center justify-center">
                <img :src="item ? item : '/logo.png'" alt="生活照片" class="w-[100%] h-[200px] object-cover" />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
    <Skeleton v-if="!userInfo.lifePhoto" class="w-[100%] h-[200px] bg-gray-100" />
    <div class="myInfo">
      <div class="container-left">
        <Avatar style="
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-right: 20px;
            margin-left: 40px;
            background-color: white;
            z-index: 50;
          ">
          <AvatarImage :src="userInfo.headPortrait ? userInfo.headPortrait : '/logo.png'" alt="@radix-vue" />
          <AvatarFallback>头像</AvatarFallback>
        </Avatar>
        <div class="infoBox">
          <p class="nameAndSex">
            {{ userInfo.name }}
            <Icon style="display: inline-block" v-if="userInfo.sex == '男'" icon="fluent-emoji-flat:male-sign" />
            <Icon style="display: inline-block" v-if="userInfo.sex == '女'" icon="fluent-emoji-flat:female-sign" />
          </p>
          <p class="job">{{ userInfo.direction }}</p>
        </div>
      </div>
      <div class="container-right">
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline" class="bg-green-100 text-green-600">
              修改信息
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px] bg-white max-h-[500px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>修改信息</DialogTitle>
              <DialogDescription>
                在这里修改您的信息，完成之后点击保存即可
              </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="phone" class="text-right"> 电话 </Label>
                <Input id="phone" class="col-span-3" v-model:="phone" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="qq" class="text-right"> QQ </Label>
                <Input id="qq" class="col-span-3" v-model="qq" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="graduationDestination" class="text-right">
                  毕业去向
                </Label>
                <Input id="graduationDestination" class="col-span-3" v-model="graduationDestination" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="userDestination" class="text-right">
                  个性签名
                </Label>
                <Textarea id="userDestination" class="col-span-3" v-model="userDestination" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" @click="submitForm"> 保存 </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    <!-- 编辑信息 -->

    <div class="signature">
      <p>
        <Icon style="display: inline-block;height: 100%; " icon="fluent:document-signature-16-regular" />个性签名：
        {{
          userInfo.userDestination }}
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
          <span>{{ userInfo.studyId }}</span>
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
          <span>{{ userInfo.clazz }}</span>
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
        上次登录时间：<span>{{ formatDateToYYYYMMDD(userInfo.lastLoginTime) }}</span>
      </p>

    </div>

  </div>
</template>
<script lang="ts" setup>
// 引入组件
import { Icon } from '@iconify/vue';
import { reactive, ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import Autoplay from 'embla-carousel-autoplay'


// 引入hooks并调用
import { useRequest } from '@/composables/useRequest';
const { data, error, loading, executeRequest } = useRequest()
import { useLocalStorageWithExpire } from '@/composables/useLocalStorage';
const { getLocalStorageWithExpire, setLocalStorageWithExpire } = useLocalStorageWithExpire()
import { useDateFormatter } from '@/composables/useDateFormatter'
const { formatDateToYYYYMMDD } = useDateFormatter()

const plugin = Autoplay({
  delay: 2000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
})

//控制更多信息的显示与隐藏
let isShow = ref(false)
function changeIsShow() {
  isShow.value = !isShow.value
}

// 获取userId
const userId = getLocalStorageWithExpire('userId')

// 定义userInfo储存用户信息
let userInfo = reactive<UserInfo>({
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
  studyId: '',
  userDestination: ''
})

// 定义UserInfo接口
interface UserInfo {
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
  studyId: string,
  userDestination: string
}

let phone = ref('')
let qq = ref('')
let userDestination = ref('')
let graduationDestination = ref('')
// 获取用户信息函数
async function getUserInfo() {
  await executeRequest({ url: `/user/getUserInfoByUserId/${userId}` })
  if (data.value && data.value.code == 200) {
    Object.assign(userInfo, data.value.data);
    console.log('用户信息：', userInfo);

    phone.value = userInfo.phone
    qq.value = userInfo.qq
    userDestination.value = userInfo.userDestination
    graduationDestination.value = userInfo.graduationDestination
  }
}
// 打开页面立刻调用一次函数
getUserInfo()

const phoneNumberRegex = /^1[3-9]\d{9}$/;
const qqNumberRegex = /^[1-9][0-9]{4,10}$/;

async function submitForm() {
  if (!phoneNumberRegex.test(phone.value) || !phone) {
    console.log('手机号格式错误');
    return
  } else if (!qqNumberRegex.test(qq.value) || !qq) {
    console.log('qq号格式错误');
    return
  } else if (graduationDestination.value.length > 20) {
    console.log('毕业去向字数超过最大限制');
  } else if (userDestination.value.length > 50) {
    console.log('毕业去向字数过少');
  }
  const dataToSend = {
    phone: phone.value,
    userDestination: userDestination.value,
    graduationDestination: graduationDestination.value,
    qq: qq.value,
  }
  console.log(dataToSend);

  await executeRequest({ url: '/user/updateUserInfo', method: 'put', requestData: dataToSend })

  console.log('修改成功：', data.value);
  getUserInfo()
}

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
    justify-content: space-between;

    .container-left {
      display: flex;
    }

    .infoBox {
      height: 50px;

      .nameAndSex {
        width: 70px;
      }

      .job {
        font-size: 14px;
        color: #999;
      }

    }
  }

  .signature {
    margin: 20px 0px 0px 20px;
    font-size: 14px;
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