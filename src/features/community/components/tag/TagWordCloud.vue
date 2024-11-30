<script lang="ts" setup>
import { ref } from 'vue';
import VueWordCloud from 'vuewordcloud';
import CommunityTag from '../../composables/CommunityTag';
import { Weight } from 'lucide-vue-next';

const { tagCloudList, getTagCloudList } = CommunityTag();
const words = ref<[string, number][]>([]);
// 随机生成一个数，范围0-99
function assignRandomNumbers(strArray: string[]): [string, number][] {
    return strArray.map(str => [str, Math.floor(Math.random() * (30 + 1)) + 20]);  // 随机数范围 0-15
}

getTagCloudList().then(res => {
    console.log(tagCloudList);
    words.value = assignRandomNumbers(tagCloudList.value);
    console.log(words);
});
</script>

<template>
    <div class="word-cloud">
        <!-- <vue-word-cloud class="cloud" :words=words /> -->
        <vue-word-cloud :words="words"
            :color="([, weight]) => weight > 50 ? '#552af4' : weight > 47 ? '#412045' : weight > 45 ? '#5bc496' : weight > 42 ? '#f3cf77' : weight > 40 ? '#416af6' : weight > 38 ? '#eb7eb1' : weight > 35 ? '#ee8231' : weight > 32 ? '#552af4' : weight > 30 ? '#ae8af0' : weight > 25 ? '#579ce4' : '#ec5c6c'"
            font-family="微软雅黑,Microsoft YaHei" spacing="0.2">
            <template v-slot="{ text }">
                <div style="cursor: pointer;">
                    <router-link active-class="active" :to="`/community/discussion/label/${text}`">
                        {{ text }}</router-link>
                </div>
            </template>
        </vue-word-cloud>
    </div>
</template>

<style scoped lang="scss">
.word-cloud {
    margin-top: 90px;
    height: calc(100vh - 160px);
    width: 100%;
}

@media screen and (max-width: 1200px) {
    .word-cloud {
        margin-top: 70px;
        height: calc(100vh - 130px);
    }
}

@media screen and (max-width: 1024px) {
    .word-cloud {
        margin-top: 80px;
        height: calc(100vh - 130px);
    }
}

@media screen and (max-width: 768px) {
    .word-cloud {
        margin-top: 50px;
        height: calc(100vh - 100px);
    }
}
</style>
