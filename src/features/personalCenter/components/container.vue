<template>
    <div class="container">
        <myHeader></myHeader>
        <navBox></navBox>
        <router-view></router-view>
    </div>
</template>

<script setup>
import myHeader from './myHeader.vue';
import navBox from './navBox.vue';

</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    padding: 0px 100px 10px 100px;
}
/* 使用媒体查询为手机端修改padding */
@media (max-width: 768px) {
    .container {
        padding:80px 0 60px 0;
    }
}
</style>