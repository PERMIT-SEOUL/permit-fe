import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

import { API_URL } from "@/data/constants";
import { instance } from "@/lib/axios";

export type MediaInfoRequest = {
  mediaName: string;
  mediaType: "IMAGE" | "VIDEO";
};

export type PresignedUrlsRequest = {
  eventId: number;
  mediaInfoRequests: MediaInfoRequest[];
};

export type PresignedUrlInfo = {
  preSignedUrl: string;
  mediaName: string;
};

type PresignedUrlsResponse = {
  preSignedUrlInfoList: PresignedUrlInfo[];
};

export type PresignedUrlsMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, PresignedUrlsRequest>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const usePostPresignedUrlsMutation = (
  options?: PresignedUrlsMutationOptions<PresignedUrlsResponse>,
) => {
  return useMutation({
    mutationFn: async (params: PresignedUrlsRequest) => {
      const { data } = await instance.post<PresignedUrlsResponse>(
        API_URL.ADMIN.PRESIGNED_URLS,
        params,
      );

      return data;
    },
    ...options,
  });
};

export interface PutImageUploadParams {
  url: string;
  file: File;
}

const putS3ImageUpload = async ({ url, file }: PutImageUploadParams) => {
  const response = await axios.put(url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  return response;
};

export const usePutS3Upload = () => {
  return useMutation({
    mutationFn: ({ url, file }: PutImageUploadParams) => putS3ImageUpload({ url, file }),
  });
};
