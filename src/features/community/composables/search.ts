import { useRequest } from "@/composables/useRequest";
import type { ArticleList, Data } from "@/types/Community";
import { ref } from "vue";
const { executeRequest, error, loading, data } = useRequest();
let articleList = ref<ArticleList[]>([]);
let searchResult = ref<ArticleList[]>([]);
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
export async function getArticle(type = 0, page = 1, condition = "") {
  await executeRequest({
    url: `/post/selectAll?condition=${condition}&page=${page}&type=${type}`,
    method: "get",
  });
  const res = data.value as Data;
  console.log(res);

  articleList.value = res.data.records;
  console.log(articleList.value);
  return articleList.value;
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
export async function SearchArticle(condition = "") {
  await executeRequest({
    url: `/post/selectPost?condition=${condition}`,
    method: "get",
  });
  const res = data.value as Data;

  searchResult.value = res.data.records;
  console.log(searchResult.value);
}
export { articleList, searchResult };