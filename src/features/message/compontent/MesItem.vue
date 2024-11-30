<script setup lang="ts">
import { Icon } from "@iconify/vue";

</script>

<template>
   <div class="mesItem">
          <div class="avatar"><img src="../../../assets/img/test.jpg"/></div>
          <div class="mesContent">
            <div class="details">
              <div class="name">万东乐<span class="type">评论了你的文章</span></div>
              <div class="time">2024/11/25/15:00</div>
            </div>
            <div class="content">上了一整天的课</div>
            <!-- <div class="imgCon"><img src="../../../assets/img/headImg.jpg"/></div> -->
            <div class="postLink"># vue3实现sse消息实时推送</div>
            <Icon icon="fluent:delete-24-regular" class="deleteIcon"/>
          </div>
        </div>
</template>

<style scoped lang="scss">
 .mesItem{
          width: 690px;
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