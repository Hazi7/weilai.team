<script setup>

</script>
<template>
    <div class="noDataContainer">
        <div class="noData">
            <img class="noDataImg" src="../assets/暂无数据.png" alt="">
            <p class="noDataText">暂无数据</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.noDataContainer{
    width: 100%;
    height: 100%;
    padding-top: 50px;

    .noData{
        text-align: center;
        .noDataImg{
            width: 200px;
            height: auto;
            object-fit: cover;
        }

        .noDataText{
            color: #999;
            padding-top: 20px;
            text-align: center;
            padding-right: 20px;
        }
    }
}
</style>