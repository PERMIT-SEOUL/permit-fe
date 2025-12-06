export type TimeTableParams = {
  eventId: number;
};

export type TimeTableResponse = {
  timetableId: number;
  timetableStartDate: string;
  timetableStartTime: string;
  timetableEndDate: string;
  timetableEndTime: string;
  notionTimetableDataSourceId: string;
  notionCategoryDataSourceId: string;
  notionStageDataSourceId: string;
};
