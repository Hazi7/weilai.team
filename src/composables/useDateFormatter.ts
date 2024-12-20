export function useDateFormatter() {
  // 定义一个内部函数来格式化日期
  function formatDateToYYYYMMDD(isoDateString: string): string {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}·${month}·${day}`;
  }
  function formatDatetoDay(isoDateString: string): string {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  }
  function formatDatetoSecond(isoDateString: string): string {
    const date = new Date(isoDateString);
    console.log(date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day} `;
  }

  // 返回包含格式化函数的对象
  return {
    formatDateToYYYYMMDD,
    formatDatetoDay,
  };
}
