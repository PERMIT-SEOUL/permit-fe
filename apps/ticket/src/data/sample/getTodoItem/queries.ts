import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

type SampleResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type SampleOptions<TData> = Omit<
  UseQueryOptions<TData, Error, TData, QueryKey>,
  "queryKey" | "initialData"
> & {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  onSuccess?: (data: TData) => void;
};

export const sampleOptions = (): SampleOptions<SampleResponse> => {
  return {
    queryKey: ["sample"],
    queryFn: () => {
      return fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json());
    }
  };
};
