# Body Chart 로직 레퍼런스 (에스테틱 버전용)

> 원본: Pt-charting 프로젝트의 Pain Chart
> 목적: 에스테틱샵 바디차트 구현 시 참고용

---

## 1. 원본 구조 요약

### 핵심 파일 3개
```
pain-chart.tsx     → 인체도 UI 컴포넌트 (이미지 + 마커 렌더링 + 클릭/드래그)
bodyRegions.ts     → 부위 영역 좌표 정의 + 좌표→부위명 매핑 함수
front/back.png     → 인체 이미지 (597×1024px)
```

### 원본 동작 방식
1. 이미지를 `aspect-[1/2]` 컨테이너에 `object-contain`으로 표시
2. 클릭하면 컨테이너 기준 좌표(0~100%)를 계산
3. 좌표가 정의된 부위 영역 안이면 → 빨간 점(마커) 생성
4. 마커는 드래그 이동, 호버 시 삭제 버튼 표시
5. front/back 탭으로 앞뒤 전환

---

## 2. 에스테틱 버전에서 달라져야 하는 점

### 원본 (물리치료)
- **마킹 방식**: 점(dot) 하나 → "여기가 아프다"
- **정보**: 위치만 기록 (x, y, side)
- **부위**: 근골격계 중심 (어깨, 허리, 무릎 등)

### 에스테틱 버전
- **마킹 방식**: 영역(zone) 선택 → "이 부위를 관리한다"
- **정보**: 위치 + 관심사 유형 (피부? 체형? 제모?)
- **부위**: 미용 관심 부위 (얼굴 세분화, 허리라인, 팔뚝, 셀룰라이트 등)

---

## 3. 좌표 시스템 (그대로 재사용 가능)

```
컨테이너 (div)
┌─────────────────────┐  ← y=0%
│     여백 (패딩)       │
│  ┌───────────────┐  │  ← y≈14% (이미지 상단)
│  │               │  │
│  │   인체 이미지    │  │   x: 0~100%, y: 0~100% (컨테이너 기준)
│  │               │  │
│  └───────────────┘  │  ← y≈86% (이미지 하단)
│     여백 (패딩)       │
└─────────────────────┘  ← y=100%
```

**좌표 계산 공식** (클릭 이벤트 → 퍼센트 좌표):
```ts
const rect = container.getBoundingClientRect()
const x = ((e.clientX - rect.left) / rect.width) * 100
const y = ((e.clientY - rect.top) / rect.height) * 100
```

새 이미지를 쓸 경우:
- 이미지 비율이 달라지면 `aspect-[1/2]` 와 유효 범위(14%~86%)를 새 이미지에 맞게 재계산
- 좌표계 자체(0~100%)는 동일하게 사용 가능

---

## 4. 부위 영역 정의 방식

```ts
interface BodyRegion {
  id: string          // "face_forehead", "body_waist" 등
  name: string        // "이마", "허리라인"
  category: string    // "face" | "upper" | "lower" | "arm" | "leg"
  xMin: number        // 영역 좌상단 x (0~100)
  xMax: number        // 영역 우하단 x
  yMin: number        // 영역 좌상단 y
  yMax: number        // 영역 우하단 y
}
```

**매칭 로직**: 클릭 좌표가 어느 영역에 속하는지 순회 탐색
```ts
function findRegion(x, y, regions) {
  // 구체적 부위부터 먼저 배치 (배열 순서 = 우선순위)
  for (const r of regions) {
    if (x >= r.xMin && x <= r.xMax && y >= r.yMin && y <= r.yMax) {
      return r
    }
  }
  return null
}
```

**새 이미지 좌표 잡는 법**:
1. 개발 모드에서 마우스 좌표를 실시간 표시 (debug overlay)
2. 이미지 위에서 각 부위의 경계점을 마우스로 훑으며 xMin/xMax/yMin/yMax 기록
3. 영역이 겹치면 → 더 구체적인 부위를 배열 앞에 배치

---

## 5. 에스테틱 버전 추천 구조

### 5-1. 마킹 데이터 모델

