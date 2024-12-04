<script setup lang="ts">
import PrimarySidebar from "@/features/post/components/sidebar/PrimarySidebar.vue";
import SecondarySidebar from "@/features/post/components/sidebar/SecondarySidebar.vue";
import AppEditor from "@post/components/AppEditor.vue";
import PostHeader from "@post/components/header/index.vue";
import { onBeforeUnmount, reactive, ref, watch, type Ref } from "vue";
import type { AcceptableInputValue } from "node_modules/radix-vue/dist/TagsInput/TagsInputRoot";
import useAppEditor from "@/features/post/composables/useAppEditor";
import type { JSONContent } from "@tiptap/core";
import * as z from "zod";
import { useRequest } from "@/composables/useRequest";
import { data } from "autoprefixer";
import { toast } from "@/components/ui/toast";
import Toaster from "@/components/ui/toast/Toaster.vue";

const { editor } = useAppEditor();

const postData = reactive({
  postTitle: "" as string | number | undefined,
  postTags: [] as AcceptableInputValue[],
  postCategories: "",
  postSummary: "" as string | number | undefined,
  postContent: undefined as JSONContent | undefined,
});

interface PostErrors {
  postTitle: string;
  postContent: string;
  postTags: string[];
  postCategories: string;
  postSummary: string;
}

const filedErrors = ref<z.ZodFormattedError<PostErrors> | undefined>();

onBeforeUnmount(() => {
  editor.value?.destroy();
});

const postSchema = z.object({
  postTitle: z
    .string()
    .min(1, { message: "博文标题不能为空" })
    .max(100, { message: "博文标题不能超过100个字符" }),
  postContent: z.string().min(1, "博文内容至少需要10个字符"),
  postTags: z.array(z.string()).min(1, "请至少选择一个标签"),
  postCategories: z.string().min(1, "请选择一个分类"),
  postSummary: z
    .string()
    .min(10, { message: "摘要至少需要10个字符" })
    .max(200, { message: "摘要不能超过200个字符" }),
});

const validatePost = () => {
  const parseResult = postSchema.safeParse({
    postTitle: postData.postTitle,
    postContent: JSON.stringify(postData.postContent),
    postTags: postData.postTags,
    postCategories: postData.postCategories,
    postSummary: postData.postSummary,
  });

  if (!parseResult.success) {
    filedErrors.value = parseResult.error.format();
  }

  return parseResult.success;
};

const { executeRequest, loading, data } = useRequest();

const handlePost = async () => {
  if (!validatePost()) {
    return;
  }

  watch(
    () => loading,
    () => {
      console.log(loading);
    },
  );

  await executeRequest({
    url: "/post/put",
    method: "post",
    requestData: {
      postAbstract: postData.postSummary,
      postTxt: JSON.stringify(postData.postContent),
      tags: postData.postTags,
      title: postData.postTitle,
      type: postData.postCategories,
    },
  });

  if (data.value.code === 2000) {
    toast({
      title: "发布成功",
      description: "您的文章已成功发布",
    });
  }
};
</script>

<template>
  <Toaster />
  <div class="post-layout">
    <div class="post-layout__wrapper">
      <PostHeader
        :is-title-tooltip="true"
        :errors="filedErrors"
        :is-publishing="loading"
        :post-title="postData.postTitle"
        @published:post="handlePost"
        @update:post-title="
          (val) => {
            postData.postTitle = val;
            const parseResult = postSchema.pick({ postTitle: true }).safeParse({
              postTitle: val,
            });

            if (filedErrors) {
              filedErrors.postTitle = parseResult.error?.format().postTitle;
            }
          }
        "
      ></PostHeader>
      <main class="post-layout__content">
        <PrimarySidebar></PrimarySidebar>
        <AppEditor
          :editor="editor"
          :post-content="postData.postContent"
          @update:post-content="
            (val) => {
              postData.postContent = val;
            }
          "
        />
        <SecondarySidebar
          :editor="editor"
          :errors="filedErrors"
          :post-tags="postData.postTags"
          :post-categories="postData.postCategories"
          :post-summary="postData.postSummary"
          @update:post-tags="
            (val) => {
              postData.postTags = val;
              const parseResult = postSchema
                .pick({ postTags: true })
                .safeParse({
                  postTags: val,
                });

              if (filedErrors) {
                filedErrors.postTags = parseResult.error?.format().postTags;
              }
            }
          "
          @update:post-categories="
            (val) => {
              postData.postCategories = val;
              const parseResult = postSchema
                .pick({ postCategories: true })
                .safeParse({
                  postCategories: val,
                });

              if (filedErrors) {
                filedErrors.postCategories =
                  parseResult.error?.format().postCategories;
              }
            }
          "
          @update:post-summary="
            (val) => {
              postData.postSummary = val;
              const parseResult = postSchema
                .pick({ postSummary: true })
                .safeParse({
                  postSummary: val,
                });

              if (filedErrors) {
                filedErrors.postSummary =
                  parseResult.error?.format().postSummary;
              }
            }
          "
        ></SecondarySidebar>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-layout {
  box-sizing: border-box;
  height: 100vh;
  padding: 1.5rem;
  background-image: url(/public/post_background.png);
  background-size: cover;

  &__wrapper {
    background-color: rgba(255, 255, 255, 0.5);
    height: 100%;
    border-radius: 1rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  &__content {
    display: flex;
    flex: 1 1 calc(100vh - 3rem);
    overflow: auto;
    box-sizing: border-box;
  }
}
</style>
