// TODO: mock data 수정
export const mockEvent = {
  eventName: "Summer Vibes Festival",
  venue: "Seoul Olympic Stadium",
  date: "Sun-mon, 25-26 May 2025",
  time: "18:00 - 22:00",
  minAge: 19,
  details: "한여름 밤을 뜨겁게 달굴 뮤직 페스티벌!",
  lineup: [
    {
      category: "[Headliner]",
      artists: [{ name: "NewJeans" }, { name: "Zico" }],
    },
    {
      category: "[Opening Act]",
      artists: [{ name: "LUCY" }, { name: "10CM" }],
    },
  ],
  images: [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/58854041?v=4",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/70939232?v=4",
    },
  ],
};

export const mockRounds = [
  {
    roundId: 1,
    roundAvailable: false,
    roundPrice: "50,000~60,000",
    roundName: "1차 예매",
    ticketTypes: [
      {
        ticketTypeId: 1,
        ticketTypeName: "1일권",
        ticketTypeDate: "2025-08-01",
        ticketTypeTime: "10:00",
        ticketTypePrice: "60,000",
      },
      {
        ticketTypeId: 2,
        ticketTypeName: "2일권",
        ticketTypeDate: "2025-08-02",
        ticketTypeTime: "14:00",
        ticketTypePrice: "60,000",
      },
    ],
  },
  {
    roundId: 2,
    roundAvailable: true,
    roundPrice: "50,000~60,000",
    roundName: "2차 예매",
    ticketTypes: [
      {
        ticketTypeId: 2,
        ticketTypeName: "VIP 티켓",
        ticketTypeDate: "2025-08-10",
        ticketTypeTime: "18:30",
        ticketTypePrice: "60,000",
      },
    ],
  },
];
