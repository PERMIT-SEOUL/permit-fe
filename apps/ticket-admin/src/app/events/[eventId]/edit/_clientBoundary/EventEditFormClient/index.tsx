"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";

import { Button, Typography } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";
import { EditSidebar } from "@/app/events/[eventId]/edit/_components/EditSidebar";
import { GuestManagement } from "@/app/events/[eventId]/edit/_components/GuestManagement";
import { TicketManagementClient } from "@/app/events/create/_clientBoundary/TicketManagementClient";
import { EventFormLayout } from "@/app/events/create/_components/EventFormLayout";
import { PreviewMedia } from "@/app/events/create/_components/ImageUploader";
import {
  useEventDetailQuery,
  useEventDetailSuspenseQuery,
} from "@/data/admin/getEventDetail/queries";
import { EventDetailResponse } from "@/data/admin/getEventDetail/types";
import { useEventMutation } from "@/data/admin/patchEvents/mutation";
import {
  usePostPresignedUrlsMutation,
  usePutS3Upload,
} from "@/data/admin/postPresignedUrls/mutation";
import { LoadingWithLayout } from "@/shared/components/LoadingWithLayout";
import { toCDNUrl } from "@/shared/helpers/toCdnUrl";

import { CouponManagementClient } from "../../coupon/_clientBoundary/CouponManagementClient";
import { TimeTableManagementClient } from "../../timeTable/_clientBoundary/TimeTableManagementClient";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

type Props = {
  eventId: number;
};

