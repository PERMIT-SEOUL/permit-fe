export type GuestResponse = {
  guests: Guest[];
};

type Guest = {
  id: number;
  guestName: string;
  guestType: string;
  affiliation: string;
  phoneNumber: string;
  email: string;
};
