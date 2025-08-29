export type TimetablesParams = {
  eventId: string;
};

export type TimetablesResponse = {
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
  blockColor: string;
  blockStartDate: string;
  blockEndDate: string;
  blockAreaId: number;
  isUserLiked: boolean;
};
