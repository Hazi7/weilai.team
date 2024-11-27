<template>
  <div style="display: flex">
    <div class="content">
      <!-- 放搜索框的位置 -->
      <div id="search">
        <Search />
      </div>

      <!-- 放内容 -->
      <div id="news">
        <div
          class="news-item"
          v-for="item in articleList"
          :id="`${item.id}` + ''"
        >
          <div class="news-writer">
            <div class="avatar">
              <img src="@/assets/img/headImg.jpg" alt="" />
            </div>
            <div class="writer-info">
              <div class="name">爆米奇</div>
            </div>
          </div>
          <a class="news-content">
            <div class="news-title">{{ item.title }}</div>
            <div class="news-details">
              <p>
                {{ item.postTxt }}
              </p>
            </div>
            <div class="news-label">
              <div class="type">博客</div>
              <ul class="labels">
                <li class="label-item" v-for="tags in item.postTags">
                  #{{ tags }}
                </li>
              </ul>
            </div>
          </a>
        </div>
        <a class="news-item">
          <div class="news-writer">
            <div class="avatar">
              <img src="@/assets/img/headImg.jpg" alt="" />
            </div>
            <div class="writer-info">
              <h3 class="name">爆米奇</h3>
              <div class="work-info">
                <span class="origin">原创 400</span>
                <span class="read">阅读 123</span>
                <span class="like">点赞</span>
              </div>
              <div class="brief">致力于干饭</div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <Rightbar />
  </div>
</template>

<script setup lang="ts">
// import { Icon } from "@iconify/vue";
import { useRequest } from "@/composables/useRequest";
import Rightbar from "../../../../components/community/Rightbar.vue";
import Search from "../../components/Search.vue";
import { articleList, getArticle } from "../../composables/search";
const { executeRequest, error, loading, data } = useRequest();
getArticle();
// let articleList = ref<ArticleList[]>([]);

// interface ArticleList {
//   id: number;
//   collectCount?: number;
//   commentCount?: number;
//   isCollect?: false;
//   isLike?: false;
//   likeCount?: 1;
//   postAbstract: string;
//   postTags: string[];
//   postTxt: string;
//   title: string;
//   userId?: 12;
//   viewCount?: 24;
// }
// interface ArticleInfo {
//   countId: number;
//   current: number;
//   maxLimit: number;
//   optimizeCountSql: boolean;
//   orders: [];
//   pages: number;
//   records: ArticleList[];
//   searchCount: boolean;
//   size: number;
//   total: number;
// }
// interface Data {
//   data: ArticleInfo;
// }

// async function getArticle(title = "") {
//   await executeRequest({
//     url: `/post/selectAll?title=${title}`,
//     method: "get",
//   });
//   const res = data.value as Data;

//   articleList.value = res.data.records;

//   console.log(articleList);
// }
</script>

<style scoped lang="scss">
.content {
  padding: 0 100px;
  width: 100%;
  height: auto;
}
#news {
  width: 100%;

  .news-item {
    display: block;
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    min-height: 100px;
    background-color: var(--background);
    margin-bottom: 25px;
    .news-writer {
      display: flex;
      align-items: center;
      .avatar {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        margin-right: 10px;
      }
      .name {
        font-weight: 500;
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
      display: block;
      &:hover {
        background-color: #f8f8fa;
        cursor: pointer;
      }
      .news-details {
        font-size: 14.5px;
        color: #a7a7a7;
        p {
          max-height: 40px;
          line-height: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2; //行数
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
