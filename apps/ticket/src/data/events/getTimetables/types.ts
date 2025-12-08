export type TimetablesParams = {
  eventId: string;
};

export type TimetablesResponse = {
  eventName: string;
  startDate: string;
  endDate: string;
  stages: Stages[];
  blocks: Block[];
};

export type Stages = {
  stageNotionId: string;
  stageName: string;
  sequence: number;
};

export type Block = {
  blockId: string;
  blockName: string;
  blockLineColor: string;
  blockBackgroundColor: string;
  blockStartDate: string;
  blockEndDate: string;
  blockStageNotionId: string;
  isUserLiked: boolean;
};
