<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, defineProps,defineEmits } from 'vue';
import { useRequest } from '@/composables/useRequest';
const { data, loading, error, executeRequest } = useRequest();
import type { SSEMessageData } from '../composables/types';

const props = defineProps<{
  message: SSEMessageData;
}>();
const emit = defineEmits(['delete-success']);
const formattedTime = computed(() => {
  const commentTime = new Date(props.message.createdAt);
  const year = commentTime.getFullYear();
  const month = (commentTime.getMonth() + 1).toString().padStart(2, '0');
  const day = commentTime.getDate().toString().padStart(2, '0');
  const hours = commentTime.getHours().toString().padStart(2, '0');
  const minutes = commentTime.getMinutes().toString().padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
});
//删除单个信息
const deleteMessage = async (messageId: number) =>  {
  await executeRequest({
      url: `/message/deleteOneMessage/${messageId}`,
      method: 'delete',
    });
    if(data.value?.code === 200){
      alert('删除成功');
      emit('delete-success');
    } else {
      alert('删除失败');
    }

};
</script>

<template>
   <div class="mesItem">
          <div class="avatar"><img :src="props.message.headPortrait ? props.message.headPortrait : '../../../../public/logo.png'"/></div>
          <div class="mesContent">
            <div class="details">
              <div class="name">{{ props.message.username }}<span class="type">点赞了你的文章</span></div>
              <div class="time">{{ formattedTime }}</div>
            </div>
            <div v-if="props.message.content!=null" class="content" >{{props.message.content}}</div>
            <!-- <div class="imgCon"><img src="../../../assets/img/headImg.jpg"/></div> -->
            <div class="postLink"># {{ props.message.postTitle }}</div>
            <Icon icon="fluent:delete-24-regular" class="deleteIcon" @click="deleteMessage(props.message.messageId)"/>
          </div>
        </div>
</template>

<style scoped lang="scss">
 .mesItem{
          width: 670px;
          margin-bottom: 10px;
          padding-bottom: 15px;
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
                cursor: pointer;
                font-size: 14px;
                margin-right: 6px;
                justify-content: flex-start;
                span{
                  color: var(--secondary-foreground);
                  font-size: 13px;
                  margin-left: 7px;
                }
              }
              .name:hover{
                color: #2e9cbe;
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
              margin-bottom: 6px;
              min-height: 23px;
              border-bottom: 1px solid var(--border);
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
              font-size: 16px;
              cursor: pointer;
              color: var(--secondary-foreground);
            }
          }
        }

@media screen and (max-width: 768px) {
      .mesItem{
        width: 98%;
        margin-right: 0;
        .avatar{
            width: 38px;
            height: 38px;
            border-radius: 50%;
            margin: 15px 9px 9px 9px;
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
            }
          }
      }
    }
</style>