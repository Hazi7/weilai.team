<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {ref} from 'vue';

interface IProp {
  InterviewTime: string;
  InterviewAddress: string;
  InterviewRound: string;
  InterviewName: string;
  InterviewStatus: string;
  InterviewId: string;
  InterviewOfficerFirst: {
    name: string;
    id: string;
  };
  InterviewOfficerSecond: {
    name: string;
    id: string;
  };
  InterviewOfficerThird: {
    name: string;
    id: string;
  };
}
const props = defineProps<
{
    cardMessage:IProp,
}>()


const dateTime = ref({
  date: props.cardMessage.InterviewTime.split(' ')[0],
  time: props.cardMessage.InterviewTime.split(' ')[1],
})
const InterviewOfficerIdArr=ref([
    props.cardMessage.InterviewOfficerFirst.id,
    props.cardMessage.InterviewOfficerSecond.id,
    props.cardMessage.InterviewOfficerThird.id,
])
const InterviewRecordId=ref(props.cardMessage.InterviewId)

</script>
<template>
  <Card class="message-show" >
    <CardContent>
       <div class="message-show-top">
            <div class="message-show-time">
                <span class="min-width inline-block">
                    {{ dateTime.date }}
                </span>
                &nbsp;
                <span class="min-width inline-block">
                   {{ dateTime.time }}
                </span>
            </div>
            <div class="message-show-address">
                <span class="min-width">
                    面试地点：
                </span>
                <span class="min-width inline-block">
                    {{cardMessage.InterviewAddress}}
                </span>
            </div>
            <div class="message-show-interviewInturn">
                <span class="min-width" >
                    面试轮次：
                </span>
                <span class="min-width  inline-block" >
                    {{cardMessage.InterviewRound}}
                </span>
            </div>
            <div class="message-show-name">
                <span class="min-width">
                   {{ cardMessage.InterviewName}}
                </span>
            </div>
       </div>
       <div class="message-show-bottom">
            <div class="message-show-interviewOfficer">
                <span class="min-width">
                   面试官：
                </span>
                <span class="min-width" >
                    {{cardMessage.InterviewOfficerFirst.name}}
                    {{  cardMessage.InterviewOfficerSecond.name  }}
                    {{  cardMessage.InterviewOfficerThird.name  }}
                </span>
            </div>
            <div class="message-show-staus">
                <span class="min-width">
                  {{cardMessage.InterviewStatus }}
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
    min-width: 360px;
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