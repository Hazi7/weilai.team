import { useRequest } from "vue-request";
import apiClient from "@/api/axios";
function collects(postId: string) {
  return apiClient.post(`/post/collect/${postId}`);
}
const { run: collectRun, data: collectData } = useRequest(collects, {
  manual: true,
});

export { collectRun, collectData };
