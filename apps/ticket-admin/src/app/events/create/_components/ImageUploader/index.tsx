"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export type PreviewMedia = {
  id?: number;
  originalId?: number;
  url?: string; // preview url (data URL for images, object URL for videos)
  mediaType?: "IMAGE" | "VIDEO";
} & { imageUrl?: string };

type Props = {
  value?: PreviewMedia[] | null;
  disabled?: boolean;
  // 미리보기 리스트가 변경될 때 상위로 전달
  onImagesUpload?: (images: PreviewMedia[]) => void;
  // 원본 파일을 상위 로직으로 전달하고 싶을 때 사용 (기존 onFileChange 호환)
  onFileSelect?: (files: FileList | null) => void;
  onRemoveOriginalImage?: (url: string) => void;
};

export function ImageUploader({
  value = null,
  disabled,
  onImagesUpload,
  onFileSelect,
  onRemoveOriginalImage,
}: Props) {
  const [previewImgs, setPreviewImgs] = useState<PreviewMedia[] | null>(value);
  const [inputKey, setInputKey] = useState<number>(Date.now());
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isPreviewImage = (preview: PreviewMedia) => {
    if (preview.imageUrl) {
      if (preview.imageUrl.includes("images")) {
        return true;
      }

      return false;
    }

    if (preview.mediaType === "IMAGE") {
      return true;
    }

    return false;
  };

  useEffect(() => {
    setPreviewImgs(value || null);
  }, [value]);

  const openPicker = () => {
    if (disabled) return;

    inputRef.current?.click();
  };

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      onFileSelect?.(null);

      return;
    }

    onFileSelect?.(files);

    const processFile = (file: File) => {
      return new Promise<PreviewMedia>((resolve) => {
        const isVideo = file.type.startsWith("video/");
        const fileReader = new FileReader();

        fileReader.onload = function (event) {
          const dataUrl = event.target?.result as string;

          resolve({
            id: Date.now() + Math.floor(Math.random() * 1000),
            url: dataUrl,
            mediaType: isVideo ? "VIDEO" : "IMAGE",
          });
        };
        fileReader.readAsDataURL(file);
      });
    };

    const processAllFiles = async () => {
      const newPreviewImgs = await Promise.all(Array.from(files).map((file) => processFile(file)));
      const updatedPreviewImgs = [...(previewImgs ?? []), ...newPreviewImgs];

      setPreviewImgs(updatedPreviewImgs);
      onImagesUpload?.(updatedPreviewImgs);
    };

    processAllFiles();
  };

  const removeImage = (id: number | string) => {
    if (disabled) return;

    if (String(id).startsWith("http")) {
      onRemoveOriginalImage?.(id as string);

      return;
    }

    const current = previewImgs ?? [];
    const target = current.find((m) => m.id === id || m.originalId === id);

    if (target && target.mediaType === "VIDEO") {
      URL.revokeObjectURL(target.url!);
    }

    const next = current.filter((img) => img.id !== id && img.originalId !== id);

    setPreviewImgs(next);
    onImagesUpload?.(next);
    setInputKey(Date.now());
  };

  return (
    <div className={cx("uploader")}>
      <input
        key={inputKey}
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={uploadFile}
        className={cx("hiddenInput")}
        disabled={disabled}
      />

      <div
        role="button"
        aria-label="add-image"
        className={cx("cameraCard", { disabled })}
        onClick={openPicker}
      />

      {previewImgs && previewImgs.length > 0 && (
        <div className={cx("grid")}>
          {previewImgs.map((preview, index) => (
            <div key={`${preview.id}-${index}`} className={cx("thumb")}>
              {isPreviewImage(preview) ? (
                <img
                  src={preview.imageUrl || preview.url}
                  alt={`Preview-${preview.id}`}
                  className={cx("image")}
                />
              ) : (
                <video
                  src={preview.imageUrl || preview.url}
                  className={cx("video")}
                  controls
                  muted
                  playsInline
                />
              )}
              <button
                type="button"
                className={cx("removeBtn", disabled && "disabled")}
                onClick={() => removeImage((preview.id || preview.imageUrl)!)}
                aria-label="remove-media"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