```ts
// 원본: 점 하나 = 통증 위치
interface PainPoint {
  id: string
  x: number; y: number
  side: "front" | "back"
}

// 에스테틱: 영역 선택 + 관심사 태그
interface CareZone {
  id: string
  regionId: string            // "face_cheek_left", "body_thigh_right" 등
  side: "front" | "back" | "face"
  concerns: ConcernTag[]      // 복수 관심사 가능
  memo?: string               // 자유 메모
}

type ConcernTag =
  // 피부
  | "acne"           // 여드름/트러블
  | "pigmentation"   // 색소침착/기미
  | "wrinkle"        // 주름
  | "pore"           // 모공
  | "redness"        // 홍조
  | "dryness"        // 건조
  | "elasticity"     // 탄력저하
  // 체형
  | "cellulite"      // 셀룰라이트
  | "fat"            // 지방/볼륨
  | "contour"        // 체형라인
  | "swelling"       // 부종/붓기
  // 제모/왁싱
  | "hair_removal"   // 제모
  // 기타
  | "scar"           // 흉터
  | "stretch_mark"   // 튼살
```

### 5-2. 뷰 구성 (3탭 권장)

```
[앞면]  [뒷면]  [얼굴]     ← 원본은 앞/뒤 2탭
```

- **앞면/뒷면**: 전신 이미지 (원본과 동일 방식)
- **얼굴**: 확대 얼굴 이미지 (이마, 눈가, 볼, 코, 턱, 입술, 목 등 세분화)

### 5-3. 인터랙션 차이

| | 원본 (통증) | 에스테틱 |
|---|---|---|
| 클릭 동작 | 점 찍기 | 영역 하이라이트 (토글) |
| 선택 표시 | 빨간 점 + 번호 | 영역 색칠 (반투명 오버레이) |
| 추가 정보 | 없음 | 관심사 태그 선택 팝업 |
| 삭제 | 점 호버 → × | 영역 재클릭 → 해제 |

### 5-4. 영역 하이라이트 구현 방법 (3가지 옵션)

**A. SVG 폴리곤 오버레이 (추천)**
```tsx
// 이미지 위에 SVG를 겹쳐서, 각 부위를 polygon으로 정의
<div className="relative">
  <Image src="/body-front.png" ... />
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
    {regions.map(r => (
      <polygon
        key={r.id}
        points={r.svgPoints}   // "43,25 58,25 58,38 43,38"
        fill={isSelected(r.id) ? "rgba(168,85,247,0.3)" : "transparent"}
        stroke={isSelected(r.id) ? "#a855f7" : "transparent"}
        onClick={() => toggleRegion(r.id)}
        className="cursor-pointer hover:fill-purple-200/30"
      />
    ))}
  </svg>
</div>
```
- 장점: 비정형 영역 가능, 부드러운 경계, 호버 효과 자유로움
- 단점: SVG 좌표를 부위별로 그려야 함

**B. 사각형 오버레이 (간단)**
```tsx
// 기존 bodyRegions 방식 그대로, 선택 시 반투명 사각형 표시
{selectedRegions.map(r => (
  <div
    key={r.id}
    className="absolute bg-purple-400/30 border border-purple-400 rounded"
    style={{
      left: `${r.xMin}%`, top: `${r.yMin}%`,
      width: `${r.xMax - r.xMin}%`, height: `${r.yMax - r.yMin}%`,
    }}
  />
))}
```
- 장점: 기존 좌표 시스템 그대로 사용, 구현 쉬움
- 단점: 사각형만 가능, 인체 곡선에 안 맞을 수 있음

**C. 이미지맵 + Canvas (고급)**
- 각 부위별 마스크 이미지를 준비하여 canvas에 합성
- 가장 자연스러운 하이라이트, 가장 많은 작업량

---

## 6. 에스테틱 부위 예시 (영역 정의할 때 참고)

### 전신 앞면
```
얼굴(별도탭) | 목 | 쇄골
가슴/데콜테 | 겨드랑이
윗팔(팔뚝) | 아랫팔 | 손
복부 상부 | 복부 하부 | 옆구리
허벅지 앞 (안쪽/바깥) | 무릎
정강이 | 발목 | 발
비키니라인
```

