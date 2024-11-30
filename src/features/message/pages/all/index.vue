<script setup lang="ts">
import Rightbar from '@/components/community/Rightbar.vue';
import { Icon } from "@iconify/vue";
import MesItem from '../../compontent/MesItem.vue';
import useSSE from '../../composables/sse';
import { onMounted } from 'vue';
import { useRequest } from '@/composables/useRequest';
const { data, loading, error, executeRequest } = useRequest();
const { connect, disconnect, subscribe, unsubscribe, isConnected } = useSSE();
const messageType = 1
const pageSize = 10
const pageNumber=1
onMounted(() => {
      connect()
      messageList()
});
//渲染消息列表
const messageList=async () => {
  await executeRequest({url:`/message/getMessageInfo?messageType=${messageType}&pageSize=${pageSize}&pageNumber=${pageNumber}`,method:'get'});
  if(data.value?.code==200){
      console.log(data.value);
  }else if(data.value?.code==401){
    console.log("请先登录"); 
  }else{
    console.log("获取失败");
    console.log(data.value);
  }
}



</script>

<template>
  <div class="" style="display: flex;">
    <div class="allCon">
      <div class="titleOptions">
        <Icon icon="ant-design:clear-outlined" class="clearIcon"/>
        <div class="clearAll">清空所有</div>
      </div>
      <div class="messageCon">
        <MesItem/>
      </div>
    </div>
    <Rightbar/>
  </div>
</template>

<style scoped lang="scss">
   .allCon{
      width: 100%;
      .titleOptions{
        width: 100%;
        height: 50px;
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
  .allCon{
    margin-top: 100px;
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
        width: 98%;
        margin-right: 0;
      }
    }
  }
}
</style>
