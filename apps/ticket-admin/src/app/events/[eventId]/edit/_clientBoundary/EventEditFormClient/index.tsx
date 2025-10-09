"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";
import { TicketManagementClient } from "@/app/events/create/_clientBoundary/TicketManagementClient";
import { EventFormLayout } from "@/app/events/create/_components/EventFormLayout";
import { PreviewMedia } from "@/app/events/create/_components/ImageUploader";
import { useEventDetailSuspenseQuery } from "@/data/admin/getEventDetail/queries";
import { EventDetailResponse } from "@/data/admin/getEventDetail/types";
import { useEventMutation } from "@/data/admin/patchEvents/mutation";
import {
  usePostPresignedUrlsMutation,
  usePutS3Upload,
} from "@/data/admin/postPresignedUrls/mutation";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
};

export function EventEditFormClient({ eventId }: Props) {
  const router = useRouter();
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true); // 수정 모드 여부
  const [currentStep, setCurrentStep] = useState<"basic" | "ticket">("basic");
  const [formData, setFormData] = useState<
    Omit<EventDetailResponse, "images"> & { images: PreviewMedia[] }
  >({
    eventId: 0,
    eventExposureStartDate: "",
    eventExposureEndDate: "",
    eventExposureStartTime: "",
    eventExposureEndTime: "",
    verificationCode: "",
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    lineup: "",
    details: "",
    minAge: 0,
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: eventDetailData } = useEventDetailSuspenseQuery({
    eventId,
  });

  const { mutateAsync: postPresignedUrls } = usePostPresignedUrlsMutation({});
  const { mutateAsync: putS3Upload } = usePutS3Upload();
  const { mutateAsync: patchEvent } = useEventMutation({});

  // 이벤트 노출 시작 날짜
  const eventExposureStartDateField = useSelect({
    initialValue: "2025-10-09",
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

  console.log("@@formData", formData.eventExposureStartDate);

  // API 응답 데이터를 폼 필드에 설정
  useEffect(() => {
    if (eventDetailData) {
      // 폼 데이터 설정
      setFormData({
        eventId: eventDetailData.eventId,
        eventExposureStartDate: eventDetailData.eventExposureStartDate,
        eventExposureEndDate: eventDetailData.eventExposureEndDate,
        eventExposureStartTime: eventDetailData.eventExposureStartTime,
        eventExposureEndTime: eventDetailData.eventExposureEndTime,
        verificationCode: eventDetailData.verificationCode,
        name: eventDetailData.name,
        startDate: eventDetailData.startDate,
        endDate: eventDetailData.endDate,
        startTime: eventDetailData.startTime,
        endTime: eventDetailData.endTime,
        venue: eventDetailData.venue,
        lineup: eventDetailData.lineup || "",
        details: eventDetailData.details || "",
        minAge: eventDetailData.minAge,
        images: eventDetailData.images || [],
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
    if (!files || files.length === 0) return;

    const toPreview = (file: File) =>
      new Promise<{ id: number; url: string; mediaType: "IMAGE" | "VIDEO" }>((resolve) => {
        const isVideo = file.type.startsWith("video/");
        const reader = new FileReader();

        reader.onload = (ev) => {
          const dataUrl = (ev.target?.result as string) ?? "";

          resolve({
            id: Date.now() + Math.floor(Math.random() * 1000),
            url: dataUrl,
            mediaType: isVideo ? "VIDEO" : "IMAGE",
          });
        };
        reader.readAsDataURL(file);
      });

    Promise.all(Array.from(files).map(toPreview)).then((appended) => {
      setFormData((prev) => {
        const prevImages = (prev.images as PreviewMedia[] | undefined) ?? [];
        const merged = [...prevImages, ...appended];

        return {
          ...prev,
          images: merged,
        };
      });
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: API 호출로 이벤트 수정
      console.log("Updated form data:!!!", formData);

      const toUpload = (
        formData.images as { id?: number; url?: string; mediaType?: "IMAGE" | "VIDEO" }[]
      ).filter((m) => !!m?.url && !!m?.mediaType);

      const mediaInfoRequests = toUpload.map((m) => {
        const mediaName = `${m.id}`;

        return { mediaName, mediaType: m.mediaType! };
      });

      console.log("@@", toUpload, mediaInfoRequests);

      const presignedUrls = await postPresignedUrls({
        eventId: eventDetailData.eventId,
        mediaInfoRequests,
      });

      await Promise.all(
        presignedUrls.preSignedUrlInfoList.map(async (url, index) => {
          const file = toUpload[index];

          const response = await fetch(file.url!);
          const blob = await response.blob();
          const newFile = new File([blob], `fileName-${file.id}`, { type: blob.type });

          return putS3Upload({ url: url.preSignedUrl, file: newFile });
        }),
      );

      const imagesData = formData.images.map((m) => {
        if (m.id) {
          const url = presignedUrls.preSignedUrlInfoList.find(
            (info) => info.mediaName === m.id?.toString(),
          )?.preSignedUrl;

          const imageUrl = url?.split("?")[0];

          return {
            imageUrl: imageUrl as string,
          };
        }

        return {
          imageUrl: m.imageUrl as string,
        };
      });

      await patchEvent({
        ...formData,
        eventId: eventDetailData.eventId,
        eventType: "PERMIT", // TODO: 확인
        images: imagesData,
      });

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
    <div className={cx("container")}>
      {/* Sidebar */}
      <div className={cx("sidebar")}>
        <button className={cx("sidebar_item")} onClick={() => setCurrentStep("basic")}>
          <div className={cx("sidebar_indicator", currentStep === "basic" && "active")} />
          <span className={cx("sidebar_text", currentStep === "basic" && "active")}>Basic</span>
        </button>
        <button className={cx("sidebar_item")} onClick={() => setCurrentStep("ticket")}>
          <div className={cx("sidebar_indicator", currentStep === "ticket" && "active")} />
          <span className={cx("sidebar_text", currentStep === "ticket" && "active")}>Ticket</span>
        </button>
      </div>
      {currentStep === "basic" && (
        <EventFormLayout
          formData={formData}
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
          onFileChange={handleFileChange}
          ticketRoundNameField={ticketRoundNameField}
          roundSalesStartDate={roundSalesStartDate.selectProps}
          roundSalesEndDate={roundSalesEndDate.selectProps}
          roundSalesStartTime={roundSalesStartTime}
          roundSalesEndTime={roundSalesEndTime}
          onDelete={handleDelete}
          isSubmitting={isSubmitting}
          isReadOnlyMode={isReadOnlyMode}
        />
      )}
      {currentStep === "ticket" && <TicketManagementClient eventId={eventId} />}
      <div className={cx("floating")}>
        <Button
          className={cx("button")}
          variant="cta"
          size="md"
          onClick={() => {
            if (isReadOnlyMode) {
              setIsReadOnlyMode(false);
            } else {
              handleSubmit();
            }
          }}
        >
          {isReadOnlyMode ? "edit" : "save"}
        </Button>
      </div>
    </div>
  );
}
