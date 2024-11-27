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
        <div class="pageBox">
            <Pagination v-slot="{ page }" :total="pages * 10" :sibling-count="1" show-edges :default-page="1"
                @update:page="handlePageChange">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                    <PaginationFirst />
                    <PaginationPrev />
                    <template v-for="(item, index) in items">
                        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                            <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                                {{ item.value }}
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis v-else :key="item.type" :index="index" />
                    </template>

                    <PaginationNext />
                    <PaginationLast />
                </PaginationList>
            </Pagination>
            <span class="postsNum">共 {{ postsNum }} 篇文章</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
//引入组件
import { Icon } from '@iconify/vue';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Button from '@/components/ui/button/Button.vue';
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/components/ui/pagination'

//引入ref
import { ref } from 'vue'

// 引入hooks并使用
import { useRequest } from '@/composables/useRequest'
const { data, error, loading, executeRequest } = useRequest()
import { useLocalStorageWithExpire } from '@/composables/useLocalStorage';
const { getLocalStorageWithExpire, setLocalStorageWithExpire } = useLocalStorageWithExpire()
import { useDateFormatter } from '@/composables/useDateFormatter'
const { formatDateToYYYYMMDD } = useDateFormatter()

// 获取userId
const userId = getLocalStorageWithExpire('userId')

//定义userPostAllInfo，储存当前用户的文章数据
let userPostAllInfo = ref({
    allCollectCount: 0,
    allCommentCount: 0,
    allLikeCount: 0,
    allPostCount: 0,
})

//定义页码信息
let pages = 0;
let currentPage = 1;
let postsNum = 0;

//定义userPost，储存当前页的文章数据
let userPost = ref([]);

//页码切换
function handlePageChange(newPage: number) {
    currentPage = newPage;
    getPosts()
}

//获取文章函数
async function getPosts() {
    await executeRequest({ url: `/user/getUserPost?userId=${userId}&pageNumber=${currentPage}&pageSize=5` })
    if (data.value && data.value.code == 200) {
        let postData = data.value.data
        // 将数据赋值给userPostAllInfo及userPost、pages
        Object.assign(userPostAllInfo.value, postData.userPostAllInfo);
        userPost.value = postData.userPost
        pages = postData.pageInfo.pages
        postsNum = postData.pageInfo.total
    }
}
//打开页面立刻调用一次获取文章
getPosts()

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

        ul {
            li {
                margin-top: 20px;
                height: 130px;
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
                        height: 25%;
                    }

                    .postDesc {
                        font-size: small;
                        height: 55%;
                    }

                    .postFooter {
                        font-size: small;
                        height: 20%;
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
    }

    .pageBox {
        margin: 20px auto;
        display: flex;
        button[data-selected] {
            background-color: #97d5ff;
        }
        .postsNum{
            margin-left: 20px;
            line-height: 40px;
        }
    }
}
</style>