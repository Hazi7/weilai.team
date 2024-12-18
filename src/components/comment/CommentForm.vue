<script setup lang="ts">
import { ref, watch, computed, watchEffect, onMounted, onUnmounted } from "vue";
import { useRequest } from "@/composables/useRequest";
import { Icon } from "@iconify/vue";
import { marked } from "marked";
import dompurify from "dompurify";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const props = defineProps<{
  postId: string | number;
}>();

const { data, error, executeRequest } = useRequest();
const commentText = ref<string>("");
const maxLength = 1000;
const remaining = computed(() => maxLength - commentText.value.length);
const renderedContent = ref<string>("");
const fileInput = ref<HTMLInputElement | null>(null);
const imageTags = ref<string[]>([]);
const photoUrls = ref<string[]>([]);
const emojiVisible = ref<boolean>(false);

const onSelectEmoji = (emoji: string) => {
  commentText.value += emoji.i;
  console.log(emoji);

  emojiVisible.value = false;
};

// 更新内容并限制最大长度
watch(commentText, (newContent) => {
  if (newContent.length > maxLength) {
    commentText.value = newContent.slice(0, maxLength);
  }
});
// 渲染的Markdown内容
watchEffect(async () => {
  const rawHTML = await marked(commentText.value);
  renderedContent.value = dompurify.sanitize(rawHTML);
});
// 图片输入
const uploadImg = () => {
  fileInput.value?.click();
};
// 处理文件选择
const handleFileSelect = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const file = files[0];
    if (photoUrls.value.length >= 1) {
      console.log("只能上传一张图片");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      photoUrls.value.push(url);
      const imgMarkdown = `![${file.name}](${url})`;
      imageTags.value = [imgMarkdown];
    };
    reader.readAsDataURL(file);
  }
};

// 删除图片
const deleteImage = () => {
  photoUrls.value = [];
  imageTags.value = [];
};

// 生命周期函数
onMounted(() => {
  fileInput.value?.addEventListener("change", handleFileSelect);
});

onUnmounted(() => {
  if (fileInput.value) {
    fileInput.value.removeEventListener("change", handleFileSelect);
  }
});
// 写一级评论
const submitComment = async () => {
  if (!commentText.value.trim()) {
    console.log("评论内容不能为空");
    return;
  }
  const requestData = {
    postId: props.postId,
    commentTxt: commentText.value,
  };
  // 发送请求
  await executeRequest({
    url: `/comment/writePostComment`,
    method: "post",
    requestData,
  });

  console.log(data.value, error);
  if (data.value?.code == 200) {
    console.log("评论成功");
    commentText.value = "";
    photoUrls.value = [];
    imageTags.value = [];
  } else {
    console.log("评论失败", error.value);
  }
};
//多级评论
const submitReply = async (commentId: number, userId: number) => {
  if (!commentText.value.trim()) {
    console.log("评论内容不能为空");
    return;
  }
  const requestData = {
    commentId: commentId,
    commentText: commentText.value,
    photoUrls: photoUrls.value,
    parentCommentId: commentId,
    userId: userId,
  };
  console.log("提交的请求数据:", requestData);
  await executeRequest({
    url: `/comment/writeComment`,
    method: "post",
    requestData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
</script>

<template>
  <div class="comment-form">
    <!-- 评论输入框 -->
    <textarea
      v-model="commentText"
      placeholder="请输入你的评论......"
      :maxlength="maxLength"
    ></textarea>
    <div class="image-preview">
      <div
        v-for="(imageTag, index) in imageTags"
        :key="index"
        class="image-tag"
      >
        <img :src="imageTag.split('](')[1].slice(0, -1)" alt="uploaded-image" />
        <div class="delete-btn" @click="deleteImage">
          <Icon icon="iconoir:delete-circle" class="deleteIcon" />
        </div>
      </div>
    </div>
    <!-- 尾部操作区域 -->
    <div class="action-bar">
      <div class="letter">
        <span class="remaining">还可输入{{ remaining }} 个字符</span>
      </div>
      <div class="icon-group">
        <div class="emoji">
          <Popover>
            <PopoverTrigger>
              <Icon icon="lineicons:emoji-smile" class="emojiIcon" />
            </PopoverTrigger>
            <PopoverContent :style="{ padding: '0rem', width: 'auto' }">
              <EmojiPicker
                class="emoji-picker-float"
                :native="true"
                @select="onSelectEmoji"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div class="image">
          <Icon icon="stash:image-plus" class="imageIcon" @click="uploadImg" />
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            hidden
            @change="handleFileSelect"
          />
        </div>
        <!-- 提交按钮 -->
        <button class="submit-btn" @click="submitComment">评论</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popover-content {
  padding: 0;
  width: auto;
}
.comment-form {
  border: 1px solid var(--border);
  border-radius: 10px;
  width: 100%;
  max-width: 650px;
  border-radius: 5px;
  margin-bottom: 5px;
  textarea {
    width: 95%;
    height: 54px;
    resize: none;
    outline: none;
    margin-left: 2.5%;
    margin-top: 5px;
    border-bottom: 1px solid var(--border);
    padding: 14px;
    font-size: 16px;
    color: rgb(83, 82, 82);
  }
  .image-preview {
    margin-left: 15px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    img {
      max-width: 100px;
      max-height: 100px;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  .image-tag {
    position: relative;
    margin-right: 10px;
  }
  .delete-btn {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 19px;
    height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    display: none;
    cursor: pointer;
    .deleteIcon {
      color: black;
      font-size: 15px;
    }
  }
  .image-tag:hover .delete-btn {
    display: flex;
  }

  .action-bar {
    display: flex;
    justify-content: space-between;
    .icon-group {
      display: flex;
      margin-right: 10px;
    }
    .letter {
      justify-content: flex-start;
      font-size: 13px;
      color: var(--secondary-foreground);
      margin-top: 5px;
      margin-left: 25px;
    }
    .emoji {
      position: relative;
    }
    .emojiIcon {
      color: var(--secondary-foreground);
      font-size: 25px;
      cursor: pointer;
      margin-right: 10px;
      //  margin-left: 280px;
      margin-top: 3px;
    }
    .codeIcon {
      color: var(--secondary-foreground);
      font-size: 24px;
      cursor: pointer;
      margin-top: 3px;
      margin-right: 20px;
    }
    .imageIcon {
      color: var(--secondary-foreground);
      font-size: 26px;
      cursor: pointer;
      margin-top: 2px;
      margin-right: 10px;
    }
    .submit-btn {
      width: 70px;
      height: 30px;
      background-color: #5dbee8;
      color: white;
      border: none;
      font-size: 14px;
      border-radius: 15px;
      cursor: pointer;
      margin-bottom: 5px;
      transition: background-color 0.3s ease;
    }
    .submit-btn:hover {
      background-color: #9cdcfe;
    }
  }
}
@media screen and (max-width: 768px) {
  .emoji {
    display: none;
  }
}
</style>
