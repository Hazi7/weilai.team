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
    padding: 0 100px;
}
</style>