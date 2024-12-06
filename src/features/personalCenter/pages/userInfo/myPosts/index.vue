<template>
    <div class="myPosts">
        <div class="postsData">
            <div class="postsNum">
                <p>{{ userPostAllInfo.allPostCount }}</p>
                <p>文章</p>
            </div>
            <div class="likeNum">
                <p>{{ userPostAllInfo.allLikeCount }}</p>
                <p>点赞</p>
            </div>
            <div class="starNum">
                <p>{{ userPostAllInfo.allCollectCount }}</p>
                <p>收藏</p>
            </div>
            <div class="commentNum">
                <p>{{ userPostAllInfo.allCommentCount }}</p>
                <p>评论</p>
            </div>
        </div>
        <div class="postsListBox">
            <ul>
                <li v-for="item in userPost" :key="item.id">
                    <div class="postInfo">
                        <h1 class="postTitle">{{ item.title }}</h1>
                        <p class="postDesc">{{ item.postAbstract }}</p>
                        <p class="postFooter">
                            <span class="postTime">{{ formatDateToYYYYMMDD(item.putTime) }} 发布</span>
                            ·
                            <span class="likesNum">{{ item.postLikeCount }} 点赞</span>
                            ·
                            <span class="commentsNum">{{ item.commentCount }} 评论</span>
                            ·
                            <span class="collectNum">{{ item.collectCount }} 收藏</span>
                            ·
                            <span class="viewNum">{{ item.viewCount }} 阅读</span>
                        </p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger class="ellipsis">
                            <Icon icon="lucide:ellipsis" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="p-0  bg-white">
                            <DropdownMenuLabel>操作</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Button class="operationsBtn deletePost" @click="deletePost(item.id)">删除文章</Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button class="operationsBtn updatePost">修改文章</Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </li>
            </ul>
        </div>
        <div class="pageBox pagination-container">
            <Pagination :totalItems="total" :pageSize="pageSize" @update:page="handlePageChange">
            </Pagination>
            <span class="postsNum">共 {{ total }} 篇文章</span>
        </div>
    </div>
    <div class="postsListBox">
      <ul>
        <li v-for="item in userPost" :key="item.id">
          <div class="postInfo">
            <h1 class="postTitle">{{ item.title }}</h1>
            <p class="postDesc">{{ item.postAbstract }}</p>
            <p class="postFooter">
              <span class="postTime"
                >{{ formatDateToYYYYMMDD(item.putTime) }} 发布</span
              >
              ·
              <span class="likesNum">{{ item.postLikeCount }} 点赞</span>
              ·
              <span class="commentsNum">{{ item.commentCount }} 评论</span>
              ·
              <span class="collectNum">{{ item.collectCount }} 收藏</span>
              ·
              <span class="viewNum">{{ item.viewCount }} 阅读</span>
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger class="ellipsis">
              <Icon icon="lucide:ellipsis" />
            </DropdownMenuTrigger>
            <DropdownMenuContent class="p-0 bg-white">
              <DropdownMenuLabel>操作</DropdownMenuLabel>
              <DropdownMenuItem>
                <Button class="operationsBtn deletePost">删除文章</Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button class="operationsBtn updatePost">修改文章</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </div>
    <div class="pageBox pagination-container">
      <Pagination
        :totalItems="total"
        :pageSize="pageSize"
        @update:page="handlePageChange"
      >
      </Pagination>
      <span class="postsNum">共 {{ total }} 篇文章</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
//引入组件
import { Icon } from "@iconify/vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "@/components/ui/button/Button.vue";
import Pagination from "@/components/recruitment/Pagination.vue";

//引入ref
import { ref } from "vue";

// 引入hooks并使用
import { useRequest } from '@/composables/useRequest'
const { data, error, loading, executeRequest } = useRequest()
import { useLocalStorageWithExpire } from '@/composables/useLocalStorage';
const { getLocalStorageWithExpire, setLocalStorageWithExpire } = useLocalStorageWithExpire()
import { useDateFormatter } from '@/composables/useDateFormatter'
import { get } from '@vueuse/core';
const { formatDateToYYYYMMDD } = useDateFormatter()

// 获取userId
const userId = getLocalStorageWithExpire("userId");

//定义userPostAllInfo，储存当前用户的文章数据
let userPostAllInfo = ref({
  allCollectCount: 0,
  allCommentCount: 0,
  allLikeCount: 0,
  allPostCount: 0,
});

//定义页码信息
let pages = 0;
let currentPage = 1;
let total = ref<number>();
let pageSize = ref(10);

//定义userPost，储存当前页的文章数据
let userPost = ref([]);

//页码切换
function handlePageChange(newPage: number) {
  currentPage = newPage;
  getPosts();
}

//获取文章函数
async function getPosts() {
    await executeRequest({ url: `/user/getUserPost?userId=${userId}&pageNumber=${currentPage}&pageSize=${pageSize.value}` })
    if (data.value && data.value.code == 200) {
        let postData = data.value.data
        // 将数据赋值给userPostAllInfo及userPost、pages
        Object.assign(userPostAllInfo.value, postData.userPostAllInfo);
        userPost.value = postData.userPost
        console.log('我的文章',userPost.value);
        
        pages = postData.pageInfo.pages
        total = postData.pageInfo.total
    }
}
//打开页面立刻调用一次获取文章
getPosts()

async function deletePost(id:number) {
    
    await executeRequest({ url: `/post/delete/${id}`,method:'put'})
    console.log(data.value);
    getPosts()
}
</script>
<style lang="scss" scoped>
.operationsBtn {
  width: 100%;
}

.deletePost {
  background-color: rgb(255, 172, 172);
  color: rgb(255, 0, 0);
}

.updatePost {
  background-color: #acdeff;
  color: rgb(0, 0, 255);
}

.myPosts {
  margin-top: 20px;
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #ccc;

  .postsData {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;

    div {
      width: 25%;
      text-align: center;
    }
  }

  .postsListBox {
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    // box-shadow: 5px 5px 5px #ccc;

    ul {
      li {
        margin-top: 20px;
        display: flex;
        border-radius: 10px;
        background-color: white;
        padding: 10px;
        box-shadow: 5px 5px 5px #d9d9d9;
        border: 1px solid #d9d9d9;

        .postInfo {
          margin-left: 20px;
          width: 100%;
          color: #666;

          .postTitle {
            color: black;
            font-size: larger;
          }

          .postDesc {
            font-size: small;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
          }

          .postFooter {
            font-size: xx-small;
          }
        }

    .postsListBox {
        width: 100%;

        ul {
            li {
                margin-top: 20px;
                display: flex;
                border-radius: 10px;
                background-color: white;
                padding: 10px;
                // box-shadow: 5px 5px 5px #d9d9d9;
                border: 1px solid #d9d9d9;

                .postInfo {
                    margin-left: 20px;
                    width: 100%;
                    color: #666;

                    .postTitle {
                        color: black;
                        font-size: larger;
                    }

                    .postDesc {
                        font-size: small;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 100%;
                    }

                    .postFooter {
                        font-size: xx-small;
                    }
                }

                .ellipsis {
                    margin-right: 20px;
                    margin-left: 20px;
                }

                &:hover {
                    background-color: #f5f5f5;
                }
            }
        }

        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }

  .pageBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;

    .postsNum {
      margin-right: 20px;
      line-height: 40px;
    }
  }
}

@media (max-width: 768px) {
    .myPosts .postsListBox ul li .postInfo .postFooter {
        font-size: 9px;
    }
}
</style>
