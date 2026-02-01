import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type LogoutResponse = {
  data: null;
};

export type LogoutMutationOptions<TData> = Omit<
  UseMutationOptions<TData, Error, void>,
  "mutationFn"
> & {
  onSuccess?: (data: TData) => void;
};

export const useLogoutMutation = (options?: LogoutMutationOptions<LogoutResponse>) => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      return res.json();
    },
    ...options,
  });
};
