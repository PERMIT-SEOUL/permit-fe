import classNames from "classnames/bind";

import { Button, Flex, Select, TextField, Typography } from "@permit/design-system";
import type { UseTextFieldReturn } from "@permit/design-system/hooks";

import { EventFormData, eventTypeOptions } from "../../_clientBoundary/EventFormClient";
import ImageUploader, { PreviewMedia } from "../ImageUploader";
import { type TicketData, TicketForm } from "../TicketForm";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type SelectField = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

type EventFormLayoutProps = {
  formData: Omit<
    EventFormData,
    | "eventType"
    | "images"
    | "siteMapImages"
    | "ticketTypes"
    | "ticketRoundName"
    | "roundSalesStartDate"
    | "roundSalesEndDate"
    | "roundSalesStartTime"
    | "roundSalesEndTime"
  > & {
    eventType?: string;
    images?: { imageUrl?: string }[];
    siteMapImages?: { imageUrl?: string }[];
    ticketTypes?: TicketData[];
    ticketRoundName?: string;
    roundSalesStartDate?: string;
    roundSalesEndDate?: string;
    roundSalesStartTime?: string;
    roundSalesEndTime?: string;
  };
  onFileChange?: (files: FileList | null) => void;
  onRemoveOriginalImage?: (url: string) => void;
  onDelete?: () => void;
  onSiteMapFileChange?: (files: FileList | null) => void;
  onRemoveSiteMapImage?: (idOrUrl: number | string) => void;
  isSubmitting: boolean;
  isReadOnlyMode?: boolean;
  currentStep: "basic" | "ticket";
  eventExposureStartDateField: SelectField;
  eventExposureEndDateField: SelectField;
  eventTypeSelect: SelectField;
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
  onAddTicket?: () => void;
  onUpdateTicket?: (ticketId: string, updatedTicket: TicketData) => void;
  onDeleteTicket?: (ticketId: string) => void;
};

