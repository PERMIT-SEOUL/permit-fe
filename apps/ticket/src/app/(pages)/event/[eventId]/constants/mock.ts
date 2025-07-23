// TODO: mock data 수정
export const mockEvent = {
  eventName: "Ceiling service vol.6 - Ksawery Komputery [PL]",
  venue: "TBA - Layer 41, 성수동",
  date: "Sun-mon, 25-26 May 2025",
  time: "19:00 - 22:00",
  minAge: 18,
  details: `PERMIT이 선보이는 ceiling service vol.6은 성수동 Layer 41에서 펼쳐지는 예술과 사운드의 몰입형 퍼포먼스입니다. Ksawery Komputery(폴란드)를 비롯해 Lewis OfMan, CIFIKA, Danny Arens, Gazaebal, Hahim, sooom, Yeesangyu가 참여하며, 박유석 작가의 라이브 비주얼이 함께합니다.

명상으로 시작해 연주와 설치로 이어지는 시간 속에서, 일상의 흐름을 멈추고 깊이 듣는 감각을 회복해보세요. 고요한 몰입의 여정에 여러분을 초대합니다.PERMIT이 선보이는 ceiling service vol.6은 성수동 Layer 41에서 펼쳐지는 예술과 사운드의 몰입형 퍼포먼스입니다. Ksawery Komputery(폴란드)를 비롯해 Lewis OfMan, CIFIKA, Danny Arens, Gazaebal, Hahim, sooom, Yeesangyu가 참여하며, 박유석 작가의 라이브 비주얼이 함께합니다.

명상으로 시작해 연주와 설치로 이어지는 시간 속에서, 일상의 흐름을 멈추고 깊이 듣는 감각을 회복해보세요. 고요한 몰입의 여정에 여러분을 초대합니다.`,
  lineup: [
    {
      category: "[Installation & Visuals]",
      artists: [{ name: "Ksawery Komputery" }],
    },
    {
      category: "[PL]",
      artists: [{ name: "Yuseok Bak" }],
    },
    {
      category: "[Ambient live set]",
      artists: [
        { name: "Lewis OfMan (Ambient Set)" },
        { name: "CIFIKA & UMAKA" },
        { name: "Haihm" },
        { name: "Danny Arens & gazaebal" },
        { name: "Yeesangyu & sooom" },
      ],
    },
    {
      category: "[Visual Artist]",
      artists: [{ name: "Yuseok Bak" }],
    },
  ],
  images: [
    {
      imageUrl: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500&h=600&fit=crop",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=600&fit=crop",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&h=600&fit=crop",
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
    },
  ],
};

export const mockRounds = [
  {
    roundId: 1,
    roundAvailable: false,
    roundPrice: "50,000 ~ 60,000",
    roundName: "Early bird",
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
    roundPrice: "50,000 ~ 60,000",
    roundName: "2nd release",
    ticketTypes: [
      {
        ticketTypeId: 9,
        ticketTypeName: "Day 1",
        ticketTypeDate: "Sun, 25 May 2025",
        ticketTypeTime: "18:30",
        ticketTypePrice: "60,000",
      },
    ],
  },
];
