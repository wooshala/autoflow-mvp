# INVARIANTS

이 문서는 절대 규칙이다.
이 규칙과 충돌하는 코드는 작성하지 않는다.

## 공통 불변식
1. 메시지의 최종 진실은 항상 DB다.
2. 클라이언트 state는 DB 결과를 표현할 뿐이다.
3. 실기기에서 확인되지 않은 상태는 기준선이 아니다.
4. 1회 변경 후 반드시 실기기 테스트를 한다.

## 채팅 불변식
1. full fetch 완료 전 partial fetch 금지
2. since는 서버 응답의 created_at에서만 갱신
3. new Date(), Date.now()를 since anchor로 사용 금지
4. partial fetch 결과 0건은 기존 메시지 state에 영향 0
5. optimistic render는 기준선 안정화 전 금지
6. realtime은 정확성 보장 계층이 아니라 보조 계층
7. room, participants, unread는 Phase 0 안정화 전 금지
8. send/list/realtime/reconcile을 동시에 수정 금지
9. 새 기능 작업 중 기준선이 흔들리면 즉시 중단
10. 롤백 기준은 "실기기 정상 검증된 시점"이어야 함

## 작업 규칙
- 작업 전 이 문서를 읽는다
- 위반 가능성이 있으면 코드 수정 전에 먼저 보고한다
- 규칙 위반이 필요한 경우 DECISIONS.md에 사유를 남긴다
