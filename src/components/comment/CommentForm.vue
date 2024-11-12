<script setup lang="ts">
import {ref } from 'vue';
import { Icon } from '@iconify/vue';
const props = defineProps({
  maxLength: {
    type: Number,
    default: 1000,
  },
});

const emit = defineEmits(['submit']);
const content = ref('');
const remaining = ref(props.maxLength);
// 更新剩余字符数
function updateRemaining() {
  remaining.value = props.maxLength - content.value.length;
}

// 插入表情符号
function insertEmoji() {
  //·····
  updateRemaining();
}

// 支持Markdown语法
//   function insertMarkdown() {
  
//   }

//插入代码块
function insertCode(){

}
// 提交评论
function submitComment() {
  if (content.value.trim()) {
    emit('submit', content.value);
    content.value = '';
    updateRemaining();
  }
}
</script>

<template>
    <div class="comment-form">
      <!-- 评论输入框 -->
      <textarea
        v-model="content"
        placeholder="请输入你的评论......"
        @input="updateRemaining"
      ></textarea>
      <!-- 尾部操作区域 -->
      <div class="action-bar">
        <div class="letter">
          <span class="remaining">还可输入{{ remaining }} 个字符</span>
        </div>
        <div class="emoji" @click="insertEmoji"><Icon icon="lineicons:emoji-smile" class="emojiIcon"/></div>
        <div class="image">
            <Icon icon="stash:image-plus" class="imageIcon"/>
            <input ref="fileInput" type="file"  accept="image/*" hidden />
        </div>
        <div class="code" @click="insertCode"><Icon icon="heroicons-outline:code" class="codeIcon"/></div>
        <!-- 提交按钮 -->
        <button class="submit-btn" @click="submitComment">评论</button>
      </div>
    </div>
  </template>
  
  <style scoped lang="scss">
  .comment-form {
    border: 1px solid #e2eaf4;
    border-radius: 10px;
    width: 100%;
    max-width: 650px;
    margin: 20px auto;
    border-radius: 5px;
    textarea {
       width: 95%;
       height: 54px;
       resize: none;
       outline: none;
       margin-left: 2.5%;
       margin-top: 5px;
       border-bottom: 1px solid #e2eaf4;
       padding: 14px;
       font-size: 16px;
       color: rgb(104, 104, 104);
    }
    .action-bar {
       display: flex;
       .letter{
           width:126px ;
           font-size: 13px;
           color: gray;
           margin-top: 5px;
           margin-left: 29px;
       }
       .emojiIcon{
           color: #7a7979;
           font-size: 25px;
           cursor: pointer;
           margin-right: 10px;
           margin-left: 280px;
           margin-top: 3px;
       }
       .codeIcon{
           color: #7a7979;
           font-size: 24px;
           cursor: pointer;
           margin-top: 3px;
           margin-right: 20px;
       }
       .imageIcon{
           color: #7a7979;
           font-size: 26px;
           cursor: pointer;
           margin-top: 2px;
           margin-right: 10px;
       }
       button {
           width: 70px;
           height: 30px;
           background-color: #5dbee8;
           color: white;
           border: none;
           font-size: 14px;
           border-radius:15px;
           cursor: pointer;
           margin-bottom: 5px;
           transition: background-color 0.3s ease;
       }
       button:hover {
           background-color: #9cdcfe;
       }
    }

}
  
  </style>