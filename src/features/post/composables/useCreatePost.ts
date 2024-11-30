import { useRequest } from "@/composables/useRequest";

export default function useCreatePost() {
  const { executeRequest } = useRequest();

  async function createPost() {
    await executeRequest({
      url: "/post/put",
      method: "post",
    });
  }

  return {
    createPost,
  };
}
