# PROJECT STATE

## 현재 상태 (가장 중요)

- 기준선 상태: 불안정
- 주요 문제:
  - 모바일 ↔ 랩톱 메시지 동기화 불일치
  - F5 시 메시지 사라졌다가 복원됨
  - since 기반 partial fetch 의심
- 재현 상태:
  - 랩톱 → 모바일 전송 안 됨
  - 모바일 → 랩톱 전송 안 됨 (현재 일부 상태)
- DB 상태:
  - 메시지는 정상 저장됨 (서버 기준 정상)

## 마지막 정상 상태 (추정)

- 특정 시점에서는 양방향 동기화 정상 작동
- 이후 리팩토링 / partial / realtime / reconcile 변경 이후 깨짐

## 현재 가설 (우선순위)

1. since 값 오염 (미래 timestamp)
2. partial fetch가 기존 state를 덮어씀
3. realtime + polling 경쟁 상태
4. 캐시 / 서비스워커 가능성

## 현재 금지

- partial fetch 수정 시도
- realtime 구조 변경
- 새로운 기능 추가
- 임의 patch 누적

## 다음 단계 (단 하나만)

- "정상 동작하는 최소 기준선" 재확보
  - full fetch only 상태로 복구
  - 양방향 송수신 확인
  - F5 유지 확인

## 최근 변경 (2026-03-28)

- 변경된 내용: `.cursor/rules.md`에 **MANDATORY POST-STEP** 추가 — 작업 완료 후 `PROJECT_STATE` / `SESSION_LOG` 갱신 및 코드→테스트→md 순서 명시
- 변경된 내용: 프로젝트 루트에 **`/_template`** 추가 — `/ai`, `/.cursor`, `README.md`를 새 프로젝트용 재사용 템플릿으로 복제 가능
- 변경된 내용: `app/chat/page.tsx` — `ChatMessages`에 넘기기 전 `messages`에서 `null`/`undefined` 및 `user_id` 없음 항목 제외(`messagesForRender`)
- 변경된 내용: `app/chat/page.tsx` — `mergeMessages(prev, next)` 도입; `setMessages(직접 배열)` 없이 항상 이전 상태와 id 기준 병합
- 다음 단계: 채팅 기준선 재확보(기존 항목 유지); 이후 모든 작업은 새 규칙에 따라 종료 시 md 갱신
