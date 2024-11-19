<template>
    <div class="myPosts">
        <div class="postsData">
            <div class="postsNum">
                <p>0</p>
                <p>文章</p>
            </div>
            <div class="likeNum">
                <p>0</p>
                <p>点赞</p>
            </div>
            <div class="starNum">
                <p>0</p>
                <p>收藏</p>
            </div>
            <div class="commentNum">
                <p>0</p>
                <p>评论</p>
            </div>
        </div>
        <div class="postsListBox">
            <ul>
                <li v-for="(item, index) in 5" :key="index">
                    <img src="@/assets/img/test.jpg" alt="文章封面">
                    <div class="postInfo">
                        <p class="postTitle">文章标题</p>
                        <p class="postFooter">
                            <span class="postTime">2020-01-01</span>
                            <span class="likes">23</span>
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
    </div>
</template>
<script setup>
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
</script>
<style lang="scss" scoped>
.operationsBtn {
    width: 100%;
}

.deletePost {
    background-color: var(--destructive);
}

.updatePost {
    background-color: #97d5ff;
}

.myPosts {
    margin-top: 20px;
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #999;

    .postsData {
        display: flex;
        border-bottom: 1px solid #999;
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
                height: 100px;
                display: flex;
                border-radius: 10px;
                background-color: white;
                padding: 10px;
                box-shadow: 5px 5px 5px #d9d9d9;

                img {
                    width: 80px;
                }

                .postInfo {
                    margin-left: 20px;
                    width: 100%;
                }

                .ellipsis {
                    margin-right: 20px;
                    background-color: white;

                }


            }
        }
    }
}
</style>