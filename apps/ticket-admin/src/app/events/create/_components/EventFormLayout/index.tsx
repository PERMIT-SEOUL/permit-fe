import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import type { UseTextFieldReturn } from "@permit/design-system/hooks";

import { EventFormData } from "../../_clientBoundary/EventFormClient";
import { type TicketData, TicketForm } from "../TicketForm";
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
  onDelete?: () => void;
  isSubmitting: boolean;
  isReadOnlyMode?: boolean;
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
  ticketRoundNameField: UseTextFieldReturn;
  roundSalesStartDate: SelectField;
  roundSalesEndDate: SelectField;
  roundSalesStartTime: UseTextFieldReturn;
  roundSalesEndTime: UseTextFieldReturn;
  onAddTicket: () => void;
  onUpdateTicket: (ticketId: string, updatedTicket: TicketData) => void;
  onDeleteTicket: (ticketId: string) => void;
};

export function EventFormLayout({
  formData,
  onFileChange,
  onDelete,
  isSubmitting,
  isReadOnlyMode = false,
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
  ticketRoundNameField,
  roundSalesStartDate,
  roundSalesEndDate,
  roundSalesStartTime,
  roundSalesEndTime,
  onAddTicket,
  onUpdateTicket,
  onDeleteTicket,
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
                    disabled={isReadOnlyMode}
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
                    disabled={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    disabled={isReadOnlyMode}
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
                    disabled={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    readOnly={isReadOnlyMode}
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
                    Ticket Round Name
                  </Typography>
                  <TextField
                    readOnly={isReadOnlyMode}
                    placeholder="티켓 차수 이름을 입력해주세요"
                    value={ticketRoundNameField.value}
                    onChange={ticketRoundNameField.handleChange}
                    error={ticketRoundNameField.error}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Exposure Start Date
                  </Typography>
                  <Select
                    disabled={isReadOnlyMode}
                    type="calendar"
                    placeholder="티켓 차수 판매 시작 날짜를 선택해주세요"
                    {...roundSalesStartDate}
                  />
                </Flex>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Exposure End Date
                  </Typography>
                  <Select
                    disabled={isReadOnlyMode}
                    type="calendar"
                    placeholder="티켓 차수 판매 종료 날짜를 선택해주세요"
                    {...roundSalesEndDate}
                  />
                </Flex>
              </Flex>

              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Exposure Start Time
                  </Typography>
                  <TextField
                    readOnly={isReadOnlyMode}
                    placeholder="티켓 차수 판매 시작 시간을 입력해주세요 (hh:mm:ss)"
                    value={roundSalesStartTime.value}
                    onChange={roundSalesStartTime.handleChange}
                    error={roundSalesStartTime.error}
                  />
                </Flex>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Exposure End Time
                  </Typography>
                  <TextField
                    readOnly={isReadOnlyMode}
                    placeholder="티켓 차수 판매 종료 시간을 입력해주세요 (hh:mm:ss)"
                    value={roundSalesEndTime.value}
                    onChange={roundSalesEndTime.handleChange}
                    error={roundSalesEndTime.error}
                  />
                </Flex>
              </Flex>

              {/* 티켓 추가 버튼 */}
              <Button variant="cta" size="md" onClick={onAddTicket}>
                Add
              </Button>

              {/* 티켓 폼들 */}
              {formData.ticketTypes.map((ticket) => (
                <TicketForm
                  key={ticket.id}
                  ticketData={ticket}
                  onUpdate={(updatedTicket) => onUpdateTicket(ticket.id, updatedTicket)}
                  onDelete={() => onDeleteTicket(ticket.id)}
                  ticketNameField={{
                    value: ticket.ticketName,
                    handleChange: (e) => {
                      onUpdateTicket(ticket.id, { ...ticket, ticketName: e.target.value });
                    },
                  }}
                  priceField={{
                    value: ticket.price.toString(),
                    handleChange: (e) => {
                      onUpdateTicket(ticket.id, { ...ticket, price: Number(e.target.value) });
                    },
                  }}
                  ticketCountField={{
                    value: ticket.ticketCount.toString(),
                    handleChange: (e) => {
                      onUpdateTicket(ticket.id, { ...ticket, ticketCount: Number(e.target.value) });
                    },
                  }}
                  ticketStartDateField={{
                    value: ticket.ticketStartDate,
                    onChange: (value: string) => {
                      onUpdateTicket(ticket.id, { ...ticket, ticketStartDate: value });
                    },
                  }}
                  ticketEndDateField={{
                    value: ticket.ticketEndDate,
                    onChange: (value: string) => {
                      onUpdateTicket(ticket.id, { ...ticket, ticketEndDate: value });
                    },
                  }}
                  ticketStartTimeField={{
                    value: ticket.ticketStartTime,
                    handleChange: (e) => {
                      onUpdateTicket(ticket.id, { ...ticket, ticketStartTime: e.target.value });
                    },
                  }}
                  ticketEndTimeField={{
                    value: ticket.ticketEndTime,
                    handleChange: (e) => {
                      onUpdateTicket(ticket.id, { ...ticket, ticketEndTime: e.target.value });
                    },
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
