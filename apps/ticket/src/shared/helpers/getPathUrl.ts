export const getPathUrl = (path: string, params: Record<string, string | number>): string => {
  let url = path;

  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, value.toString());
  }

  return url;
};
