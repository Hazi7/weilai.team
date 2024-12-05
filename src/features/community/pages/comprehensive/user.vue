<template>
  <User />
  <!-- <div style="display: flex">
    <div class="content">
      <div id="search">
        <Search :isUser="true" />
      </div>
      <div id="news">
        <UserContent :content="user" />
      </div>
    </div>
    <Rightbar />
  </div> -->
</template>

<script setup lang="ts">
import User from "@community/components/User.vue";
// import { useRequest } from "@/composables/useRequest";
// import UserContent from "@community/components/UserContent.vue";
// import { ref } from "vue";
// import { useRoute } from "vue-router";
// import Rightbar from "../../../../components/community/Rightbar.vue";
// import Search from "../../components/Search.vue";
// const { executeRequest, error, loading, data } = useRequest();
// const route = useRoute();
// const user = ref("");
// if ("user" in route.params) {
//   user.value = route.params.user as string;
// } else {
//   user.value = "";
// }
</script>

<style scoped lang="scss">
.content {
  padding: 0 100px;
  width: 100%;
  height: auto;
}
@media screen and (max-width: 768px) {
  .content {
    padding: 0 0;
    padding-bottom: 60px;
    .bg {
      position: fixed;
      top: 0;
      z-index: 0;
      width: 100%;
      height: 150px;
      background-color: #fafafa;
      &-top {
        background-image: linear-gradient(#dfe9f3, #ffffff00 100%);
        height: 150px;
      }
    }
  }

  #news {
    margin-top: 150px;
    .news-item {
      padding: 5px;
      margin-bottom: 8px;
      .news-writer {
        padding-left: 10px;
        .avatar {
          width: 40px;
          height: 40px;
        }

        .work-info,
        .brief {
          font-size: 13px;
          font-weight: 400;
          color: #686570;
          span {
            margin-right: 12px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
      .news-content {
        padding: 10px 55px;
        .news-title {
          font-weight: 540;
        }
        .news-details {
          font-size: 14.5px;
          color: #a7a7a7;
          p {
            max-height: 40px;
            line-height: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 1; //行数
            text-overflow: ellipsis; //省略号
            -webkit-box-orient: vertical;
            overflow: hidden;
            white-space: normal;
            word-break: break-all;
          }
        }
        .news-label {
          margin-top: 10px;
          display: flex;
          .type {
            width: 50px;
            font-size: 14px;
            color: #909ba6;
            text-align: center;
            border-radius: 15px;
            border: 2px solid #e1edf8;
            margin-right: 8px;
          }

          .labels {
            display: flex;

            color: #909ba6;
            font-size: 14px;
            .label-item {
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>
