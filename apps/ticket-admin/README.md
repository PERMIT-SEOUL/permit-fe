# Ticket Admin

티켓 관리자 대시보드 애플리케이션입니다.

## 기술 스택

- Next.js 14 (App Router)
- React 18
- TypeScript
- SCSS

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

개발 서버는 http://localhost:3001 에서 실행됩니다.

## 라우팅

- `/` - 홈페이지
- `/[id]/dashboard` - 대시보드 페이지 (동적 라우팅)

## 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지 (/)
│   └── [id]/
│       └── dashboard/
│           └── page.tsx    # 대시보드 페이지 (/[id]/dashboard)
└── styles/
    └── globals.scss        # 전역 스타일
```
