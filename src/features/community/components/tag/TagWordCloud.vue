<script lang="ts" setup>
import { ref } from "vue";
// @ts-ignore
import VueWordCloud from "vuewordcloud";
import CommunityTag from "../../composables/CommunityTag";
// import { weight } from 'lucide-vue-next';
import { useTagStore } from "@/store/tagTypeStore";

const tagStore = useTagStore();
const tagType = tagStore.tagType.tagType
const { tagCloudList, getTagCloudList } = CommunityTag();
const words = ref<[string, number][]>([]);
// 随机生成一个数，范围0-99
function assignRandomNumbers(strArray: string[]): [string, number][] {
  return strArray.map((str) => [
    str,
    Math.floor(Math.random() * (30 + 1)) + 20,
  ]); // 随机数范围 0-15
}

function getColor(weight: number) {
    if (weight > 50) return '#552af4';
    if (weight > 47) return '#412045';
    if (weight > 45) return '#5bc496';
    if (weight > 42) return '#f3cf77';
    if (weight > 40) return '#416af6';
    if (weight > 38) return '#eb7eb1';
    if (weight > 35) return '#ee8231';
    if (weight > 32) return '#552af4';
    if (weight > 30) return '#ae8af0';
    if (weight > 25) return '#579ce4';
    return '#ec5c6c';
}

getTagCloudList().then((res) => {
  console.log(tagCloudList);
  words.value = assignRandomNumbers(tagCloudList.value);
  console.log(words);
});
</script>

<template>
    <div class="word-cloud">
        <!-- <vue-word-cloud class="cloud" :words=words /> -->
        <vue-word-cloud :words="words" :color="([, weight]) => getColor(weight)" font-family="微软雅黑,Microsoft YaHei"
            spacing="0.2">
            <template v-slot="{ text }">
                <div style="cursor: pointer;">
                    <router-link active-class="active" :to="`/community/${tagType}/label/${text}`">
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
