"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSelect, useTextField } from "@permit/design-system/hooks";

import { EventFormLayout } from "../../_components/EventFormLayout";

export type EventFormData = {
  eventExposureStartDate: string;
  eventExposureEndDate: string;
  eventExposureStartTime: string;
  eventExposureEndTime: string;
  verificationCode: string;
  eventName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  lineup: string;
  details: string;
  minAge: number;
  images: File[];
};

const initialFormData: EventFormData = {
  eventExposureStartDate: "",
  eventExposureEndDate: "",
  eventExposureStartTime: "",
  eventExposureEndTime: "",
  verificationCode: "",
  eventName: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  venue: "",
  lineup: "",
  details: "",
  minAge: 0,
  images: [],
};

export function EventFormClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<"basic" | "ticket">("basic");
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        eventName: value,
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
    validate: (value: string) => {
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
    validate: (value: string) => {
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
    validate: (value: string) => {
      return undefined;
    },
    onChange: (value: string) => {
      setFormData((prev) => ({
        ...prev,
        minAge: Number(value),
      }));
    },
  });

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: API 호출로 이벤트 생성
      console.log("Form data:", formData);

      // 성공 시 이벤트 목록으로 이동
      //   router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
