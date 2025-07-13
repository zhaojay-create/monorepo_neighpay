// 获取时间范围
export function getDateRange(range: string) {
  const now = new Date();
  switch (range) {
    case "day":
      return new Date(now.getTime() - 1 * 86400000);
    case "week":
      return new Date(now.getTime() - 7 * 86400000);
    case "month":
      return new Date(now.getTime() - 30 * 86400000);
    default:
      return new Date(0); // 不筛选
  }
}

// 获取数据
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function buildUrl(
  base: string,
  params: Record<string, string | number | undefined>
) {
  const query = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== "") {
      query.set(key, String(params[key]));
    }
  }
  return `${base}?${query.toString()}`;
}
