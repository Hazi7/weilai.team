<script setup lang="ts">
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// import { Sliderbar, SliderbarItem } from '@/components/ui/sliderbar';
</script>

<template>

<Card class="card">
    <CardHeader>
      <CardTitle><Icon icon="mdi-light:home" />贝利亚大王</CardTitle>
      <CardDescription>\\\\\\\\</CardDescription>
    </CardHeader>
    <CardContent>
    <img class="img" src="https://jsd.onmicrosoft.cn/gh/Qchengju/MyPic@img/img/202411071528493.jpg"
    alt=""
        />
    </CardContent>
    <CardFooter>
        <Input
    type="email"
    placeholder="Email"
    />
    </CardFooter>
  </Card>



</template>
<style lang="scss" scoped>
    .card{
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color:skyblue;
    border: 1px solid #fff;
    box-shadow: 0 0 10px #000;
    text-align: center;
    position: relative;
    top: 200px;

}
    .img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: 0 0 10px #000;
        margin: 0 auto;
    }

</style>
