export function useDateFormatter() {
    // 定义一个内部函数来格式化日期
    function formatDateToYYYYMMDD(isoDateString: string): string {
        const date = new Date(isoDateString);
 
        if (isNaN(date.getTime())) {
            throw new Error('Invalid ISO 8601 date string');
        }
 
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
 
        return `${year}年${month}月${day}日`;
    }
 
    // 返回包含格式化函数的对象
    return {
        formatDateToYYYYMMDD
    };
}