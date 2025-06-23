# AI 활용 능력 향상 과정

정적 웹사이트로 구현된 AI 활용 능력 향상 교육 과정입니다.

## 정적 웹사이트 변환

이 프로젝트는 서버 API를 사용하는 동적 웹사이트에서 GitHub Pages에서 호스팅 가능한 정적 웹사이트로 변환되었습니다. 주요 변경사항은 다음과 같습니다:

- 서버 API 호출을 로컬 스토리지 기반으로 변경
- 빌드 설정 업데이트
- GitHub Pages 배포 설정

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 정적 사이트 빌드
npm run build

# 빌드된 사이트 테스트 (간단한 HTTP 서버)
npm run test-static

# Vite 프리뷰 서버로 테스트
npm run preview

# 또는 브라우저에서 직접 열기
open open-static-site.html  # macOS
start open-static-site.html # Windows
```

## 배포

이 프로젝트는 GitHub Pages를 통해 자동으로 배포됩니다. `main` 브랜치에 변경사항을 푸시하면 GitHub Actions를 통해 자동으로 빌드 및 배포가 이루어집니다.

자세한 배포 방법은 [GITHUB_PAGES.md](GITHUB_PAGES.md) 파일을 참조하세요.

## 주요 기능

- 모듈식 학습 콘텐츠
- 진도 추적 (로컬 스토리지 기반)
- 용어집 및 프롬프트 라이브러리
- 모바일 및 데스크톱 환경 지원

## 기술 스택

- React
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Wouter (라우팅)

## 로컬 스토리지

이 애플리케이션은 다음과 같은 로컬 스토리지 키를 사용합니다:

- `ai-course-current-module`: 현재 선택된 모듈 ID
- `ai-course-progress-data`: 사용자의 학습 진도 데이터