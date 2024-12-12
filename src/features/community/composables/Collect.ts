import { useRequest } from "vue-request";
import apiClient from "@/api/axios";
import { useAlert } from "@/composables/useAlert";

const { showAlert } = useAlert();

const { run: collectRun } = useRequest(
  (postId: string) => {
    return apiClient.post(`/post/collect/${postId}`);
  },
  {
    manual: true,
    onSuccess: (newCollectData) => {
      console.log("收藏请求的响应数据:", newCollectData);
      if (newCollectData.code === 2013) {
        showAlert("收藏成功", "pass");
      } else if (newCollectData.code === 2016) {
        showAlert("取消收藏成功", "pass");
      } else {
        showAlert("收藏失败", "error");
      }
    },
    onError: (error) => {
      console.log("收藏请求出错:", error);
      showAlert("收藏失败", "error");
    },
  },
);
export const handleCollect = (postId: string) => {
  if (!postId) {
    showAlert("无效的文章ID", "error");
    return;
  }
  collectRun(postId);
};
