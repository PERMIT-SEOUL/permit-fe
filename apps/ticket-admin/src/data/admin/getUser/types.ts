export type UserParams = {
  email: string;
};

export type UserResponse = {
  userId: number;
  userName: string;
  currentUserRole: "ADMIN" | "STAFF" | "USER";
};
