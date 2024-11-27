<template>
    <div class="mySchedule">
        <Dialog>
            <DialogTrigger as-child class="mb-4">
                <Button variant="outline" class="bg-green-100 text-green-600">
                    添加课程
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] bg-white max-h-[500px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>添加课程</DialogTitle>
                    <DialogDescription>
                        在这里添加您的课程，完成之后点击保存即可
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="courseName" class="text-right">
                            课程名称
                        </Label>
                        <Input id="courseName" class="col-span-3" v-model="courseName" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="weeks" class="text-right">
                            课程周数
                        </Label>
                        <Input id="weeks" class="col-span-3" v-model="weeks" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="weekTime" class="text-right">
                            课程日期
                        </Label>
                        <Select v-model="weekTime">
                            <SelectTrigger class="col-span-3">
                                <SelectValue placeholder="选择日期" />
                            </SelectTrigger>
                            <SelectContent class="bg-white">
                                <SelectGroup>
                                    <SelectItem value="1" class="cursor-pointer hover:bg-gray-100">
                                        周一
                                    </SelectItem>
                                    <SelectItem value="2" class="cursor-pointer hover:bg-gray-100">
                                        周二
                                    </SelectItem>
                                    <SelectItem value="3" class="cursor-pointer hover:bg-gray-100">
                                        周三
                                    </SelectItem>
                                    <SelectItem value="4" class="cursor-pointer hover:bg-gray-100">
                                        周四
                                    </SelectItem>
                                    <SelectItem value="5" class="cursor-pointer hover:bg-gray-100">
                                        周五
                                    </SelectItem>
                                    <SelectItem value="6" class="cursor-pointer hover:bg-gray-100">
                                        周六
                                    </SelectItem>
                                    <SelectItem value="7" class="cursor-pointer hover:bg-gray-100">
                                        周日
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="courseTime" class="text-right">
                            上课时间
                        </Label>
                        <Select v-model="courseTime">
                            <SelectTrigger class="col-span-3">
                                <SelectValue placeholder="选择时间" />
                            </SelectTrigger>
                            <SelectContent class="bg-white">
                                <SelectGroup>
                                    <SelectItem value="1-2" class="cursor-pointer hover:bg-gray-100">
                                        1-2节
                                    </SelectItem>
                                    <SelectItem value="3-4" class="cursor-pointer hover:bg-gray-100">
                                        3-4节
                                    </SelectItem>
                                    <SelectItem value="5-6" class="cursor-pointer hover:bg-gray-100">
                                        5-6节
                                    </SelectItem>
                                    <SelectItem value="7-8" class="cursor-pointer hover:bg-gray-100">
                                        7-8节
                                    </SelectItem>
                                    <SelectItem value="9-10" class="cursor-pointer hover:bg-gray-100">
                                        9-10节
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="coursePlace" class="text-right">
                            上课地点
                        </Label>
                        <Input id="coursePlace" class="col-span-3" v-model="coursePlace" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" @click="submitForm">
                        保存
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        <Table>
            <TableHeader>
                <TableRow>

                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        周一
                    </TableCell>
                    <TableCell v-for="item in courseList.monday" :key="item.oneCourseId">
                        <p>周数：{{ item.weeks }}</p>
                        <p>课程：{{ item.courseName }}</p>
                        <p>节数：{{ item.courseTime }}</p>
                        <p>地点：{{ item.coursePlace }}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger class="ellipsis">
                                <Button class="bg-gray-200">操作</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="p-0  bg-white">
                                <DropdownMenuLabel>操作</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn deletePost" :data-id="item.oneCourseId"
                                        @click="deleteCourse">删除课程</Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn updatePost">修改课程</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        周二
                    </TableCell>
                    <TableCell v-for="item in courseList.tuesday" :key="item.oneCourseId">
                        <p>周数：{{ item.weeks }}</p>
                        <p>课程：{{ item.courseName }}</p>
                        <p>节数：{{ item.courseTime }}</p>
                        <p>地点：{{ item.coursePlace }}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger class="ellipsis">
                                <Button class="bg-gray-200">操作</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="p-0  bg-white">
                                <DropdownMenuLabel>操作</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn deletePost" :data-id="item.oneCourseId"
                                        @click="deleteCourse">删除课程</Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn updatePost">修改课程</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        周三
                    </TableCell>
                    <TableCell v-for="item in courseList.wednesday" :key="item.oneCourseId">
                        <p>周数：{{ item.weeks }}</p>
                        <p>课程：{{ item.courseName }}</p>
                        <p>节数：{{ item.courseTime }}</p>
                        <p>地点：{{ item.coursePlace }}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger class="ellipsis">
                                <Button class="bg-gray-200">操作</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="p-0  bg-white">
                                <DropdownMenuLabel>操作</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn deletePost" :data-id="item.oneCourseId"
                                        @click="deleteCourse">删除课程</Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn updatePost">修改课程</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        周四
                    </TableCell>
                    <TableCell v-for="item in courseList.thursday" :key="item.oneCourseId">
                        <p>周数：{{ item.weeks }}</p>
                        <p>课程：{{ item.courseName }}</p>
                        <p>节数：{{ item.courseTime }}</p>
                        <p>地点：{{ item.coursePlace }}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger class="ellipsis">
                                <Button class="bg-gray-200">操作</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="p-0  bg-white">
                                <DropdownMenuLabel>操作</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn deletePost" :data-id="item.oneCourseId"
                                        @click="deleteCourse">删除课程</Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn updatePost">修改课程</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        周五
                    </TableCell>
                    <TableCell v-for="item in courseList.friday" :key="item.oneCourseId">
                        <p>周数：{{ item.weeks }}</p>
                        <p>课程：{{ item.courseName }}</p>
                        <p>节数：{{ item.courseTime }}</p>
                        <p>地点：{{ item.coursePlace }}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger class="ellipsis">
                                <Button class="bg-gray-200">操作</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="p-0  bg-white">
                                <DropdownMenuLabel>操作</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn deletePost" :data-id="item.oneCourseId"
                                        @click="deleteCourse">删除课程</Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn updatePost">修改课程</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        周六
                    </TableCell>
                    <TableCell v-for="item in courseList.saturday" :key="item.oneCourseId">
                        <p>周数：{{ item.weeks }}</p>
                        <p>课程：{{ item.courseName }}</p>
                        <p>节数：{{ item.courseTime }}</p>
                        <p>地点：{{ item.coursePlace }}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger class="ellipsis">
                                <Button class="bg-gray-200">操作</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="p-0  bg-white">
                                <DropdownMenuLabel>操作</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn deletePost" :data-id="item.oneCourseId"
                                        @click="deleteCourse">删除课程</Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn updatePost">修改课程</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>
                        周日
                    </TableCell>
                    <TableCell v-for="item in courseList.sunday" :key="item.oneCourseId">
                        <p>周数：{{ item.weeks }}</p>
                        <p>课程：{{ item.courseName }}</p>
                        <p>节数：{{ item.courseTime }}</p>
                        <p>地点：{{ item.coursePlace }}</p>
                        <DropdownMenu>
                            <DropdownMenuTrigger class="ellipsis">
                                <Button class="bg-gray-200">操作</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="p-0  bg-white">
                                <DropdownMenuLabel>操作</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn deletePost" :data-id="item.oneCourseId"
                                        @click="deleteCourse">删除课程</Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button class="operationsBtn updatePost">修改课程</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Dialog>
            <DialogTrigger as-child>
                <Button variant="outline" class="bg-green-100 text-green-600">
                    添加课程
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] bg-white max-h-[500px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>添加课程</DialogTitle>
                    <DialogDescription>
                        在这里添加您的课程，完成之后点击保存即可
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="courseName" class="text-right">
                            课程名称
                        </Label>
                        <Input id="courseName" class="col-span-3" v-model="courseName" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="weeks" class="text-right">
                            课程周数
                        </Label>
                        <Input id="weeks" class="col-span-3" v-model="weeks" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="weekTime" class="text-right">
                            课程日期
                        </Label>
                        <Select v-model="weekTime">
                            <SelectTrigger class="col-span-3">
                                <SelectValue placeholder="选择日期" />
                            </SelectTrigger>
                            <SelectContent class="bg-white">
                                <SelectGroup>
                                    <SelectItem value="1" class="cursor-pointer hover:bg-gray-100">
                                        周一
                                    </SelectItem>
                                    <SelectItem value="2" class="cursor-pointer hover:bg-gray-100">
                                        周二
                                    </SelectItem>
                                    <SelectItem value="3" class="cursor-pointer hover:bg-gray-100">
                                        周三
                                    </SelectItem>
                                    <SelectItem value="4" class="cursor-pointer hover:bg-gray-100">
                                        周四
                                    </SelectItem>
                                    <SelectItem value="5" class="cursor-pointer hover:bg-gray-100">
                                        周五
                                    </SelectItem>
                                    <SelectItem value="6" class="cursor-pointer hover:bg-gray-100">
                                        周六
                                    </SelectItem>
                                    <SelectItem value="7" class="cursor-pointer hover:bg-gray-100">
                                        周日
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="courseTime" class="text-right">
                            上课时间
                        </Label>
                        <Select v-model="courseTime">
                            <SelectTrigger class="col-span-3">
                                <SelectValue placeholder="选择时间" />
                            </SelectTrigger>
                            <SelectContent class="bg-white">
                                <SelectGroup>
                                    <SelectItem value="1-2" class="cursor-pointer hover:bg-gray-100">
                                        1-2节
                                    </SelectItem>
                                    <SelectItem value="3-4" class="cursor-pointer hover:bg-gray-100">
                                        3-4节
                                    </SelectItem>
                                    <SelectItem value="5-6" class="cursor-pointer hover:bg-gray-100">
                                        5-6节
                                    </SelectItem>
                                    <SelectItem value="7-8" class="cursor-pointer hover:bg-gray-100">
                                        7-8节
                                    </SelectItem>
                                    <SelectItem value="9-10" class="cursor-pointer hover:bg-gray-100">
                                        9-10节
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="coursePlace" class="text-right">
                            上课地点
                        </Label>
                        <Input id="coursePlace" class="col-span-3" v-model="coursePlace" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" @click="submitForm">
                        保存
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Button from '@/components/ui/button/Button.vue';

import { useRequest } from '@/composables/useRequest'
const { data, error, loading, executeRequest } = useRequest()
import { useLocalStorageWithExpire } from '@/composables/useLocalStorage';
const { getLocalStorageWithExpire, setLocalStorageWithExpire } = useLocalStorageWithExpire()

import { reactive, watch, ref } from 'vue';

// 获取userId
const userId = getLocalStorageWithExpire('userId')

let courseList = reactive({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
})

async function getSchedule() {
    await executeRequest({ url: `/user/getUserCourse/${userId}` })
    if (data.value && data.value.code == 200) {
        Object.assign(courseList, data.value.data);
        console.log('课表：', courseList);
    }
}
getSchedule()

async function deleteCourse(e) {
    if (confirm('确定删除吗？')) {
        let courseId = e.target.dataset.id
        await executeRequest({ url: `/user/deleteUserCourse/${courseId}`, method: 'delete' })
        if (data.value && data.value.code == 200) {
            console.log('删除成功', data.value);
            getSchedule()
        }
    }
}

let weeks = ref('')
let weekTime = ref('')
let courseName = ref('')
let courseTime = ref('')
let coursePlace = ref('')
async function submitForm() {
    console.log(weeks.value, weekTime.value, courseName.value, courseTime.value, coursePlace.value);
    const dataToSend = {
        weeks: weeks.value,
        weekTime: Number(weekTime.value),
        courseName: courseName.value,
        courseTime: courseTime.value,
        coursePlace: coursePlace.value
    }
    await executeRequest({ url: '/user/addUserCourse', method: 'post', requestData: dataToSend })
    if (data.value.code === 200) {
        console.log(data.value);
    }
    console.log(error.value);
    getSchedule()
}
</script>
<style lang="scss" scoped>
.operationsBtn {
    width: 100%;
}

.deletePost {
    background-color: rgb(255, 172, 172);
    color: rgb(255, 0, 0);
}

.updatePost {
    background-color: #acdeff;
    color: rgb(0, 0, 255);
}

.mySchedule {
    margin-top: 20px;
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #ccc;

}
</style>