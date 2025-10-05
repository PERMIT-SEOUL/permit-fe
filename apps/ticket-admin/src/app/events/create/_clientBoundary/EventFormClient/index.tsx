"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";
import { EventRequest, useEventMutation } from "@/data/admin/postEvents/mutation";

import { EventFormLayout } from "../../_components/EventFormLayout";
import type { TicketData } from "../../_components/TicketForm";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type EventFormData = Omit<EventRequest, "ticketTypes"> & {
  ticketTypes: TicketData[];
};

type FormData = EventFormData;

const initialFormData: EventRequest = {
  eventExposureStartDate: "",
  eventExposureEndDate: "",
  eventExposureStartTime: "",
  eventExposureEndTime: "",
  verificationCode: "",
  name: "",
  eventType: "PERMIT", // TODO: 입력 받을 수 있도록 변경 (select)
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  venue: "",
  lineup: "",
  details: "",
  minAge: 0,
  // TODO: 이미지 업로드 기능으로 변경
  images: [
    { imageUrl: "https://d3c0v2xj3fc363.cloudfront.net/events/testEventId/images/sitemap0.jpg" },
  ],
  ticketRoundName: "",
  roundSalesStartDate: "",
  roundSalesEndDate: "",
  roundSalesStartTime: "",
  roundSalesEndTime: "",
  ticketTypes: [],
};

