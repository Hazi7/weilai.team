<template>
  <div style="display: flex">
    <div class="content">
      <!-- 放搜索框的位置 -->
      <div id="search">
        <Search :typeId="0" />
      </div>
      <!-- 放内容 -->
      <!-- <div id="news">
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
              <div class="time">发布于 <span>2022-05-05</span></div>
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
            <div class="news-footer">
              <div class="news-view"><Icon icon="iconamoon:eye-light" /></div>
            </div>
          </a>
        </div>
        <div class="news-item">
          <div class="news-writer">
            <div class="avatar">
              <img src="@/assets/img/headImg.jpg" alt="" />
            </div>
            <div class="writer-info">
              <div class="name">爆米奇</div>
              <div class="time">发布于 <span>2022-05-05</span></div>
            </div>
          </div>
          <div class="news-content">
            <div class="news-title">约定式路由</div>
            <div class="news-details">
              <p>
                约定式路由，也叫约定式导航，是一种路由模式，它将路由规则定义在代码中，而不是在配置文件中。
                约定式路由，也叫约定式导航，是一种路由模式，它将路由规则定义在代码中，而不是在配置文件中。
                约定式路由，也叫约定式导航，是一种路由模式，它将路由规则定义在代码中，而不是在配置文件中。
              </p>
            </div>
            <div class="news-label">
              <div class="type">博客</div>
              <ul class="labels">
                <li class="label-item">#js</li>
                <li class="label-item">#vue</li>
                <li class="label-item">#nue.js</li>
              </ul>
            </div>
          </div>
          <div class="news-footer">
            <div class="news-view">
              <Icon icon="iconamoon:eye-light" class="news-footer-icon" /><span
                class=""
                >1.6万+</span
              >
            </div>
            <div class="news-like">
              <Icon icon="iconamoon:like-light" class="news-footer-icon" />11
            </div>
            <div class="news-comment">
              <Icon
                icon="fontisto:comment"
                class="news-footer-icon"
                style="font-size: 13px"
              />
              11
            </div>
          </div>
        </div>
      </div> -->
      <NewsContent />
    </div>
    <Rightbar />
  </div>
</template>

<script setup lang="ts">
// import { Icon } from "@iconify/vue";
import { useRequest } from "@/composables/useRequest";
import Rightbar from "../../../../components/community/Rightbar.vue";
import NewsContent from "../../components/NewsContent.vue";
import Search from "../../components/SearchArticle.vue";
const { executeRequest, error, loading, data } = useRequest();
// getArticleByType();
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
  padding: 0 45px;
  width: 100%;
  height: auto;
}
#news {
  width: 100%;
  .news-item {
    padding: 15px;
    border-radius: 10px;
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
        margin-right: 5px;
      }

      .time {
        font-size: 13px;
        color: #909ba6;
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
    .news-footer {
      display: flex;
      align-items: center;
      padding: 5px 55px;
      & > div {
        color: var(--secondary-foreground);
        display: flex;
        align-items: center;
        font-size: 13px;
        margin-right: 10px;
      }
      &-icon {
        color: var(--secondary-foreground);
        font-size: 17px;
        margin-right: 5px;
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
        .writer-info {
          .name {
            color: var(--secondary-foreground);
            font-size: 0.9em;
            margin-left: 5px;
          }
          .time {
            display: none;
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
