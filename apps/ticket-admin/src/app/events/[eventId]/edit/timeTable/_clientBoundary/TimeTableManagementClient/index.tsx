"use client";

import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";
import { useTimeTableSuspenseQuery } from "@/data/admin/getTimeTables/queries";
import { useTimeTableMutation } from "@/data/admin/patchTimeTables/mutation";
import { usePostTimeTableInitial } from "@/data/admin/postTimeTable/mutation";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
};

export const TimeTableManagementClient = ({ eventId }: Props) => {
  const { data: timeTableData } = useTimeTableSuspenseQuery({
    eventId,
    options: {
      throwOnError: false,
    },
  });

  console.log("@@timeTableData", timeTableData);

  const { mutateAsync: createTimeTable, isPending } = usePostTimeTableInitial({
    eventId,
  });
  const { mutateAsync: updateTimeTable } = useTimeTableMutation({});

  const timeTableStartDateField = useSelect({
    initialValue: timeTableData?.timetableStartDate,
    validate: (value: string) => {
      if (!value) return "타임테이블 시작 날짜를 선택해주세요.";

      return undefined;
    },
  });

  const timeTableEndDateField = useSelect({
    initialValue: timeTableData?.timetableEndDate,
    validate: (value: string) => {
      if (!value) return "타임테이블 종료 날짜를 선택해주세요.";

      return undefined;
    },
  });

  const timeTableStartTimeField = useTextField({
    initialValue: timeTableData?.timetableStartTime,
    validate: (value: string) => {
      if (!value.trim()) return "타임테이블 시작 시간을 입력해주세요.";

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(value)) return "올바른 시간 형식이 아닙니다.";

      return undefined;
    },
  });

  const timeTableEndTimeField = useTextField({
    initialValue: timeTableData?.timetableEndTime,
    validate: (value: string) => {
      if (!value.trim()) return "타임테이블 종료 시간을 입력해주세요.";

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(value)) return "올바른 시간 형식이 아닙니다.";

      return undefined;
    },
  });

  const notionDatabaseDataSourceIdField = useTextField({
    initialValue: timeTableData?.notionTimetableDataSourceId,
    validate: (value: string) => {
      if (!value.trim()) return "노션 database 데이터소스 아이디를 입력해주세요.";

      return undefined;
    },
  });

  const notionCategoryDataSourceIdField = useTextField({
    initialValue: timeTableData?.notionCategoryDataSourceId,
    validate: (value: string) => {
      if (!value.trim()) return "노션 category 데이터소스 아이디를 입력해주세요.";

      return undefined;
    },
  });

  const notionStageDataSourceIdField = useTextField({
    initialValue: timeTableData?.notionStageDataSourceId,
    validate: (value: string) => {
      if (!value.trim()) return "노션 stage 데이터소스 아이디를 입력해주세요.";

      return undefined;
    },
  });

  const handleSave = async () => {
    if (!timeTableData) {
      try {
        await createTimeTable({
          timetableStartAt: `${timeTableStartDateField.value} ${timeTableStartTimeField.value}`,
          timetableEndAt: `${timeTableEndDateField.value} ${timeTableEndTimeField.value}`,
          notionTimetableDataSourceId: notionDatabaseDataSourceIdField.value,
          notionCategoryDataSourceId: notionCategoryDataSourceIdField.value,
          notionStageDataSourceId: notionStageDataSourceIdField.value,
        });

        alert("타임테이블 생성이 완료되었습니다.");

        window.location.reload();
      } catch (error) {
        console.error(error);

        alert("타임테이블 생성에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      console.log("@@@@");

      try {
        await updateTimeTable({
          timetableId: timeTableData.timetableId,
          timetableStartAt: `${timeTableStartDateField.value} ${timeTableStartTimeField.value}`,
          timetableEndAt: `${timeTableEndDateField.value} ${timeTableEndTimeField.value}`,
          notionTimetableDataSourceId: notionDatabaseDataSourceIdField.value,
          notionCategoryDataSourceId: notionCategoryDataSourceIdField.value,
          notionStageDataSourceId: notionStageDataSourceIdField.value,
        });

        alert("타임테이블 수정이 완료되었습니다.");

        window.location.reload();
      } catch (error) {
        console.error(error);

        alert("타임테이블 수정에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className={cx("container")}>
      <Typography type="title24">TimeTable</Typography>
      {/* TODO: 최초 등록에만 사용해주세요. */}

      <Flex direction="column" gap={24} style={{ marginTop: 32 }}>
        <Flex gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body16" weight="bold">
              TimeTable Start Date
            </Typography>
            <Select
              type="calendar"
              placeholder="타임테이블 시작 날짜를 선택해주세요"
              {...timeTableStartDateField.selectProps}
            />
          </Flex>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body16" weight="bold">
              TimeTable End Date
            </Typography>
            <Select
              type="calendar"
              placeholder="타임테이블 종료 날짜를 선택해주세요"
              {...timeTableEndDateField.selectProps}
            />
          </Flex>
        </Flex>

        <Flex gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body16" weight="bold">
              Start Time
            </Typography>
            <TextField
              placeholder="타임테이블 시작 시간을 입력해주세요 (HH:MM)"
              value={timeTableStartTimeField.value}
              onChange={timeTableStartTimeField.handleChange}
              error={timeTableStartTimeField.error}
            />
          </Flex>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body16" weight="bold">
              End Time
            </Typography>
            <TextField
              placeholder="타임테이블 종료 시간을 입력해주세요 (HH:MM)"
              value={timeTableEndTimeField.value}
              onChange={timeTableEndTimeField.handleChange}
              error={timeTableEndTimeField.error}
            />
          </Flex>
        </Flex>

        <Flex gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body16" weight="bold">
              노션 database 데이터소스 아이디
            </Typography>
            <TextField
              placeholder="노션 database 데이터소스 아이디를 입력해주세요"
              value={notionDatabaseDataSourceIdField.value}
              onChange={notionDatabaseDataSourceIdField.handleChange}
              error={notionDatabaseDataSourceIdField.error}
            />
          </Flex>
        </Flex>
        <Flex gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body16" weight="bold">
              노션 category 데이터소스 아이디
            </Typography>
            <TextField
              placeholder="노션 category 데이터소스 아이디를 입력해주세요"
              value={notionCategoryDataSourceIdField.value}
              onChange={notionCategoryDataSourceIdField.handleChange}
              error={notionCategoryDataSourceIdField.error}
            />
          </Flex>
        </Flex>
        <Flex gap={24}>
          <Flex className={cx("row")} direction="column" gap={12}>
            <Typography type="body16" weight="bold">
              노션 stage 데이터소스 아이디
            </Typography>
            <TextField
              placeholder="노션 stage 데이터소스 아이디를 입력해주세요"
              value={notionStageDataSourceIdField.value}
              onChange={notionStageDataSourceIdField.handleChange}
              error={notionStageDataSourceIdField.error}
            />
          </Flex>
        </Flex>
      </Flex>

      <Button
        className={cx("action_button")}
        variant="cta"
        onClick={handleSave}
        isLoading={isPending}
        useClickDebounce
      >
        Save
      </Button>
    </div>
  );
};
