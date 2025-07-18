export const getPathUrl = (path: string, params: Record<string, string | number>): string => {
  let url = path;

  // 필수 파라미터 검증
  const requiredParams = path.match(/:(\w+)/g)?.map((p) => p.substring(1)) || [];
  const missingParams = requiredParams.filter((param) => !(param in params));

  if (missingParams.length > 0) {
    throw new Error(`Missing required parameters: ${missingParams.join(", ")}`);
  }

  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, value.toString());
  }

  // 치환되지 않은 파라미터 검증
  if (url.includes(":")) {
    console.warn(`Unreplaced parameters found in URL: ${url}`);
  }

  return url;
};
