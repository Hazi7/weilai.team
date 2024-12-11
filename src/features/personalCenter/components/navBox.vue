<template>
    <div class="navBox">
        <template v-if="userStore.isSelf">
            <ul>
                <li>
                    <router-link to="/personalCenter/userInfo/myPosts" active-class="active">我的帖子</router-link>
                </li>
                <li>
                    <router-link to="/personalCenter/userInfo/mySchedule" active-class="active">我的课表
                    </router-link>
                </li>
                <li>
                    <router-link to="/personalCenter/userInfo/myCollections" active-class="active">我的收藏</router-link>
                </li>
            </ul>
        </template>
        <template v-else>
            <ul>
                <li>
                    <router-link to="/personalCenter/userInfo/myPosts" active-class="active">TA的帖子</router-link>
                </li>
                <li>
                    <router-link to="/personalCenter/userInfo/mySchedule" active-class="active">TA的课表
                    </router-link>
                </li>
            </ul>
        </template>
    </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/userStore'
const userStore=useUserStore()
console.log('pinia///',userStore);
</script>
<style lang="scss" scoped>
.navBox {
    margin-top: 20px;
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    // box-shadow: 5px 5px 5px #ccc;

    ul {
        display: flex;
        justify-content: space-evenly;

        li {
            height: 35px;

            a {
                display: block;
                height: 100%;
            }

            .active {
                border-bottom: 3px solid #4096ff;
            }
        }
    }
}
</style>