export function toCDNUrl(bucketurl: string) {
  return `${process.env.NEXT_PUBLIC_CDN_HOST}${new URL(bucketurl).pathname}`;
}
