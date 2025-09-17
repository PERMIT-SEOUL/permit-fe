export type TimetableDetailParams = {
  blockId: string;
};

export type TimetableDetail = {
  blockName: string;
  blockCategory: string;
  categoryColor: string;
  isLiked: boolean;
  information: string;
  area: string;
  media: {
    mediaUrl: string;
  }[];
  blockInfoUrl: string;
  startDate: string;
  endDate: string;
};
