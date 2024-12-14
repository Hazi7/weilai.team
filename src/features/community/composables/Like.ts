import { useRequest } from "vue-request";
import apiClient from "@/api/axios";
// 点赞文章的请求函数
const likeArticle = (postId: string) => {
  return apiClient.put(`/post/like/${postId}`);
};

const { data: likeData, run: likeRun } = useRequest(likeArticle, {
  manual: true,
});
export { likeData, likeRun };
