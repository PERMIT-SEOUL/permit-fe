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
      imageUrl:
        "https://scontent-icn2-1.cdninstagram.com/v/t51.2885-15/500334637_18065689073489590_1168903891502206281_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwODB4MTM1MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_cat=110&_nc_oc=Q6cZ2QGahG54F3OXjEzOlGnkcmtxfVQ7GazeDgSR-bfiRVswhmICcm4RS_zUemoy9alKu7Y&_nc_ohc=3q3CofWZ9TIQ7kNvwG9U3ZF&_nc_gid=DTO0oxJbBQR8N_vg_UrL1Q&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzYzOTQ0NjE5MTU4MDUzNjM2Mg%3D%3D.3-ccb7-5&oh=00_AfQa62J13gyKCd5sFXTPxb6cE_zsDaeF6hhHyyBnNSlYTQ&oe=6880F422&_nc_sid=7a9f4b",
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
