# SESSION LOG

## 2026-03-28

### 문제 발생

- 모바일 ↔ 랩톱 메시지 동기화 불안정
- 메시지가 사라졌다가 복원되는 현상 발생
- 방향 비대칭 발생 (한쪽만 전달)

### 시도

- realtime 구조 변경
- partial fetch 도입
- reconcile 로직 추가
- 여러 차례 롤백

### 결과

- 상태 더 불안정해짐
- 기준선 깨짐
- 원인 불명 상태 지속

### 핵심 교훈

1. 기준선 없이 최적화 금지
2. 여러 레이어 동시 변경 금지
3. partial fetch는 가장 마지막 단계
4. since 기준은 매우 위험한 영역
5. 실기기 테스트 없이는 의미 없음

### 금지 기록 (다시 하지 말 것)

- partial + realtime + reconcile 동시에 수정
- 원인 모른 상태에서 patch 누적
- 커밋 기준이 아닌 상태 기준 롤백
- since를 클라이언트 기준으로 생성

### 추가 기록 (규칙 문서)

- 이번 작업 내용: `.cursor/rules.md`에 MANDATORY POST-STEP(CRITICAL) 블록 추가
- 시도한 것: 기존 rules 본문 유지, 하단에 지정 블록만 추가
- 결과: 반영 완료
- 문제/교훈: 작업 종료 시 `PROJECT_STATE` / `SESSION_LOG` 갱신이 이제 규칙상 필수

### 추가 기록 (템플릿 폴더)

- 이번 작업 내용: `/_template`에 AI 아키텍트 템플릿(`ai/*.md`, `.cursor/rules.md`, `README.md`) 생성
- 시도한 것: 제공된 경로·문구 그대로 파일 작성
- 결과: 8개 파일 생성 완료
- 문제/교훈: 신규 프로젝트는 `_template` 복사 후 `/ai`, `/.cursor` 유지

### 추가 기록 (채팅 렌더 방어)

- 이번 작업 내용: `app/chat/page.tsx`에서 `messagesForRender`로 필터 후 `ChatMessages`에 전달 (무효 항목·`user_id` 없음 제외)
- 시도한 것: `useMemo`로 목록 정제
- 결과: 린트 문제 없음
- 문제/교훈: 실제 `.map`은 `ChatMessages` 내부; 페이지에서 입력 방어

### 추가 기록 (mergeMessages)

- 이번 작업 내용: `mergeMessages(prev, next)` 추가; 목록 로드·Realtime upsert·전송·티켓·삭제 반영을 `setMessages(prev => mergeMessages(...))` 패턴으로 통일
- 시도한 것: 낙관적 전송 성공 시 임시 id 행 제거 후 서버 메시지 병합
- 결과: 린트 통과
- 문제/교훈: API 페이로드가 동일 id에 대해 부분 객체만 줄 때는 이전 `{ ...prev, ...incoming }`보다 덜 병합될 수 있음(요청 스펙에 맞춤)
