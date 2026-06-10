# FILA React Project

기존 `FILA` HTML 프로젝트의 이미지 자산과 쇼핑몰 구성을 바탕으로 재구성한 Vite + React 프로젝트입니다.

## 실행 방법

```bash
npm install
npm run dev
```

## 구현 내용

- Vite + React 프로젝트 구성
- Header, Footer, SectionTitle, ProductCard 공통 컴포넌트 분리
- `useState`를 활용한 페이지 이동, 상품 상세 선택, 리뷰 CRUD 상태 관리
- props를 통한 상품 데이터와 이벤트 함수 전달
- 버튼 클릭, 입력, 제출, 수정, 삭제 이벤트 처리
- `src/components`, `src/pages`, `src/styles`, `src/assets/images`, `src/data` 폴더 구조화
- 상품 리뷰 게시판에서 Create / Read / Update / Delete 구현
