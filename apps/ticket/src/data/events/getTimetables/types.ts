export type TimetablesParams = {
  eventId: string;
};

export type TimetablesResponse = {
  eventName: string;
  startDate: string;
  endDate: string;
  areas: Area[];
  blocks: Block[];
};

export type Area = {
  areaId: number;
  areaName: string;
  sequence: number;
};

export type Block = {
  blockId: string;
  blockName: string;
  blockLineColor: string;
  blockBackgroundColor: string;
  blockStartDate: string;
  blockEndDate: string;
  blockAreaId: number;
  isUserLiked: boolean;
};