export function EventFormLayout({
  formData,
  onFileChange,
  onRemoveOriginalImage,
  onDelete: _onDelete,
  onSiteMapFileChange,
  onRemoveSiteMapImage,
  isSubmitting: _isSubmitting,
  isReadOnlyMode = false,
  currentStep,
  eventExposureStartDateField,
  eventExposureEndDateField,
  eventTypeSelect,
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
      {/* Main */}
      <div className={cx("main")}>
        {currentStep === "basic" && (
          <>
            <Flex gap={24}>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Event Exposure Start Date
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>

                <Select
                  disabled={isReadOnlyMode}
                  type="calendar"
                  placeholder="노출 시작 날짜를 선택해주세요"
                  {...eventExposureStartDateField}
                />
              </Flex>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Event Exposure Start Time
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <TextField
                  readOnly={isReadOnlyMode}
                  showBorderinReadOnly={isReadOnlyMode}
                  placeholder="이벤트 노출 시작 시간을 입력해주세요 (HH:MM)"
                  value={eventExposureStartTimeField.value}
                  onChange={eventExposureStartTimeField.handleChange}
                  error={eventExposureStartTimeField.error}
                />
              </Flex>
            </Flex>

            <Flex gap={24}>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Event Exposure End Date
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <Select
                  disabled={isReadOnlyMode}
                  type="calendar"
                  placeholder="노출 종료 날짜를 선택해주세요"
                  {...eventExposureEndDateField}
                />
              </Flex>

              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Event Exposure End Time
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <TextField
                  readOnly={isReadOnlyMode}
                  showBorderinReadOnly={isReadOnlyMode}
                  placeholder="이벤트 노출 종료 시간을 입력해주세요 (HH:MM)"
                  value={eventExposureEndTimeField.value}
                  onChange={eventExposureEndTimeField.handleChange}
                  error={eventExposureEndTimeField.error}
                />
              </Flex>
            </Flex>

            <Flex gap={24}>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Event Type
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <Select
                  disabled={isReadOnlyMode}
                  placeholder="이벤트 타입을 선택해주세요"
                  options={eventTypeOptions}
                  {...eventTypeSelect}
                />
              </Flex>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Event Verification Code
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <TextField
                  readOnly={isReadOnlyMode}
                  showBorderinReadOnly={isReadOnlyMode}
                  placeholder="입장 코드를 입력해주세요"
                  value={eventVerificationCodeField.value}
                  onChange={eventVerificationCodeField.handleChange}
                  error={eventVerificationCodeField.error}
                />
              </Flex>
            </Flex>

            <Flex gap={24}>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Event Name
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <TextField
                  readOnly={isReadOnlyMode}
                  showBorderinReadOnly={isReadOnlyMode}
                  placeholder="이벤트 이름을 입력해주세요"
                  value={eventNameField.value}
                  onChange={eventNameField.handleChange}
                  error={eventNameField.error}
                />
              </Flex>
            </Flex>

            <Flex gap={24}>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Start Date
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <Select
                  disabled={isReadOnlyMode}
                  type="calendar"
                  placeholder="이벤트 시작 날짜를 선택해주세요"
                  {...eventStartDateField}
                />
              </Flex>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Start Time
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <TextField
                  readOnly={isReadOnlyMode}
                  showBorderinReadOnly={isReadOnlyMode}
                  placeholder="이벤트 시작 시간을 입력해주세요 (HH:MM)"
                  value={eventStartTimeField.value}
                  onChange={eventStartTimeField.handleChange}
                  error={eventStartTimeField.error}
                />
              </Flex>
            </Flex>

            <Flex gap={24}>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    End Date
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <Select
                  disabled={isReadOnlyMode}
                  type="calendar"
                  placeholder="이벤트 종료 날짜를 선택해주세요"
                  {...eventEndDateField}
                />
              </Flex>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    End Time
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <TextField
                  readOnly={isReadOnlyMode}
                  showBorderinReadOnly={isReadOnlyMode}
                  placeholder="이벤트 종료 시간을 입력해주세요 (HH:MM)"
                  value={eventEndTimeField.value}
                  onChange={eventEndTimeField.handleChange}
                  error={eventEndTimeField.error}
                />
              </Flex>
            </Flex>

            <Flex gap={24}>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Venue
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <TextField
                  readOnly={isReadOnlyMode}
                  showBorderinReadOnly={isReadOnlyMode}
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
                  showBorderinReadOnly={isReadOnlyMode}
                  multiline
                  rows={6}
                  placeholder="라인업 카테고리별로 줄바꿈 해야 됨. [라인업1] 도영, 성준 (줄바꿈) [라인업2] 창균, 민석"
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
                  showBorderinReadOnly={isReadOnlyMode}
                  multiline
                  rows={6}
                  placeholder="상세 내용을 입력해주세요"
                  value={detailsField.value}
                  onChange={detailsField.handleChange}
                  error={detailsField.error}
                />
              </Flex>
            </Flex>

            {onFileChange && (
              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Flex align="flex-start" gap={8}>
                    <Typography type="body16" weight="bold">
                      Image
                    </Typography>
                    <div className={cx("required")}>*</div>
                  </Flex>
                  <ImageUploader
                    disabled={isReadOnlyMode}
                    value={(formData.images as unknown as PreviewMedia[] | null) || null}
                    onImagesUpload={(_images) => {
                      // formData에 맞게 반영 (EventFormClient가 내려준 formData 구조에 맞춰 조정)
                      // images는 dataURL 미리보기이며, 저장 시 서버 업로드 로직에서 변환 필요
                      // 여기서는 상위 onFileChange와의 호환을 유지하기 위해 noop 처리
                    }}
                    onFileSelect={onFileChange}
                    onRemoveOriginalImage={onRemoveOriginalImage}
                  />
                </Flex>
              </Flex>
            )}

            {onSiteMapFileChange && (
              <Flex gap={24}>
                <Flex className={cx("row")} direction="column" gap={12}>
                  <Typography type="body16" weight="bold">
                    Site Map
                  </Typography>
                  <ImageUploader
                    disabled={isReadOnlyMode}
                    value={(formData.siteMapImages as unknown as PreviewMedia[] | null) || null}
                    onImagesUpload={(_images) => {
                      // formData에 맞게 반영 (EventFormClient가 내려준 formData 구조에 맞춰 조정)
                      // images는 dataURL 미리보기이며, 저장 시 서버 업로드 로직에서 변환 필요
                      // 여기서는 상위 onFileChange와의 호환을 유지하기 위해 noop 처리
                    }}
                    onFileSelect={onSiteMapFileChange}
                    onRemoveOriginalImage={onRemoveSiteMapImage}
                  />
                </Flex>
              </Flex>
            )}

            <Flex gap={24}>
              <Flex className={cx("row")} direction="column" gap={12}>
                <Flex align="flex-start" gap={8}>
                  <Typography type="body16" weight="bold">
                    Min Age
                  </Typography>
                  <div className={cx("required")}>*</div>
                </Flex>
                <TextField
                  readOnly={isReadOnlyMode}
                  showBorderinReadOnly={isReadOnlyMode}
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
                  showBorderinReadOnly={isReadOnlyMode}
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
                  Exposure Start Time
                </Typography>
                <TextField
                  readOnly={isReadOnlyMode}
                  showBorderinReadOnly={isReadOnlyMode}
                  placeholder="티켓 차수 판매 시작 시간을 입력해주세요 (HH:MM)"
                  value={roundSalesStartTime.value}
                  onChange={roundSalesStartTime.handleChange}
                  error={roundSalesStartTime.error}
                />
              </Flex>
            </Flex>

            <Flex gap={24}>
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
              <Flex className={cx("row")} direction="column" gap={12}>
                <Typography type="body16" weight="bold">
                  Exposure End Time
                </Typography>
                <TextField
                  readOnly={isReadOnlyMode}
                  showBorderinReadOnly={isReadOnlyMode}
                  placeholder="티켓 차수 판매 종료 시간을 입력해주세요 (HH:MM)"
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
            {onAddTicket &&
              onUpdateTicket &&
              onDeleteTicket &&
              formData?.ticketTypes?.map((ticket) => (
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
    </>
  );
}
