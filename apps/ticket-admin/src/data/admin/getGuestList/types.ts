export type GuestResponse = {
  guests: Guest[];
};

type Guest = {
  guestId: number;
  guestName: string;
  guestType: string;
  affiliation: string;
  phoneNumber: string;
  email: string;
};
