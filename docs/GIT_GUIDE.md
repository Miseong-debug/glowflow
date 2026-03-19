# Git 브랜치 가이드 — Claude & Gemini 동시 작업용

## Git이 뭔데?

Git은 **파일의 변경 이력을 저장해주는 타임머신**이야.

- 언제든 과거 상태로 돌아갈 수 있고
- 여러 갈래로 나눠서 작업한 뒤 합칠 수 있어

---

## 핵심 개념 4가지

### 1. 커밋 (Commit) = 저장 포인트

게임의 세이브 포인트와 같아. "지금 이 상태를 기억해둬"라고 하는 거야.

```
세이브1 → 세이브2 → 세이브3
```

### 2. 브랜치 (Branch) = 평행 세계

"지금 상태에서 갈라져 나온 복사본"이야. 원본은 그대로 두고 실험할 수 있어.

```
main:          A → B → C  (원본, 안전하게 보관)
                     ↘
claude-작업:          D → E  (Claude가 작업하는 세계)
```

### 3. 머지 (Merge) = 합치기

두 평행 세계의 변경사항을 하나로 합치는 거야.

```
main:          A → B → C ─────→ F  (합쳐진 결과)
                     ↘           ↗
claude-작업:          D → E ──┘
```

### 4. 충돌 (Conflict) = 같은 곳을 둘 다 고침

두 브랜치가 **같은 파일의 같은 부분**을 수정하면 Git이 "어느 걸 살릴까?" 하고 물어봐.
→ 그래서 Claude와 Gemini가 **서로 다른 파일**을 수정하게 하는 게 중요해!

---

## 실전: Claude + Gemini 동시 작업 방법

### 준비 — 작업 전 상태 확인

```bash
git status          # 지금 어떤 상태인지 확인
git log --oneline   # 지금까지의 세이브 포인트 목록
```

### Step 1: Claude용 브랜치 만들기

Claude한테 작업 시키기 **전에** 터미널에서:

```bash
git checkout -b claude/기능이름
```

예시:
```bash
git checkout -b claude/js-리팩토링
```

이렇게 하면 main에서 갈라져 나온 새 브랜치가 생겨.

### Step 2: Claude 작업 끝나면 저장

```bash
git add -A
git commit -m "Claude: 어떤 작업을 했는지 설명"
```

### Step 3: main으로 돌아와서 Gemini용 브랜치 만들기

```bash
git checkout main
git checkout -b gemini/기능이름
```

예시:
```bash
git checkout -b gemini/css-스타일링
```

### Step 4: Gemini 작업 끝나면 저장

```bash
git add -A
git commit -m "Gemini: 어떤 작업을 했는지 설명"
```

### Step 5: 둘 다 main에 합치기

```bash
# main으로 이동
git checkout main

# Claude 작업 합치기
git merge claude/기능이름

# Gemini 작업 합치기
git merge gemini/기능이름
```

서로 다른 파일을 수정했다면 **자동으로 깔끔하게 합쳐져**.

### Step 6: 다 쓴 브랜치 정리

```bash
git branch -d claude/기능이름
git branch -d gemini/기능이름
```

---

## 만약 충돌이 나면?

같은 파일을 둘 다 수정했을 때 이런 게 보여:

```
<<<<<<< HEAD
여기는 main에 있던 코드
=======
여기는 합치려는 브랜치의 코드
>>>>>>> claude/기능이름
```

**해결 방법:**
1. 파일을 열어서 `<<<<<<<`, `=======`, `>>>>>>>` 표시를 찾아
2. 둘 중 살릴 코드를 고르거나, 둘 다 살려서 정리해
3. 표시(`<<<<<<<` 등)를 지워
4. 저장 후:

```bash
git add 수정한파일
git commit -m "충돌 해결: 설명"
```

---

## 충돌 안 나게 하는 꿀팁

| Claude에게 시킬 것 | Gemini에게 시킬 것 |
|---|---|
| `app.js` 수정 | `style.css` 수정 |
| JS 로직 추가 | HTML 구조 변경 |
| 새 JS 파일 생성 | 새 CSS 파일 생성 |

**핵심 규칙: 같은 파일을 동시에 건드리지 않기!**

---

## 자주 쓰는 명령어 모음

| 명령어 | 뜻 | 언제 쓰나 |
|---|---|---|
| `git status` | 지금 상태 보기 | 항상, 뭘 하기 전에 |
| `git log --oneline` | 세이브 포인트 목록 | 히스토리 확인할 때 |
| `git branch` | 브랜치 목록 보기 | 지금 어디 있는지 확인 |
| `git checkout main` | main으로 이동 | 브랜치 전환할 때 |
| `git checkout -b 이름` | 새 브랜치 만들고 이동 | 작업 시작 전 |
| `git add -A` | 모든 변경사항 추가 | 커밋 전 |
| `git commit -m "메시지"` | 저장 포인트 만들기 | 작업 단위 끝날 때 |
| `git merge 이름` | 브랜치 합치기 | 작업 끝나고 합칠 때 |
| `git branch -d 이름` | 브랜치 삭제 | 합친 후 정리 |
| `git diff` | 뭐가 바뀌었는지 보기 | 커밋 전 변경 확인 |

---

## 실수했을 때 되돌리기

```bash
# 아직 커밋 안 한 변경사항 전부 되돌리기 (주의: 변경사항 사라짐!)
git checkout .

# 마지막 커밋 취소 (파일은 그대로 유지)
git reset --soft HEAD~1

# 특정 세이브 포인트로 돌아가기 (먼저 git log로 확인)
git log --oneline
git checkout 커밋번호
```

---

## 전체 흐름 요약

```
1. git checkout -b claude/작업명     ← Claude 브랜치 생성
2. (Claude 작업)
3. git add -A && git commit          ← Claude 작업 저장
4. git checkout main                 ← main으로 복귀
5. git checkout -b gemini/작업명     ← Gemini 브랜치 생성
6. (Gemini 작업)
7. git add -A && git commit          ← Gemini 작업 저장
8. git checkout main                 ← main으로 복귀
9. git merge claude/작업명           ← Claude 작업 합치기
10. git merge gemini/작업명          ← Gemini 작업 합치기
11. 끝! main에 두 작업이 다 합쳐짐
```