### 전신 뒷면
```
목 뒤 | 어깨 | 등 상부
브라라인 | 등 하부
허리라인 | 엉덩이
허벅지 뒤 (안쪽/바깥) | 오금
종아리 | 발뒤꿈치
```

### 얼굴 (확대도)
```
이마 | 미간
눈가(좌/우) | 눈밑(좌/우)
코 | 콧볼
볼(좌/우) | 광대(좌/우)
팔자주름(좌/우)
입술 | 입꼬리
턱 | 턱선(좌/우)
귀 앞(좌/우)
목 앞 | 목 옆(좌/우)
```

---

## 7. 컴포넌트 구현 스켈레톤

```tsx
// body-chart.tsx (에스테틱 버전)
"use client"

import { useState, useCallback } from "react"
import Image from "next/image"

type ViewTab = "front" | "back" | "face"

interface CareZone {
  regionId: string
  concerns: string[]
  memo?: string
}

interface BodyChartProps {
  zones?: CareZone[]
  onZonesChange?: (zones: CareZone[]) => void
}

export function BodyChart({ zones = [], onZonesChange }: BodyChartProps) {
  const [view, setView] = useState<ViewTab>("front")
  const [activePopup, setActivePopup] = useState<string | null>(null)

  const isSelected = (regionId: string) =>
    zones.some(z => z.regionId === regionId)

  const toggleRegion = useCallback((regionId: string) => {
    if (isSelected(regionId)) {
      // 이미 선택됨 → 해제
      onZonesChange?.(zones.filter(z => z.regionId !== regionId))
    } else {
      // 새로 선택 → 관심사 태그 팝업 열기
      setActivePopup(regionId)
    }
  }, [zones, onZonesChange])

  const addZone = useCallback((regionId: string, concerns: string[]) => {
    onZonesChange?.([...zones, { regionId, concerns }])
    setActivePopup(null)
  }, [zones, onZonesChange])

  return (
    <div className="flex flex-col h-full">
      {/* 탭 */}
      <div className="flex gap-1 p-2">
        {(["front", "back", "face"] as ViewTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={view === tab ? "active" : ""}
          >
            {tab === "front" ? "앞면" : tab === "back" ? "뒷면" : "얼굴"}
          </button>
        ))}
      </div>

      {/* 인체도 */}
      <div className="relative flex-1">
        <Image src={`/body-${view}.png`} alt="" fill className="object-contain" />

        {/* SVG 오버레이: 부위별 영역 */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
             preserveAspectRatio="none">
          {getRegions(view).map(region => (
            <rect
              key={region.id}
              x={region.xMin} y={region.yMin}
              width={region.xMax - region.xMin}
              height={region.yMax - region.yMin}
              fill={isSelected(region.id) ? "rgba(168,85,247,0.3)" : "transparent"}
              stroke={isSelected(region.id) ? "#a855f7" : "transparent"}
              className="cursor-pointer hover:fill-purple-200/20"
              onClick={() => toggleRegion(region.id)}
            />
          ))}
        </svg>

        {/* 관심사 선택 팝업 */}
        {activePopup && <ConcernPicker regionId={activePopup} onConfirm={addZone} />}
      </div>

      {/* 선택된 부위 목록 */}
      <div className="p-2 space-y-1">
        {zones.map(z => (
          <div key={z.regionId} className="flex items-center gap-2 text-sm">
            <span>{getRegionName(z.regionId)}</span>
            {z.concerns.map(c => <span key={c} className="tag">{c}</span>)}
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 8. 요약: 재사용할 것 vs 새로 만들 것

| 항목 | 재사용 | 새로 만들기 |
|------|--------|------------|
| 좌표 시스템 (0~100%) | ✅ | |
| 좌표→부위 매핑 함수 | ✅ (로직) | 부위명/좌표값 |
| 앞/뒤 전환 UI | ✅ | + 얼굴 탭 추가 |
| 인체 이미지 | | ✅ 새 이미지 |
| 마킹 방식 | | ✅ 점→영역 하이라이트 |
| 데이터 모델 | | ✅ CareZone + ConcernTag |
| 관심사 태그 UI | | ✅ 새로 구현 |
