<template>
    <div class="" style="display: flex;">
      <div class="mesCon">
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

<script setup lang="ts">
import Rightbar from '@/components/community/Rightbar.vue';
import { Icon } from "@iconify/vue";
import MesItem from '../../compontent/MesItem.vue';
</script>

<style scoped lang="scss">
   .mesCon{
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
</style>