export function EventFormClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<"basic" | "ticket">("basic");
  const [formData, setFormData] = useState<FormData>(initialFormData as FormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: createEvent } = useEventMutation({});

  const eventExposureStartDateField = useSelect({
    initialValue: "",
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        eventExposureStartDate: value,
      }));
    },
    validate: (value: string) => {
      if (!value) return "이벤트 노출 시작 날짜를 선택해주세요.";

      return undefined;
    },
  });

  const eventExposureEndDateField = useSelect({
    initialValue: "",
    validate: (value: string) => {
      if (!value) return "이벤트 노출 종료 날짜를 선택해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        eventExposureEndDate: value,
      }));
    },
  });

  const eventExposureStartTimeField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "이벤트 노출 시작 시간을 입력해주세요.";

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(value)) return "올바른 시간 형식이 아닙니다.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        eventExposureStartTime: value,
      }));
    },
  });

  const eventExposureEndTimeField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "이벤트 노출 종료 시간을 입력해주세요.";

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(value)) return "올바른 시간 형식이 아닙니다.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        eventExposureEndTime: value,
      }));
    },
  });

  const eventVerificationCodeField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "이벤트 검증 코드를 입력해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        verificationCode: value,
      }));
    },
  });

  const eventNameField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "이벤트 이름을 입력해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        name: value,
      }));
    },
  });

  const eventStartDateField = useSelect({
    initialValue: "",
    validate: (value: string) => {
      if (!value) return "이벤트 시작 날짜를 선택해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        startDate: value,
      }));
    },
  });

  const eventEndDateField = useSelect({
    initialValue: "",
    validate: (value: string) => {
      if (!value) return "이벤트 종료 날짜를 선택해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        endDate: value,
      }));
    },
  });

  const eventStartTimeField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "이벤트 시작 시간을 입력해주세요.";

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(value)) return "올바른 시간 형식이 아닙니다.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        startTime: value,
      }));
    },
  });

  const eventEndTimeField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "이벤트 종료 시간을 입력해주세요.";

      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timeRegex.test(value)) return "올바른 시간 형식이 아닙니다.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        endTime: value,
      }));
    },
  });

  const venueField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value.trim()) return "장소를 입력해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        venue: value,
      }));
    },
  });

  const lineupField = useTextField({
    initialValue: "",
    validate: (_value: string) => {
      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        lineup: value,
      }));
    },
  });

  const detailsField = useTextField({
    initialValue: "",
    validate: (_value: string) => {
      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        details: value,
      }));
    },
  });

  const minAgeField = useTextField({
    initialValue: "",
    validate: (_value: string) => {
      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        minAge: Number(value),
      }));
    },
  });

  // TODO: 이미지 업로드 기능 추가
  const handleFileChange = (files: FileList | null) => {
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files).map((file) => ({
          imageUrl: URL.createObjectURL(file),
        })),
      }));
    }
  };

  // 2단계 폼 필드
  const ticketRoundNameField = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value) return "티켓 차수 이름을 입력해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        ticketRoundName: value,
      }));
    },
  });

  const roundSalesStartDate = useSelect({
    initialValue: "",
    validate: (value: string) => {
      if (!value) return "티켓 차수 판매 시작 날짜를 선택해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        roundSalesStartDate: value,
      }));
    },
  });

  const roundSalesEndDate = useSelect({
    initialValue: "",
    validate: (value: string) => {
      if (!value) return "티켓 차수 판매 종료 날짜를 선택해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        roundSalesEndDate: value,
      }));
    },
  });

  const roundSalesStartTime = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value) return "티켓 차수 판매 시작 시간을 입력해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        roundSalesStartTime: value,
      }));
    },
  });

  const roundSalesEndTime = useTextField({
    initialValue: "",
    validate: (value: string) => {
      if (!value) return "티켓 차수 판매 종료 시간을 입력해주세요.";

      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        roundSalesEndTime: value,
      }));
    },
  });

  // 티켓 관리 함수들
  const addTicket = () => {
    const newTicket: TicketData = {
      id: Date.now().toString(),
      ticketName: "",
      price: 0,
      ticketCount: 0,
      ticketStartDate: "",
      ticketStartTime: "",
      ticketEndDate: "",
      ticketEndTime: "",
    };

    setFormData((prev) => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, newTicket],
    }));
  };

  const updateTicket = (ticketId: string, updatedTicket: TicketData) => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.map((ticket) =>
        ticket.id === ticketId ? updatedTicket : ticket,
      ),
    }));
  };

  const deleteTicket = (ticketId: string) => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter((ticket) => ticket.id !== ticketId),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const apiData: EventRequest = {
        ...formData,
        ticketTypes: formData.ticketTypes.map(({ id: _id, ...ticket }) => ticket),
      };

      await createEvent(apiData);

      // 성공 시 이벤트 목록으로 이동
      router.push("/events");
    } catch (error) {
      alert("이벤트 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <EventFormLayout
        sideBar={
          <>
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
          </>
        }
        currentStep={currentStep}
        eventExposureStartDateField={eventExposureStartDateField.selectProps}
        eventExposureEndDateField={eventExposureEndDateField.selectProps}
        eventExposureStartTimeField={eventExposureStartTimeField}
        eventExposureEndTimeField={eventExposureEndTimeField}
        eventVerificationCodeField={eventVerificationCodeField}
        eventNameField={eventNameField}
        eventStartDateField={eventStartDateField.selectProps}
        eventEndDateField={eventEndDateField.selectProps}
        eventStartTimeField={eventStartTimeField}
        eventEndTimeField={eventEndTimeField}
        venueField={venueField}
        lineupField={lineupField}
        detailsField={detailsField}
        minAgeField={minAgeField}
        formData={formData}
        onFileChange={handleFileChange}
        ticketRoundNameField={ticketRoundNameField}
        roundSalesStartDate={roundSalesStartDate.selectProps}
        roundSalesEndDate={roundSalesEndDate.selectProps}
        roundSalesStartTime={roundSalesStartTime}
        roundSalesEndTime={roundSalesEndTime}
        isSubmitting={isSubmitting}
        onAddTicket={addTicket}
        onUpdateTicket={updateTicket}
        onDeleteTicket={deleteTicket}
      />

      <div className={cx("floating")}>
        <Button
          className={cx("button")}
          variant="cta"
          size="md"
          onClick={() => {
            if (currentStep === "basic") {
              setCurrentStep("ticket");
            } else {
              handleSubmit();
            }
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
}
