import { useRequest } from "vue-request";
import apiClient from "@/api/axios";
import { useAlert } from "@/composables/useAlert";
import { watch, ref } from "vue";

const { showAlert } = useAlert();
let postId: string | null = null;
// 点赞文章的请求函数
const likeArticle = (postId: string) => {
  return apiClient.put(`/post/like/${postId}`);
};

const { data: likeData, run: likeRun } = useRequest(
  (id: string) => likeArticle(id),
  {
    manual: true,
  },
);

const isLiked = ref(false);
const likeCount = ref(0);

watch(
  () => likeData.value,
  (newLikeData) => {
    console.log("点赞请求的响应数据:", newLikeData);
    if (newLikeData && newLikeData.code === 2009) {
      showAlert("点赞成功", "pass");
      isLiked.value = true;
    } else if (newLikeData && newLikeData.code === 2011) {
      showAlert("取消点赞成功", "pass");
      isLiked.value = false;
    } else {
      showAlert("点赞失败", "error");
    }
  },
);
export const useLikeData = () => ({
  isLiked,
  likeCount,
  handleLikeClick: (id: string) => {
    postId = id;
    likeRun(postId);
  },
});
