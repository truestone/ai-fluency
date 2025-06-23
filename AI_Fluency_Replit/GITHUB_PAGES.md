# GitHub Pages 배포 가이드

이 프로젝트는 GitHub Pages에서 정적 웹사이트로 호스팅할 수 있도록 구성되어 있습니다.

## 자동 배포

이 저장소는 GitHub Actions를 통해 자동 배포가 설정되어 있습니다. `main` 브랜치에 변경사항을 푸시하면 다음과 같은 과정이 자동으로 진행됩니다:

1. GitHub Actions 워크플로우가 시작됩니다
2. Node.js 환경이 설정됩니다
3. 의존성이 설치됩니다
4. 정적 사이트가 빌드됩니다
5. 빌드된 파일이 `gh-pages` 브랜치에 배포됩니다

## 수동 배포

수동으로 배포하려면 다음 명령어를 실행하세요:

```bash
# 의존성 설치
npm install

# 정적 사이트 빌드
npm run build

# gh-pages 브랜치에 배포 (gh-pages 패키지 필요)
npx gh-pages -d dist
```

## GitHub Pages 설정

프로젝트 저장소의 경우 GitHub Pages 설정이 다음과 같이 설정되어야 합니다:

1. 저장소 페이지에서 "Settings" 탭으로 이동
2. 왼쪽 사이드바에서 "Pages"를 클릭
3. "Source" 섹션에서 "Deploy from a branch"를 선택
4. "Branch" 드롭다운에서 "gh-pages"를 선택하고 "/(root)" 폴더를 선택
5. "Save" 버튼 클릭

## 사용자 정의 도메인 설정 (선택사항)

사용자 정의 도메인을 사용하려면:

1. DNS 제공업체에서 CNAME 레코드를 설정하세요
2. GitHub Pages 설정에서 "Custom domain" 필드에 도메인을 입력하세요
3. "Enforce HTTPS" 옵션을 체크하세요 (권장)

## 문제 해결

배포 후 사이트가 제대로 작동하지 않는 경우:

1. 저장소 설정에서 GitHub Pages URL이 올바른지 확인하세요
2. 브라우저 콘솔에서 오류 메시지를 확인하세요
3. 해시 기반 라우팅이 올바르게 작동하는지 확인하세요