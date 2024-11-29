<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
</script>
<template>
  <Card class="message-show" >
    <CardContent>
       <div class="message-show-top">
            <div class="message-show-time">
                <span class="min-width">
                    2024-11-22
                </span>
                <span class="min-width">
                    12:00-13:00
                </span>
            </div>
            <div class="message-show-address">
                <span class="min-width">
                    面试地点：
                </span>
                <span class="min-width inline-block">
                    零号楼609
                </span>
            </div>
            <div class="message-show-interviewInturn">
                <span class="min-width" >
                    面试轮次：
                </span>
                <span class="min-width  inline-block" >
                    二面
                </span>
            </div>
            <div class="message-show-name">
                <span class="min-width">
                    王科林
                </span>
            </div>
       </div>
       <div class="message-show-bottom">
            <div class="message-show-interviewOfficer">
                <span class="min-width">
                   面试官：
                </span>
                <span class="min-width">
                    贝利亚 贝利亚 贝利亚
                </span>
            </div>
            <div class="message-show-staus">
                <span class="min-width">
                    已淘汰
                </span>
            </div>
       </div>
    </CardContent>
    <CardFooter class="message-show-button">
     <Button class="btn-style">查看面评</Button>
     <Button class="btn-style">查看简历</Button>
    </CardFooter>
  </Card>
</template>
<style  lang="scss" scoped>
@use "@/assets/styles";
@use "@/assets/styles/recruitment";

.min-width{
    min-width: 60px;
}

.message-show{
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    cursor: pointer;
    border-radius: var(--radius);
    &:hover{
        background-color: var(--accent);
    }
}
.message-show-top{
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-width: 370px;
    height: 80px;
    margin-bottom: 10px;
    gap: 20px;
    font-size: 0.8rem;
    .message-show-name{
        text-align: center;
        min-width: 70px;
        border: 1px solid skyblue;
        padding: 5px 10px;
        border-radius: 15px;
        margin-right: 10px;
    }
    .message-show-interviewInturn{
        min-width:70px;
    }
}
.message-show-bottom{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 40px;
    gap: 20px;
    font-size: 0.8rem;
}
.message-show-button{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100px;
    height: 100%;
    margin-top: 2em;
    position: absolute;
    right: 16px;
    // margin-left: 4em;
    //
    gap: 10px;
    @media screen and (max-width: 1300px) {
        position: relative;
        margin-left: 1em;
    }
}
.message-show-staus{
    text-align: center;
        width: 80px;
        border: 1px solid #FFCDD2 ;
        padding: 5px 10px;
        border-radius: 15px;
}
</style>