export function EventEditFormClient({ eventId }: Props) {
  const router = useRouter();
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true); // 수정 모드 여부
  const [currentStep, setCurrentStep] = useState<
    "basic" | "ticket" | "guest" | "coupon" | "timeTable"
  >("basic");
  const [formData, setFormData] = useState<
    Omit<EventDetailResponse, "images" | "siteMapImages"> & {
      images: PreviewMedia[];
      siteMapImages: PreviewMedia[];
    }
  >({
    eventId: 0,
    eventExposureStartDate: "",
    eventExposureEndDate: "",
    eventExposureStartTime: "",
    eventExposureEndTime: "",
    eventType: "",
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
    siteMapImages: [],
  });

  // [사이트맵 이미지] 핸들러
  const handleSiteMapFileChange = (files: FileList | null) => {
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
        const prevImages = (prev.siteMapImages as PreviewMedia[] | undefined) ?? [];
        const merged = [...prevImages, ...appended];

        return {
          ...prev,
          siteMapImages: merged,
        };
      });
    });
  };

  const handleRemoveSiteMapImage = (idOrUrl: number | string) => {
    setFormData((prev) => {
      const current = (prev.siteMapImages as PreviewMedia[] | undefined) ?? [];
      const next = current.filter((img) => img.id !== idOrUrl && img.imageUrl !== idOrUrl);

      return {
        ...prev,
        siteMapImages: next,
      };
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: eventDetailData } = useEventDetailQuery({
    eventId,
  });

  const { mutateAsync: postPresignedUrls } = usePostPresignedUrlsMutation({});
  const { mutateAsync: putS3Upload } = usePutS3Upload();
  const { mutateAsync: patchEvent } = useEventMutation({});

  // 이벤트 노출 시작 날짜
  const eventExposureStartDateField = useSelect({
    initialValue: eventDetailData?.eventExposureStartDate,
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
    initialValue: eventDetailData?.eventExposureEndDate,
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
    initialValue: eventDetailData?.eventExposureStartTime,
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
    initialValue: eventDetailData?.eventExposureEndTime,
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

  const eventTypeSelect = useSelect({
    initialValue: eventDetailData?.eventType,
    validate: (value) => {
      if (!value) return "이벤트 타입을 선택해주세요.";

      return undefined;
    },
    onChange: (value) => {
      setFormData((prev) => ({
        ...prev,
        eventType: value as "PERMIT" | "CEILING" | "OLYMPAN",
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
    initialValue: eventDetailData?.startDate,
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
    initialValue: eventDetailData?.endDate,
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
    initialValue: eventDetailData?.startTime,
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
    initialValue: eventDetailData?.endTime,
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

  // API 응답 데이터를 폼 필드에 설정
  useEffect(() => {
    if (eventDetailData) {
      // 폼 데이터 설정
      setFormData((prev) => ({
        ...prev,
        eventId: eventDetailData.eventId,
        eventExposureStartDate: eventDetailData.eventExposureStartDate,
        eventExposureEndDate: eventDetailData.eventExposureEndDate,
        eventExposureStartTime: eventDetailData.eventExposureStartTime,
        eventExposureEndTime: eventDetailData.eventExposureEndTime,
        eventType: eventDetailData.eventType,
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
        siteMapImages: eventDetailData.siteMapImages || [],
      }));

      // 각 필드의 value를 설정
      eventExposureStartDateField.selectProps.onChange(eventDetailData.eventExposureStartDate);
      eventExposureEndDateField.selectProps.onChange(eventDetailData.eventExposureEndDate);
      eventExposureStartTimeField.handleChange({
        target: { value: eventDetailData.eventExposureStartTime },
      } as React.ChangeEvent<HTMLInputElement>);
      eventExposureEndTimeField.handleChange({
        target: { value: eventDetailData.eventExposureEndTime },
      } as React.ChangeEvent<HTMLInputElement>);
      eventTypeSelect.selectProps.onChange(eventDetailData.eventType);
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

  const handleRemoveOriginalImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((m) => {
        return (m.id as unknown as string) !== url && m.imageUrl !== url;
      }),
    }));
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

      const presignedUrls = await postPresignedUrls({
        eventId: eventDetailData?.eventId as number,
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

          console.log("@@", url);

          const imageUrl = toCDNUrl(url?.split("?")[0] as string);

          return {
            imageUrl: imageUrl as string,
          };
        }

        return {
          imageUrl: m.imageUrl as string,
        };
      });

      const toUploadSiteMap = (
        formData.siteMapImages as { id?: number; url?: string; mediaType?: "IMAGE" | "VIDEO" }[]
      ).filter((m) => !!m?.url && !!m?.mediaType);

      const mediaInfoRequestsSiteMap = toUploadSiteMap.map((m) => {
        const mediaName = `${m.id}`;

        return { mediaName, mediaType: m.mediaType! };
      });

      const siteMapPresignedUrls = await postPresignedUrls({
        eventId: eventDetailData?.eventId as number,
        mediaInfoRequests: mediaInfoRequestsSiteMap,
      });

      await Promise.all(
        siteMapPresignedUrls.preSignedUrlInfoList.map(async (url, index) => {
          const file = toUploadSiteMap[index];

          const response = await fetch(file.url!);
          const blob = await response.blob();
          const newFile = new File([blob], `fileName-${file.id}`, { type: blob.type });

          return putS3Upload({ url: url.preSignedUrl, file: newFile });
        }),
      );

      const siteMapsData = formData.siteMapImages.map((m) => {
        if (m.id) {
          const url = siteMapPresignedUrls.preSignedUrlInfoList.find(
            (info) => info.mediaName === m.id?.toString(),
          )?.preSignedUrl;

          console.log("@@", url);

          const imageUrl = toCDNUrl(url?.split("?")[0] as string);

          return {
            imageUrl: imageUrl as string,
          };
        }

        return {
          imageUrl: m.imageUrl as string,
        };
      });

      console.log("@@", siteMapsData);

      await patchEvent({
        ...formData,
        eventId: eventDetailData?.eventId as number,
        images: imagesData,
        siteMapImages: siteMapsData,
      });

      alert("이벤트 수정이 완료되었습니다.");

      window.location.reload();
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

  if (eventDetailData === undefined) {
    return <LoadingWithLayout />;
  }

  return (
    <div>
      <div className={cx("header")}>
        <Typography type="title24" weight="bold">
          {eventDetailData.name}
        </Typography>
        <Typography type="body16" color="gray200">
          {eventDetailData.startDate}~{eventDetailData.endDate} / {eventDetailData.startTime}~
          {eventDetailData.endTime} / {eventDetailData.venue}
        </Typography>
      </div>
      <div className={cx("container")}>
        <EditSidebar currentStep={currentStep} onStepChange={setCurrentStep} />

        {currentStep === "basic" && (
          <EventFormLayout
            formData={formData}
            currentStep={currentStep}
            eventExposureStartDateField={eventExposureStartDateField.selectProps}
            eventExposureEndDateField={eventExposureEndDateField.selectProps}
            eventExposureStartTimeField={eventExposureStartTimeField}
            eventExposureEndTimeField={eventExposureEndTimeField}
            eventTypeSelect={eventTypeSelect.selectProps}
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
            onRemoveOriginalImage={handleRemoveOriginalImage}
            ticketRoundNameField={ticketRoundNameField}
            roundSalesStartDate={roundSalesStartDate.selectProps}
            roundSalesEndDate={roundSalesEndDate.selectProps}
            roundSalesStartTime={roundSalesStartTime}
            roundSalesEndTime={roundSalesEndTime}
            onSiteMapFileChange={handleSiteMapFileChange}
            onRemoveSiteMapImage={handleRemoveSiteMapImage}
            onDelete={handleDelete}
            isSubmitting={isSubmitting}
            isReadOnlyMode={isReadOnlyMode}
          />
        )}
        {currentStep === "ticket" && <TicketManagementClient eventId={eventId} />}
        {currentStep === "guest" && <GuestManagement eventId={eventId} />}
        {currentStep === "coupon" && <CouponManagementClient eventId={eventId} />}
        {currentStep === "timeTable" && (
          <Suspense fallback={<LoadingWithLayout />}>
            <TimeTableManagementClient eventId={eventId} />
          </Suspense>
        )}
        {currentStep === "basic" && (
          <div className={cx("floating")}>
            <div className={cx("floating_content")}>
              <Button
                className={cx("button")}
                variant={isReadOnlyMode ? "primary" : "cta"}
                isLoading={isSubmitting}
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
        )}
      </div>
    </div>
  );
}
