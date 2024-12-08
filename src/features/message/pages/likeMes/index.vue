<template>
    <div class="con" style="display: flex;">
      <div class="mesCon">
        <div class="titleOptions">
        <Icon icon="ant-design:clear-outlined" class="clearIcon"/>
        <div class="clearAll">清空所有({{ totalCount }})</div>
       </div>
      <div class="messageCon">
        <NoData v-if="messages.length === 0" />
        <div v-else class="messageList">
        <div v-for="message in messages" :key="message.messageId" class="mess">
          <MesItem :message="message" 
          @like="messageList"
          />
        </div>
        </div>
      </div>
    </div>
      <Rightbar/>
    </div>
</template>

<script setup lang="ts">
import NoData from '../../../../components/loading/NoData.vue';
import Rightbar from '@/components/community/Rightbar.vue';
import { Icon } from "@iconify/vue";
import MesItem from '../../compontent/MesItem.vue';
import { onMounted,ref} from 'vue';
import { useAlert } from "../../../../composables/alert";
import { useRequest } from '@/composables/useRequest';
import type { SSEMessageData } from '../../../../types/sseType';
import { useSseStore } from '../../../../store/useSseStore';
const sseStore = useSseStore();
const { data, loading, error, executeRequest } = useRequest();
const messages = ref<SSEMessageData[]>([]); 
const messageType = 1
const pageSize = 10
const pageNumber=1
const totalCount = ref(0)
const { showAlert } = useAlert();

onMounted(() => {
  sseStore.subscribe('message', (message: SSEMessageData) => {
        if(message.messageType==messageType){
          messages.value.unshift(message);
          console.log(message);   
        }
     });
      messageList()
});

//渲染消息列表
const messageList=async () => {
  messages.value = [];
  await executeRequest({url:`/message/getMessageInfo?messageType=${messageType}&pageSize=${pageSize}&pageNumber=${pageNumber}`,method:'get'});
  if(data.value?.code==200){
    totalCount.value=data.value?.data.PageInfo.totalCount
    const allMessages = data.value?.data.AllMessages || [];
    messages.value = allMessages;  
    console.log(allMessages);
     
  }else if(data.value?.code==401){
    showAlert("请先登录","waring"); 
  }else{
    showAlert("获取失败","error");
    console.log(data.value);
  }
}
</script>

<style scoped lang="scss">
.con{
  width: 100%;
  .mess{
    width: 95%;
  }
  .messageList{
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
   .mesCon{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .titleOptions{
        width: 100%;
        height: 30px;
        display: flex;
        cursor: pointer;
        .clearAll{
          width: 130px;
          font-size: 15px;
        }
        .clearIcon{
          margin:2px 4px 0 0px;
          font-size: 19px;
        } 
      }
      .messageCon{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        
      }

   }
   @media screen and (max-width: 768px) {
  .mesCon{
    margin-top: 70px;
    width: 100%;
    .titleOptions{
      width: 100%;
      margin-top: 15px;
      height: 30px;
      .clearIcon{
          margin:2px 4px 0 5px;
          font-size: 19px;
      } 
    }
    .messageCon{
      width: 100%;
      .mesItem{
        width: 100%;
        margin-right: 0;
      }
    }
  }
}
</style>