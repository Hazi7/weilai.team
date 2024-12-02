<template>
    <div class="myCollections">
        <div class="postsListBox">
            <ul>
                <li v-for="item in userCollect" :key="item.id">
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
                                <Button class="operationsBtn cancelCollect">取消收藏</Button>
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
            <span class="collectionsNum">共 {{ collectNum }} 收藏</span>
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

//定义页码信息
let pages = 0;
let currentPage = 1;
let collectNum = 0;

//定义userPost，储存当前页的文章数据
let userCollect = ref([]);

//页码切换
function handlePageChange(newPage: number) {
    currentPage = newPage;
    getUserCollect()
}

//获取文章函数
async function getUserCollect() {
    await executeRequest({ url: `/user/getUserCollect?userId=${userId}&pageNumber=${currentPage}&pageSize=5` })
    if (data.value && data.value.code == 200) {
        let postData=data.value.data
        // 将数据赋值给userCollect、pages
        userCollect.value = postData.userCollect
        pages = postData.pageInfo.pages
        collectNum = postData.pageInfo.total
        console.log('我的收藏',data.value);        
    }else{
        console.log(data.value.message);    
    }

}
//打开页面立刻调用一次获取文章
getUserCollect()

</script>
<style lang="scss" scoped>
.operationsBtn {
    width: 100%;
}

.cancelCollect {
    background-color: #97d5ff;
}

.myCollections {
    margin-top: 20px;
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #ccc;

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
        .collectionsNum{
            margin-left: 20px;
            line-height: 40px;
        }
    }
}
</style>