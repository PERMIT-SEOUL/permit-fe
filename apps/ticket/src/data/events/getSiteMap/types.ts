export type SiteMapParams = {
  eventId: string;
};

export type SiteMapResponse = {
  eventName: string;
  siteMapImages: { imageUrl: string }[];
};
