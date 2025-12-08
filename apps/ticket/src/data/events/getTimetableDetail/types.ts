export type TimetableDetailParams = {
  blockId: string;
};

export type TimetableDetail = {
  blockName: string;
  blockCategory: string;
  categoryLineColor: string;
  categoryBackgroundColor: string;
  isLiked: boolean;
  information: string;
  stage: string;
  media: {
    mediaUrl: string;
  }[];
  blockInfoUrl: string;
  startDate: string;
  endDate: string;
};
