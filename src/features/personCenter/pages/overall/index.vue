<template>
  <div class="contanier">
    <div class="header">
      <div class="bagdImg"><img src="@/assets/img/test.jpg" /></div>
      <div class="myInfo">
        <Avatar
          style="
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-right: 20px;
          "
        >
          <AvatarImage src="src/assets/img/test.jpg" alt="@radix-vue" />
          <AvatarFallback>头像</AvatarFallback>
        </Avatar>
        <div class="infoBox">
          <p class="nameAndSex">
            name
            <Icon
              style="display: inline-block"
              v-if="gender == '男'"
              icon="mdi:gender-male"
            />
            <Icon
              style="display: inline-block"
              v-if="gender == '女'"
              icon="ph:gender-female"
            />
          </p>
          <p class="job">前端</p>
        </div>
      </div>
      <div class="signature">
        <p>
          <Icon
            style="display: inline-block"
            icon="fluent:document-signature-16-regular"
          />
          个性签名个性签名个性签名
        </p>
      </div>

      <div class="moreInfoBox">
        <div class="arrowBox" @click="changeIsShow">
          <Icon width="20px" v-show="!isShow" icon="quill:chevron-down" />
          <Icon width="20px" v-show="isShow" icon="quill:chevron-up" />
        </div>
        <div class="moreInfo" v-show="isShow">
          <p>
            <Icon
              style="display: inline-block; font-size: 18px"
              icon="tabler:number"
            />
            学号:
            <span>20201514101</span>
          </p>
          <p>
            <Icon
              style="display: inline-block; font-size: 18px"
              icon="ri:group-line"
            />
            组别: <span>六组</span>
          </p>
          <p>
            <Icon
              style="display: inline-block; font-size: 18px"
              icon="ic:outline-email"
            />
            邮箱:
            <span>2020202020@qq.com</span>
          </p>
          <p>
            <Icon
              style="display: inline-block; font-size: 18px"
              icon="ic:outline-email"
            />
            班级:
            <span>计科231</span>
          </p>
          <p>
            <Icon
              style="display: inline-block; font-size: 18px"
              icon="ic:outline-email"
            />
            电话:
            <span>12345678910</span>
          </p>
          <p>
            <Icon
              style="display: inline-block; font-size: 18px"
              icon="ic:outline-email"
            />
            QQ:
            <span>2020202020</span>
          </p>
          <p>
            <Icon
              style="display: inline-block; font-size: 18px"
              icon="ic:outline-email"
            />
            毕业去向:
            <span>华为</span>
          </p>
        </div>
      </div>

      <div class="lastLoginTime">
        <p>
          <Icon
            style="display: inline-block"
            icon="mdi:calendar-outline"
          />上次登录时间：<span>2020-01-01</span>
        </p>
      </div>
    </div>
    <div class="myPosts">
      <div class="postsData">
        <div class="postsQuantity">
          <p>0</p>
          <p>文章</p>
        </div>
        <div class="postsQuantity">
          <p>0</p>
          <p>文章</p>
        </div>
        <div class="postsQuantity">
          <p>0</p>
          <p>文章</p>
        </div>
      </div>
      <div class="postsListBox">
        <ul>
          <li>
            <img src="@/assets/img/test.jpg" alt="文章封面" />
            <div class="postInfo">
              <p class="postTitle">文章标题</p>
              <p class="postFooter">
                <span class="postTime">2020-01-01</span>
                <span class="likes">23</span>
              </p>
            </div>
          </li>
          <li>
            <img src="@/assets/img/test.jpg" alt="" />
            <div class="postInfo">文章标题</div>
          </li>
          <li>
            <img src="@/assets/img/test.jpg" alt="" />
            <div class="postInfo">文章标题</div>
          </li>
          <li>
            <img src="@/assets/img/test.jpg" alt="" />
            <div class="postInfo">文章标题</div>
          </li>
          <li>
            <img src="@/assets/img/test.jpg" alt="" />
            <div class="postInfo">文章标题</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="myGrade"></div>
  </div>
</template>

<script setup>
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
let isShow = ref(false);
function changeIsShow() {
  isShow.value = !isShow.value;
}
const gender = "男";
</script>

<style lang="scss" scoped>
.contanier {
  width: 50vw;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
  background-color: #f3f3f3;

  .header {
    width: 100%;
    position: relative;

    .bagdImg {
      width: 100%;
      height: 30vh;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .myInfo {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .infoBox {
        height: 50px;

        .job {
          font-size: 14px;
          color: #999;
        }
      }
    }

    .signature {
      margin: 20px 0px 0px 20px;
      font-size: large;
      color: #999;
    }

    .moreInfoBox {
      position: relative;

      .arrowBox {
        width: 20px;
        border-radius: 50%;
        background-color: #cccccc;
        color: white;
        position: absolute;
        right: 10px;
        bottom: 0px;
        cursor: pointer;
      }

      .moreInfo {
        margin-top: 10px;
        width: 100%;

        p {
          height: 22px;
          line-height: 22px;
          margin: 10px;
          margin-left: 20px;
          color: #999;
          font-size: 14px;
        }
      }
    }

    .lastLoginTime {
      width: 100%;
      border-top: 1px solid #999;
      border-bottom: 1px solid #999;
      margin: 20px 0px;
      padding: 10px;
      text-align: center;
    }
  }

  .myPosts {
    margin-top: 10px;
    width: 100%;
    background-color: #ededed;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #999;
    // height: 200px;

    .postsData {
      display: flex;

      .postsQuantity {
        width: 33.3%;
        text-align: center;
      }
    }

    .postsListBox {
      width: 100%;

      ul {
        li {
          margin-top: 20px;
          height: 100px;
          display: flex;
          border-radius: 10px;
          background-color: white;
          padding: 10px;
          box-shadow: 5px 5px 5px #d9d9d9;

          img {
            width: 80px;
          }

          .postInfo {
            margin-left: 20px;
          }
        }
      }
    }
  }

  .myGrade {
    margin-top: 10px;
    width: 100%;
    background-color: #ededed;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #999;
    height: 200px;
  }
}
</style>
