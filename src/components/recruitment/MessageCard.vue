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
                <span>2024-11-22 12:00-13:00</span>
            </div>
            <div class="message-show-address">
                <span>
                    地点：零号楼609
                </span>
            </div>
            <div class="message-show-interviewInturn">
                <span>
                    面试轮次：二面
                </span>
            </div>
            <div class="message-show-name">
                <span>
                    王科林
                </span>
            </div>
       </div>
       <div class="message-show-bottom">
            <div class="message-show-interviewOfficer">
                <span>
                   面试官：贝利亚 贝利亚 贝利亚
                </span>
            </div>
            <div class="message-show-staus">
                <span>
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
.message-show{
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    cursor: pointer;
    &:hover{
        border-color: var(--accent-foreground);
    }
}
.message-show-top{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    gap: 20px;
    font-size: 0.8rem;
    .message-show-name{
        text-align: center;
        width: 80px;
        border: 1px solid skyblue;
        padding: 5px 10px;
        border-radius: 15px;
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
    position: absolute;
    gap: 10px;
    right: 30px;
    top: 30px;
}
.message-show-staus{
    text-align: center;
        width: 80px;
        border: 1px solid #FFCDD2 ;
        padding: 5px 10px;
        border-radius: 15px;
}
</style>