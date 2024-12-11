import { formatRelative, isValid, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";

export function formatPostTime(time: string): string {
  const date = parseISO(time);

  if (!isValid(date)) {
    throw new Error("无效的时间格式");
  }

  return formatRelative(date, new Date(), {
    locale: zhCN,
  });
}
