import { useRequest } from "@/composables/useRequest";
import type { AcceptableInputValue } from "node_modules/radix-vue/dist/TagsInput/TagsInputRoot";

export default function useCreatePost() {
  const { loading, error, data, executeRequest } = useRequest();

  async function createPost(
    postAbstract: string | number | undefined,
    postTxt: string | undefined,
    tags: AcceptableInputValue[] | undefined,
    title: string | undefined,
    type: string | undefined,
  ) {
    await executeRequest({
      url: "/post/put",
      method: "post",
      requestData: {
        postAbstract,
        postTxt,
        tags,
        title,
        type,
      },
    });
  }

  return {
    createPost,
    data,
    loading,
    error,
  };
}
