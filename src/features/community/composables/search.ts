import apiClient from "@/api/axios";
import { useAlert } from "@/composables/useAlert";
import { useRequest } from "@/composables/useRequest";
import type { ArticleList, Data } from "@/types/Community";
import { ref } from "vue";
const { showAlert } = useAlert();
const { executeRequest, error, loading, data } = useRequest();
let articleList = ref<ArticleList[]>([]);
let searchResult = ref<ArticleList[]>([]);
let userInfo = ref<Data>({} as Data);
export function debounce<T>(
  func: (this: T, ...args: any[]) => void,
  wait: number,
) {
  // 保存定时器的引用
  let timeout: number | undefined;
  // 返回的函数是用户实际调用的函数，它包含了防抖逻辑
  return function (this: T, ...args: any[]) {
    // 保存当前的 this 上下文
    const context: T = this;

    // 清除之前的定时器，如果存在
    if (timeout) clearTimeout(timeout);

    // 设置一个新的定时器
    // 当指定的 wait 时间过后，将执行 func 函数
    // 并将当前的 this 上下文和参数传入
    timeout = setTimeout(function () {
      // 执行原始函数，绑定正确的 this 上下文和参数
      func.apply(context, args);
    }, wait);
  };
}
export async function getArticle(
  type: number | string = 0,
  condition = "",
  page = 1,
  startTime: Date | string = "",
  sort = 0,
) {
  setTimeout(() => {}, 1000);
  await executeRequest({
    url: `/post/selectAll?condition=${condition}&page=${page}&sort=${sort}&startTime=${startTime}&type=${type}`,
    method: "get",
  });
  console.log("渲染文章");

  const res = data.value as Data;
  console.log(res);
  if (res.code === 401) {
    showAlert("登录过期，请重新登录", "waring");
  }
  articleList.value = res.data.records;

  return res.data;
}
export function checkType(type: any) {
  if (type == 1) {
    return "博客";
  } else if (type == 3) {
    return "交流";
  } else if (type == 4) {
    return "头脑风暴";
  }
  return "";
}

export async function getUserList(content = "", pageNumber = 1, pageSize = 30) {
  executeRequest({ url: "/user/searchUser", method: "get" }).then((res) => {
    console.log(res);
  });
}
export async function deletes(ids: string) {
  return apiClient.put(`/post/deletes/${ids}`);
}

export { articleList, error, loading, searchResult };
