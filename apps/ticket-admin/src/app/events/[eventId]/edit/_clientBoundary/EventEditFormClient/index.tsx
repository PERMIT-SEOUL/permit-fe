"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";
import { EventFormData } from "@/app/events/create/_clientBoundary/EventFormClient";
import { EventFormLayout } from "@/app/events/create/_components/EventFormLayout";
import { type TicketData } from "@/app/events/create/_components/TicketForm";
import { useEventDetailSuspenseQuery } from "@/data/admin/getEventDetail/queries";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: string;
};

export function EventEditFormClient({ eventId }: Props) {
  const router = useRouter();
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true); // 수정 모드 여부
  const [currentStep, setCurrentStep] = useState<"basic" | "ticket">("basic");
  const [formData, setFormData] = useState<EventFormData>({
    eventExposureStartDate: "",
    eventExposureEndDate: "",
    eventExposureStartTime: "",
    eventExposureEndTime: "",
    verificationCode: "",
    name: "",
    eventType: "PERMIT",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    lineup: "",
    details: "",
    minAge: 0,
    images: [],
    ticketRoundName: "",
    roundSalesStartDate: "",
    roundSalesEndDate: "",
    roundSalesStartTime: "",
    roundSalesEndTime: "",
    ticketTypes: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: eventDetailData } = useEventDetailSuspenseQuery({
    eventId,
    options: { refetchOnWindowFocus: true },
  });

  // 이벤트 노출 시작 날짜
  const eventExposureStartDateField = useSelect({
    initialValue: eventDetailData.eventExposureStartDate,
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

  // 이벤트 노출 종료 날짜
  const eventExposureEndDateField = useSelect({
    initialValue: eventDetailData.eventExposureEndDate,
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

  // 이벤트 노출 시작 시간
  const eventExposureStartTimeField = useTextField({
    initialValue: eventDetailData.eventExposureStartTime,
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

  // 이벤트 노출 종료 시간
  const eventExposureEndTimeField = useTextField({
    initialValue: eventDetailData.eventExposureEndTime,
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

  // 검증 코드
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

  // 이벤트 이름
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

  // 이벤트 시작 날짜
  const eventStartDateField = useSelect({
    initialValue: eventDetailData.startDate,
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

  // 이벤트 종료 날짜
  const eventEndDateField = useSelect({
    initialValue: eventDetailData.endDate,
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

  // 이벤트 시작 시간
  const eventStartTimeField = useTextField({
    initialValue: eventDetailData.startTime,
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

  // 이벤트 종료 시간
  const eventEndTimeField = useTextField({
    initialValue: eventDetailData.endTime,
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

  // 장소
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

  // 라인업
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

  // 상세 정보
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

  // 최소 연령
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

  // 티켓 차수 이름
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

  // 티켓 차수 판매 시작 날짜
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

  // 티켓 차수 판매 종료 날짜
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

  // 티켓 차수 판매 시작 시간
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

  // 티켓 차수 판매 종료 시간
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

  console.log(eventDetailData);
  // API 응답 데이터를 폼 필드에 설정
  useEffect(() => {
    if (eventDetailData) {
      // 폼 데이터 설정
      setFormData({
        eventExposureStartDate: eventDetailData.eventExposureStartDate,
        eventExposureEndDate: eventDetailData.eventExposureEndDate,
        eventExposureStartTime: eventDetailData.eventExposureStartTime,
        eventExposureEndTime: eventDetailData.eventExposureEndTime,
        verificationCode: eventDetailData.verificationCode,
        name: eventDetailData.name,
        eventType: "PERMIT", // TODO: API 응답에 eventType이 없으므로 기본값 사용
        startDate: eventDetailData.startDate,
        endDate: eventDetailData.endDate,
        startTime: eventDetailData.startTime,
        endTime: eventDetailData.endTime,
        venue: eventDetailData.venue,
        lineup: eventDetailData.lineup || "",
        details: eventDetailData.details || "",
        minAge: eventDetailData.minAge,
        images: eventDetailData.images || [],
        ticketRoundName: "", // TODO: API 응답에 티켓 관련 데이터가 없으므로 빈 값 사용
        roundSalesStartDate: "",
        roundSalesEndDate: "",
        roundSalesStartTime: "",
        roundSalesEndTime: "",
        ticketTypes: [], // TODO: API 응답에 티켓 타입 데이터가 없으므로 빈 배열 사용
      });

      // 각 필드의 value를 설정
      eventExposureStartDateField.selectProps.onChange(eventDetailData.eventExposureStartDate);
      eventExposureEndDateField.selectProps.onChange(eventDetailData.eventExposureEndDate);
      eventExposureStartTimeField.handleChange({
        target: { value: eventDetailData.eventExposureStartTime },
      } as React.ChangeEvent<HTMLInputElement>);
      eventExposureEndTimeField.handleChange({
        target: { value: eventDetailData.eventExposureEndTime },
      } as React.ChangeEvent<HTMLInputElement>);
      eventVerificationCodeField.handleChange({
        target: { value: eventDetailData.verificationCode },
      } as React.ChangeEvent<HTMLInputElement>);
      eventNameField.handleChange({
        target: { value: eventDetailData.name },
      } as React.ChangeEvent<HTMLInputElement>);
      eventStartDateField.selectProps.onChange(eventDetailData.startDate);
      eventEndDateField.selectProps.onChange(eventDetailData.endDate);
      eventStartTimeField.handleChange({
        target: { value: eventDetailData.startTime },
      } as React.ChangeEvent<HTMLInputElement>);
      eventEndTimeField.handleChange({
        target: { value: eventDetailData.endTime },
      } as React.ChangeEvent<HTMLInputElement>);
      venueField.handleChange({
        target: { value: eventDetailData.venue },
      } as React.ChangeEvent<HTMLInputElement>);
      lineupField.handleChange({
        target: { value: eventDetailData.lineup || "" },
      } as React.ChangeEvent<HTMLInputElement>);
      detailsField.handleChange({
        target: { value: eventDetailData.details || "" },
      } as React.ChangeEvent<HTMLInputElement>);
      minAgeField.handleChange({
        target: { value: String(eventDetailData.minAge) },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [eventDetailData]);

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
      // TODO: API 호출로 이벤트 수정
      console.log("Updated form data:", formData);

      // 성공 시 이벤트 목록으로 이동
      // router.push("/events");
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("정말로 이 이벤트를 삭제하시겠습니까?")) {
      try {
        // TODO: API 호출로 이벤트 삭제
        console.log("Deleting event:", eventId);

        // 성공 시 이벤트 목록으로 이동
        router.push("/events");
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <>
      <EventFormLayout
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
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
        onDelete={handleDelete}
        isSubmitting={isSubmitting}
        isReadOnlyMode={isReadOnlyMode}
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
            setIsReadOnlyMode((prev) => {
              if (prev) {
                // 현재 편집 모드라면 저장 시도
                handleSubmit();
              }

              return !prev;
            });
          }}
        >
          {isReadOnlyMode ? "edit" : "save"}
        </Button>
      </div>
    </>
  );
}
