<script setup lang="ts">
import { HeaderNav } from "@/components/recruitment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@iconify/vue";
// import { ToggleShow } from '@/components/recruitment';
document.title = "招新管理";
</script>

<template>
  <div class="main">
    <header-nav id="header"></header-nav>

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
      <div id="content-container"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  width: calc(100% - 200px);
  height: auto;
  background-color: #fff;
  position: relative;
  left: 200px;
  display: inline-block;
  top: 20px;
  box-sizing: content-box;
  @media screen and (max-width: 768px) {
    width: 100%;
    left: 0px;
  }
}

// #region 头部导航栏
#header {
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: relative;
}
// #endregion

//#region 左侧导航栏

#left-side {
  width: 20%;
  height: auto;
  background-color: #fff;
  position: relative;
  display: inline-block;
  top: 20px;
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      #control-item {
        display: flex;
        flex-direction: row;
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
          p {
            font-size: 0.8em;
            color: #b1b2c6;
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
  background-color: #4d2020;
  position: relative;
  display: inline-block;
  top: 20px;
  border: none;
}
#content-container {
  width: 100%;
  height: auto;
}

//#endregion
</style>
