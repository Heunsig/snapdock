# GitHub Stars Fetcher

이 스크립트는 `content/projects` 디렉토리에 있는 마크다운 파일들에서 GitHub 링크를 찾아 각 프로젝트의 star 수를 조회하는 도구입니다.

Node.js의 내장 `fetch` API를 사용하여 GitHub API와 통신하며, `.env` 파일을 통해 간편하게 토큰을 관리할 수 있습니다.

## 사전 준비

### 1. GitHub Personal Access Token 발급

1. GitHub에 로그인 후 [Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens) 로 이동
2. "Generate new token (classic)" 클릭
3. Note에 "GitHub Stars Fetcher" 등 적절한 이름 입력
4. Expiration을 적절히 설정 (권장: 90 days)
5. 아래 권한들을 선택:
   - `public_repo` (공개 저장소 읽기)
   - 또는 `repo` (모든 저장소 접근, private 저장소도 조회하려면)
6. "Generate token" 클릭하고 토큰을 복사

### 2. 환경변수 설정

**방법 1: .env 파일 사용 (권장)**

프로젝트 루트에 `.env` 파일을 생성하고 다음과 같이 작성:

```bash
# .env
GITHUB_TOKEN=your_github_token_here
```

**방법 2: 환경변수로 직접 설정**

```bash
export GITHUB_TOKEN=your_github_token_here
```

또는 `.bashrc` 또는 `.zshrc`에 추가하여 영구적으로 설정:

```bash
echo 'export GITHUB_TOKEN=your_github_token_here' >> ~/.bashrc
source ~/.bashrc
```

## 사용법

### 기본 실행

```bash
node get-github-stars.js
```

### 실행 권한을 부여한 후 직접 실행

```bash
chmod +x get-github-stars.js
./get-github-stars.js
```

## 출력 예시

```
🔍 Scanning for projects with GitHub links...

📂 Found 45 projects with GitHub links

[1/45] Fetching stars for Immich...
   ⭐ 52,847 stars
[2/45] Fetching stars for Umami...
   ⭐ 22,341 stars
...

================================================================================
📊 GITHUB STARS SUMMARY
================================================================================

  1. ⭐   52,847 🍴  4,321 [TypeScript  ] Immich
     https://github.com/immich-app/immich

  2. ⭐   22,341 🍴  1,987 [TypeScript  ] Umami
     https://github.com/umami-software/umami
     
...

📈 STATISTICS:
   Total projects: 45
   Successful queries: 44
   Failed queries: 1
   Total stars: 487,234
   Average stars: 11,073
   Most starred: Immich (52,847 ⭐)

💾 Report saved to: github-stars-report.json
```

## 출력 파일

스크립트 실행 후 `github-stars-report.json` 파일이 생성됩니다. 이 파일에는 다음 정보가 포함됩니다:

- 생성 시간
- 전체 통계
- 각 프로젝트별 상세 정보 (star 수, fork 수, 언어, 마지막 업데이트 등)

## 지원되는 마크다운 형식

스크립트는 다음과 같은 front matter 형식을 지원합니다:

```yaml
---
name: Project Name
github: 'https://github.com/owner/repository'
---
```

또는

```yaml
---
name: Project Name
github: "https://github.com/owner/repository"
---
```

## 에러 해결

### "GITHUB_TOKEN environment variable is required"
- GitHub token이 설정되지 않았습니다. 위의 환경변수 설정 단계를 따라주세요.

### "GitHub API error: 401"
- GitHub token이 유효하지 않거나 만료되었습니다. 새로운 token을 발급받아주세요.

### "GitHub API error: 403"
- API 율량 제한에 걸렸습니다. 잠시 후 다시 시도해주세요.
- Personal access token을 사용하면 시간당 5,000 요청까지 가능합니다.

### "GitHub API error: 404"
- 저장소가 존재하지 않거나 private 저장소에 접근 권한이 없습니다.

## 주의사항

- GitHub API는 시간당 요청 제한이 있습니다 (인증된 사용자: 5,000 요청/시간)
- 스크립트는 API 율량 제한을 피하기 위해 요청 사이에 100ms 딜레이를 추가합니다
- 많은 프로젝트가 있는 경우 실행에 시간이 걸릴 수 있습니다
