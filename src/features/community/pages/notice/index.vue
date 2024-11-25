<template>
  <div style="display: flex">
    <div class="content">
      <!-- 公告模板 -->
      <div class="noticeItem">
        <!-- 个人信息以及编辑操作 -->
        <div class="userInfo">
          <div class="action">
          <div class="publish-avatar">
             <img src="@/assets/img/headImg.jpg"/>
           </div>
           <div class="nickName">_H!an.</div>
           <span class="edit" title="编辑"><Icon icon="mage:edit-pen" class="editIcon"/></span>
           <span class="delete" title="删除"><Icon icon="fluent:delete-24-regular" class="deleteIcon"/></span>
           </div>
           <div class="publish-time">21:28</div>
        </div>
        <!-- 公告内容 -->
        <div class="noticeDetalis">
          <div class="notice-content">
            国庆假期结束后按小组作息制度进行学习，国庆假期结束前不做要求，现在就想来小组学习也非常支持。
            群里有入门学习计划，可以自发进行学习，有任何疑问都可以询问学长学姐。
            国庆假期结束后按小组作息制度进行学习，国庆假期结束前不做要求，现在就想来小组学习也非常支持。
            群里有入门学习计划，可以自发进行学习，有任何疑问都可以询问学长学姐。
            国庆假期结束后按小组作息制度进行学习，国庆假期结束前不做要求，现在就想来小组学习也非常支持。
            群里有入门学习计划，可以自发进行学习，有任何疑问都可以询问学长学姐。
          </div>
        </div>
        <div class="show">展开<Icon icon="cuida:caret-down-outline" class="arrowsIcon"/></div>
      </div >
    </div>
    <Rightbar/>
  </div>
  
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Rightbar from "../../../../components/community/Rightbar.vue";
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  flex-wrap: wrap;
  margin-top: 20px;
  .commentCon{
    width: 730px;
  }
}
.noticeItem {
  width: 730px;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  .userInfo{
    display: flex;
    padding-bottom: 10px;
    justify-content: space-between; 
    border-bottom: 1px solid var(--border);
    .action{
      display: flex;
    }
    .publish-avatar{
      width: 50px;
      height: 50px;
      cursor: pointer;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .nickName{
      margin: 15px ;
    }
    .editIcon{
      font-size: 17px;
      color: var(--secondary-foreground);
      margin: 18px 6px 0 0;
      cursor: pointer;
    }
    .deleteIcon{
      font-size: 17px;
      color: var(--secondary-foreground);
      margin: 18px 10px 0 0;
      cursor: pointer;
    }
    .publish-time{
      margin-top: 17px;
      justify-content: flex-end;
      font-size: 13px;
      margin-right: 10PX;
      color: var(--secondary-foreground);
    }
  }
  .noticeDetalis{
    width: 100%;
    padding: 10px 0;
    .notice-content{
      height: 85px;
      color: #767575;
      font-size: 14.5px;
      line-height: 1.5;
      overflow: hidden;
      white-space: normal;
      word-break: break-word;
      text-overflow: ellipsis;
      display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 4;
    }

  }
  .show{
    cursor: pointer;
    display: flex;
    font-size: 15px;
    justify-content: flex-end;
    .arrowsIcon{
      margin: 5px 0 0 3px;
    }
  }
  
}
</style>
