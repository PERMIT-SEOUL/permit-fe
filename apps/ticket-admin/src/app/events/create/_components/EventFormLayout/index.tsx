import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import type { UseTextFieldReturn } from "@permit/design-system/hooks";

import { EventFormData } from "../../_clientBoundary/EventFormClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type SelectField = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

type EventFormLayoutProps = {
  formData: EventFormData;
  onFileChange: (files: FileList | null) => void;
  onSubmit: () => void;
  onDelete?: () => void;
  isSubmitting: boolean;
  isEditMode?: boolean;
  currentStep: "basic" | "ticket";
  setCurrentStep: (step: "basic" | "ticket") => void;
  eventExposureStartDateField: SelectField;
  eventExposureEndDateField: SelectField;
  eventVerificationCodeField: UseTextFieldReturn;
  eventNameField: UseTextFieldReturn;
  eventExposureStartTimeField: UseTextFieldReturn;
  eventExposureEndTimeField: UseTextFieldReturn;
  eventStartDateField: SelectField;
  eventEndDateField: SelectField;
  eventStartTimeField: UseTextFieldReturn;
  eventEndTimeField: UseTextFieldReturn;
  venueField: UseTextFieldReturn;
  lineupField: UseTextFieldReturn;
  detailsField: UseTextFieldReturn;
  minAgeField: UseTextFieldReturn;
};

export function EventFormLayout({
  formData,
  onFileChange,
  onSubmit,
  onDelete,
  isSubmitting,
  isEditMode = false,
  currentStep,
  setCurrentStep,
  eventExposureStartDateField,
  eventExposureEndDateField,
  eventVerificationCodeField,
  eventNameField,
  eventExposureStartTimeField,
  eventExposureEndTimeField,
  eventStartDateField,
  eventEndDateField,
  eventStartTimeField,
  eventEndTimeField,
  venueField,
  lineupField,
  detailsField,
  minAgeField,
}: EventFormLayoutProps) {
  return (
    <>
      <div className={cx("container")}>
        {/* Sidebar */}
        <div className={cx("sidebar")}>
          <button className={cx("sidebar_item")} onClick={() => setCurrentStep("basic")}>
            <div className={cx("sidebar_indicator", currentStep === "basic" && "active")} />
            <span className={cx("sidebar_text", currentStep === "basic" && "active")}>
              Add Basic
            </span>
          </button>
          <button className={cx("sidebar_item")} onClick={() => setCurrentStep("ticket")}>
            <div className={cx("sidebar_indicator", currentStep === "ticket" && "active")} />
            <span className={cx("sidebar_text", currentStep === "ticket" && "active")}>
              Add Ticket
            </span>
          </button>
        </div>

        {/* Main */}
        <div className={cx("main")}>
          {currentStep === "basic" && (
            <>
              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Event Exposure Start Date
                  </Typography>
                  <Select
                    type="calendar"
                    placeholder="노출 시작 날짜를 선택해주세요"
                    {...eventExposureStartDateField}
                  />
                </Flex>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Event Exposure End Date
                  </Typography>
                  <Select
                    type="calendar"
                    placeholder="노출 종료 날짜를 선택해주세요"
                    {...eventExposureEndDateField}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Event Exposure Start Time
                  </Typography>
                  <TextField
                    placeholder="이벤트 노출 시작 시간을 입력해주세요 (hh:mm:ss)"
                    value={eventExposureStartTimeField.value}
                    onChange={eventExposureStartTimeField.handleChange}
                    error={eventExposureStartTimeField.error}
                  />
                </Flex>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Event Exposure End Time
                  </Typography>
                  <TextField
                    placeholder="이벤트 노출 종료 시간을 입력해주세요 (hh:mm:ss)"
                    value={eventExposureEndTimeField.value}
                    onChange={eventExposureEndTimeField.handleChange}
                    error={eventExposureEndTimeField.error}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Event Verification Code
                  </Typography>
                  <TextField
                    placeholder="입장 코드를 입력해주세요"
                    value={eventVerificationCodeField.value}
                    onChange={eventVerificationCodeField.handleChange}
                    error={eventVerificationCodeField.error}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Event Name
                  </Typography>
                  <TextField
                    placeholder="이벤트 이름을 입력해주세요"
                    value={eventNameField.value}
                    onChange={eventNameField.handleChange}
                    error={eventNameField.error}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Start Date
                  </Typography>
                  <Select
                    type="calendar"
                    placeholder="이벤트 시작 날짜를 선택해주세요"
                    {...eventStartDateField}
                  />
                </Flex>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    End Date
                  </Typography>
                  <Select
                    type="calendar"
                    placeholder="이벤트 종료 날짜를 선택해주세요"
                    {...eventEndDateField}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Start Time
                  </Typography>
                  <TextField
                    placeholder="이벤트 시작 시간을 입력해주세요 (hh:mm:ss)"
                    value={eventStartTimeField.value}
                    onChange={eventStartTimeField.handleChange}
                    error={eventStartTimeField.error}
                  />
                </Flex>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    End Time
                  </Typography>
                  <TextField
                    placeholder="이벤트 종료 시간을 입력해주세요 (hh:mm:ss)"
                    value={eventEndTimeField.value}
                    onChange={eventEndTimeField.handleChange}
                    error={eventEndTimeField.error}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Venue
                  </Typography>
                  <TextField
                    placeholder="장소를 입력해주세요"
                    value={venueField.value}
                    onChange={venueField.handleChange}
                    error={venueField.error}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Lineup
                  </Typography>
                  <TextField
                    multiline
                    rows={6}
                    placeholder="라인업을 입력해주세요"
                    value={lineupField.value}
                    onChange={lineupField.handleChange}
                    error={lineupField.error}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Details
                  </Typography>
                  <TextField
                    multiline
                    rows={6}
                    placeholder="상세 내용을 입력해주세요"
                    value={detailsField.value}
                    onChange={detailsField.handleChange}
                    error={detailsField.error}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Image
                  </Typography>
                  {/* TODO: 이미지 업로드 기능 추후 추가 */}
                  <TextField
                    className={cx("textarea")}
                    multiline
                    rows={3}
                    placeholder="이미지를 업로드하거나 URL을 입력해주세요"
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Min Age
                  </Typography>
                  <TextField
                    placeholder="최소 나이를 입력해주세요"
                    value={minAgeField.value}
                    onChange={minAgeField.handleChange}
                    error={minAgeField.error}
                  />
                </Flex>
              </Flex>
            </>
          )}
          {currentStep === "ticket" && (
            <>
              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Ticket Name
                  </Typography>
                  <TextField />
                </Flex>
              </Flex>
            </>
          )}
        </div>
      </div>

      <div className={cx("floating")}>
        <Button
          className={cx("button")}
          variant="cta"
          size="md"
          onClick={() => {
            if (currentStep === "basic") {
              setCurrentStep("ticket");
            } else {
              onSubmit();
            }
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
}
