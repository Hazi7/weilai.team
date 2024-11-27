<script setup lang="ts">
// 引入组件
import{ MessageCard} from '@/components/recruitment'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@iconify/vue";
import { ToggleShow } from "@/components/recruitment";

// 引入vue函数
import { ref } from "vue";

// 定义切换组件的基本信息 传给子组件
const items = ref([
    {
        index: 0,
        title: '待我反馈',
        isActive: true,
    },
    {
        index: 1,
        title: '我录取的',
        isActive: false,
    },
    {
        index: 2,
        title: '我淘汰的',
        isActive: false,
    }
]);

</script>

<template>
  <div class="main">
    <div id="left-side">
      <div id="quick-look-group">
        <Card class="card-message-show">
          <CardHeader>
            <CardTitle> </CardTitle>
            <CardDescription>待安排</CardDescription>
          </CardHeader>
          <CardContent> 6 </CardContent>
          <CardFooter>
            <Icon icon="lucide:hand" />
          </CardFooter>
        </Card>
        <Card class="card-message-show">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>
              已录取<Icon icon="lucide:hand"
            /></CardDescription>
          </CardHeader>
          <CardContent> 6 </CardContent>
          <CardFooter> </CardFooter>
        </Card>
      </div>
      <div id="quick-control">
        <Card id="card-control">
          <CardHeader>
            <CardTitle id="title">快捷操作 </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div id="control-group">
              <div id="control-item">
                <div id="control-icon">
                  <Icon
                    id="control-icon-svg"
                    icon="mdi-light:vector-arrange-below"
                  />
                </div>
                <div id="control-text">
                  <h6>安排面试</h6>
                  <p>候选人</p>
                </div>
                <div id="control-click">
                  <Icon
                    id="control-click-svg"
                    icon="solar:alt-arrow-right-line-duotone"
                  />
                </div>
              </div>

              <div id="control-item">
                <div id="control-icon">
                  <Icon
                    id="control-icon-svg"
                    icon="mdi-light:vector-arrange-below"
                  />
                </div>
                <div id="control-text">
                  <h6>安排面试</h6>
                  <p>候选人</p>
                </div>
                <div id="control-click">
                  <Icon
                    id="control-click-svg"
                    icon="solar:alt-arrow-right-line-duotone"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter> </CardFooter>
        </Card>
      </div>
    </div>

    <div id="content">
      <div id="content-container">
        <div class="toggle-outer">
          <ToggleShow :items="items" ></ToggleShow>
        </div>
        <div class="message-shows">
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
          <MessageCard></MessageCard>
        </div>
      </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles';

.main {
  width: 100%;
  height: auto;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  top: 20px;
  box-sizing: content-box;
}

//#region 左侧边栏
#left-side {
  width: 20%;
  height: auto;
  background-color: #fff;
  position: relative;
  display: inline-block;
  margin-top: 10px;
  border: none;
}
.card-message-show {
  width: 100%;
  height: 150px;
  background-color: #fff;
  position: relative;
  display: inline-block;
  margin-top: 10px;
}
#quick-look-group {
  width: 100%;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#quick-control {
  width: 100%;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #card-control {
    width: 90%;
    height: 150px;
  }
}
#quick-control {
  width: 100%;
  height: 150px;
  background-color: #fff;
  position: relative;
  display: inline-block;
  top: 20px;
  margin-top: 10px;
  border: none;
  #card-control {
    width: 100%;
    height: auto;
    border: none;
    #title {
      font-size: 1em;
      font-weight: 100;
      text-align: left;
    }
    #control-group {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      #control-item {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
        #control-icon {
          width: 60px;
          height: 40px;
          background-color: #cdd9fc;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10%;
          margin-bottom: 20px;
          #control-icon-svg {
            width: 20px;
            height: 20px;
            position: relative;
            display: inline-block;
            border: none;
            border-radius: 10%;
            color: white;
          }
        }
        #control-text {
          width: 100%;
          height: 40px;
          background-color: #fff;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: left;
          margin-left: 10px;
          font-size: 1em;
          p {
            font-size: 0.8em;
            color: #b1b2c6;
          }
          @media screen and (max-width: 768px) {
            display: none;
          }
        }

        #control-click {
          width: 60px;
          height: 40px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10%;
          background-color: #f0f0f0;
          #control-click-svg {
            font-size: 1.2em;
          }
        }
      }
    }
  }
}
//#endregion

//#region 中间内容区
#content {
  width: 70%;
  background-color:var(--background);
  position: relative;
  display: inline-block;
  top: 20px;
  left: 20px;
  border: none;
}
#content-container {
  width: 100%;
  height: auto;
  .toggle-outer {
    width: 100%;
    height: 80px;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    align-items: center;
    border: 1px dashed var(--border);
    border-radius: var(--radius);
  }

}
.message-shows{
  position: relative;
  top: 20px;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: auto;
  padding: 10px;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}

//#endregion
</style>
