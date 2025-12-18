"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";

import { Button } from "@permit/design-system";
import { useSelect, useTextField } from "@permit/design-system/hooks";
import { eventsListOptions } from "@/data/admin/getEvents/queries";
import { EventRequest, useEventMutation } from "@/data/admin/postEvents/mutation";
import {
  usePostPresignedUrlsMutation,
  usePutS3Upload,
} from "@/data/admin/postPresignedUrls/mutation";
import { toCDNUrl } from "@/shared/helpers/toCdnUrl";

import { EventFormLayout } from "../../_components/EventFormLayout";
import { PreviewMedia } from "../../_components/ImageUploader";
import type { TicketData } from "../../_components/TicketForm";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type EventFormData = Omit<EventRequest, "ticketTypes" | "images" | "siteMapImages"> & {
  ticketTypes: TicketData[];
  images: PreviewMedia[];
  siteMapImages: PreviewMedia[];
};

type FormData = EventFormData;

const initialFormData: EventRequest = {
  eventExposureStartDate: "",
  eventExposureEndDate: "",
  eventExposureStartTime: "",
  eventExposureEndTime: "",
  verificationCode: "",
  name: "",
  eventType: "",
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
  siteMapImages: [],
};

export const eventTypeOptions = [
  { value: "PERMIT", label: "PERMIT" },
  { value: "CEILING", label: "CEILING" },
  { value: "OLYMPAN", label: "OLYMPAN" },
];

export function EventFormClient() {
  const router = useRouter();
  const qc = useQueryClient();
  const [currentStep, setCurrentStep] = useState<"basic" | "ticket">("basic");
  const [formData, setFormData] = useState<FormData>(initialFormData as FormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: postPresignedUrls } = usePostPresignedUrlsMutation({});
  const { mutateAsync: putS3Upload } = usePutS3Upload();
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

  const eventTypeSelect = useSelect({
    initialValue: "",
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

  // 티켓 관리 함수들
  const addTicket = () => {
    const newTicket: TicketData = {
      id: `ticket-${Date.now()}`,
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
      const data = await qc.fetchQuery(eventsListOptions());
      const allEvents = data.flatMap((d) => d.events);
      const maxEventIdAll = allEvents.length
        ? Math.max(...allEvents.map((e) => e.eventId))
        : undefined;

      const toUpload = (
        formData.images as { id?: number; url?: string; mediaType?: "IMAGE" | "VIDEO" }[]
      ).filter((m) => !!m?.url && !!m?.mediaType);

      const mediaInfoRequests = toUpload.map((m) => {
        const mediaName = `${m.id}`;

        return { mediaName, mediaType: m.mediaType! };
      });

      const presignedUrls = await postPresignedUrls({
        eventId: (maxEventIdAll as number) + 1 || 1,
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

      const presignedUrlsSiteMap = await postPresignedUrls({
        eventId: (maxEventIdAll as number) + 1 || 1,
        mediaInfoRequests: mediaInfoRequestsSiteMap,
      });

      await Promise.all(
        presignedUrlsSiteMap.preSignedUrlInfoList.map(async (url, index) => {
          const file = toUploadSiteMap[index];

          const response = await fetch(file.url!);
          const blob = await response.blob();
          const newFile = new File([blob], `fileName-${file.id}`, { type: blob.type });

          return putS3Upload({ url: url.preSignedUrl, file: newFile });
        }),
      );

      const siteMapsData = formData.siteMapImages.map((m) => {
        if (m.id) {
          const url = presignedUrlsSiteMap.preSignedUrlInfoList.find(
            (info) => info.mediaName === m.id?.toString(),
          )?.preSignedUrl;

          const imageUrl = toCDNUrl(url?.split("?")[0] as string);

          return {
            imageUrl: imageUrl as string,
          };
        }

        return {
          imageUrl: m.imageUrl as string,
        };
      });

      const apiData: EventRequest = {
        ...formData,
        images: imagesData,
        siteMapImages: siteMapsData,
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
    <div className={cx("container")}>
      {/* Sidebar */}
      <div className={cx("sidebar")}>
        <button className={cx("sidebar_item")} onClick={() => setCurrentStep("basic")}>
          <div className={cx("sidebar_indicator", currentStep === "basic" && "active")} />
          <span className={cx("sidebar_text", currentStep === "basic" && "active")}>Add Basic</span>
        </button>
        <button className={cx("sidebar_item")} onClick={() => setCurrentStep("ticket")}>
          <div className={cx("sidebar_indicator", currentStep === "ticket" && "active")} />
          <span className={cx("sidebar_text", currentStep === "ticket" && "active")}>
            Add Ticket
          </span>
        </button>
      </div>
      <EventFormLayout
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
        formData={formData}
        onFileChange={handleFileChange}
        ticketRoundNameField={ticketRoundNameField}
        roundSalesStartDate={roundSalesStartDate.selectProps}
        roundSalesEndDate={roundSalesEndDate.selectProps}
        roundSalesStartTime={roundSalesStartTime}
        roundSalesEndTime={roundSalesEndTime}
        onSiteMapFileChange={handleSiteMapFileChange}
        isSubmitting={isSubmitting}
        onAddTicket={addTicket}
        onUpdateTicket={updateTicket}
        onDeleteTicket={deleteTicket}
      />

      <div className={cx("floating")}>
        <Button
          className={cx("button")}
          isLoading={isSubmitting}
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
          {currentStep === "basic" ? "Next" : "Save"}
        </Button>
      </div>
    </div>
  );
}
