<script setup lang="ts">
import Rightbar from '@/components/community/Rightbar.vue';
import { Icon } from "@iconify/vue";
import MesItem from '../../compontent/MesItem.vue';
import useSSE from '../../composables/sse';
import { onMounted } from 'vue';


const { connect, disconnect, subscribe, unsubscribe, isConnected } = useSSE();
onMounted(() => {
      // connect();
});

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
        .mesItem{
          width: 690px;
          margin-bottom: 10px;
          padding-bottom: 15px;
          margin-right: 20px;
          background-color: white;
          border-radius: 5px;
          display: flex;
          .avatar{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 18px 15px 15px 15px;
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
            }
          }
          .mesContent{
            width: calc(100% - 73px);
            height: 100%;
            .details{
              width: 100%;
              height: 20px;
              color: var(--secondary-foreground);
              font-size: 13px;
              display: flex;
              justify-content: space-between;
              margin: 15px 0 4px 0;
              .name{
                color: #636b71;
                font-size: 14px;
                margin-right: 6px;
                justify-content: flex-start;
                span{
                  color: var(--secondary-foreground);
                  font-size: 13px;
                  margin-left: 7px;
                  color: #868787;
                }
              }
              
              .time{
                margin-right: 20px;
                color: #868787;
                font-size: 13px;
                justify-content: flex-end;
              }
            }
            .content{
              width:calc(100% - 20px);
              font-size: 14px;
              margin-bottom:4px;
              word-break: break-all;
              color: var(--foreground);
            }
            .postLink{
              cursor: pointer;
              max-width:calc(100% - 20px);
              font-size: 12px;
              color: var(--secondary-foreground);
            }
            .postLink:hover{
              color: #5db0da;
            }
            .imgCon{
              width: 150px;
              height: auto;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                margin-bottom: 5px;
              }
            }
            .deleteIcon{
              font-size: 17px;
              cursor: pointer;
            }
          }
        }
      }
   }
</style>
