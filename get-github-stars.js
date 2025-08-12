#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env 파일 로드
dotenv.config();

// GitHub API 설정
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const CONTENT_DIR = path.join(__dirname, 'content', 'projects');

if (!GITHUB_TOKEN) {
  console.error('❌ Error: GITHUB_TOKEN environment variable is required');
  console.error('');
  console.error('Please set your GitHub token in one of these ways:');
  console.error('1. Create a .env file in the project root with:');
  console.error('   GITHUB_TOKEN=your_token_here');
  console.error('');
  console.error('2. Or set it as an environment variable:');
  console.error('   export GITHUB_TOKEN=your_token_here');
  console.error('');
  console.error('Get your token from: https://github.com/settings/tokens');
  process.exit(1);
}

/**
 * GitHub API 요청을 보내는 함수
 */
async function makeGitHubRequest(path) {
  const url = `https://api.github.com${path}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'GitHub-Stars-Fetcher',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

/**
 * GitHub URL에서 owner/repo 정보를 추출하는 함수
 */
function extractRepoInfo(githubUrl) {
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (match) {
    return {
      owner: match[1],
      repo: match[2]
    };
  }
  return null;
}

/**
 * 마크다운 파일에서 front matter의 github 링크를 추출하는 함수
 */
function extractGitHubLink(content) {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) {
    return null;
  }

  const frontMatter = frontMatterMatch[1];
  const githubMatch = frontMatter.match(/github:\s*['"]([^'"]+)['"]/);
  
  return githubMatch ? githubMatch[1] : null;
}

/**
 * 프로젝트 이름을 추출하는 함수
 */
function extractProjectName(content) {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontMatterMatch) {
    return null;
  }

  const frontMatter = frontMatterMatch[1];
  const nameMatch = frontMatter.match(/name:\s*['"]?([^'"\n]+)['"]?/);
  
  return nameMatch ? nameMatch[1].trim() : null;
}

/**
 * 메인 함수
 */
async function main() {
  console.log('🔍 Scanning for projects with GitHub links...\n');

  try {
    const files = fs.readdirSync(CONTENT_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    const projects = [];
    
    // 모든 마크다운 파일을 검사하여 GitHub 링크가 있는 프로젝트 찾기
    for (const file of markdownFiles) {
      const filePath = path.join(CONTENT_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const githubLink = extractGitHubLink(content);
      const projectName = extractProjectName(content);
      
      if (githubLink) {
        const repoInfo = extractRepoInfo(githubLink);
        if (repoInfo) {
          projects.push({
            name: projectName || file.replace('.md', ''),
            file: file,
            githubUrl: githubLink,
            owner: repoInfo.owner,
            repo: repoInfo.repo
          });
        }
      }
    }

    console.log(`📂 Found ${projects.length} projects with GitHub links\n`);

    if (projects.length === 0) {
      console.log('No projects with GitHub links found.');
      return;
    }

    // GitHub API를 사용하여 star 수 조회
    const results = [];
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      
      try {
        console.log(`[${i + 1}/${projects.length}] Fetching stars for ${project.name}...`);
        
        const repoData = await makeGitHubRequest(`/repos/${project.owner}/${project.repo}`);
        
        const result = {
          name: project.name,
          file: project.file,
          githubUrl: project.githubUrl,
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          language: repoData.language,
          lastUpdated: repoData.updated_at
        };
        
        results.push(result);
        
        console.log(`   ⭐ ${result.stars.toLocaleString()} stars`);
        
        // API 율량 제한을 피하기 위한 딜레이 (필요시)
        if (i < projects.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
      } catch (error) {
        console.error(`   ❌ Error fetching data for ${project.name}: ${error.message}`);
        
        results.push({
          name: project.name,
          file: project.file,
          githubUrl: project.githubUrl,
          stars: 'Error',
          error: error.message
        });
      }
    }

    // 결과 출력
    console.log('\n' + '='.repeat(80));
    console.log('📊 GITHUB STARS SUMMARY');
    console.log('='.repeat(80));
    
    // star 수로 정렬
    const sortedResults = results
      .filter(r => typeof r.stars === 'number')
      .sort((a, b) => b.stars - a.stars);
    
    const errorResults = results.filter(r => typeof r.stars !== 'number');
    
    // 성공한 결과들 출력
    sortedResults.forEach((result, index) => {
      const rank = `${index + 1}`.padStart(3);
      const stars = result.stars.toLocaleString().padStart(8);
      const forks = result.forks ? result.forks.toLocaleString().padStart(6) : '     -';
      const language = (result.language || 'Unknown').padEnd(12);
      
      console.log(`${rank}. ⭐ ${stars} 🍴 ${forks} [${language}] ${result.name}`);
      console.log(`     ${result.githubUrl}`);
      console.log('');
    });
    
    // 에러가 발생한 결과들 출력
    if (errorResults.length > 0) {
      console.log('❌ ERRORS:');
      errorResults.forEach(result => {
        console.log(`   ${result.name}: ${result.error}`);
      });
      console.log('');
    }
    
    // 통계 정보
    const totalStars = sortedResults.reduce((sum, r) => sum + r.stars, 0);
    const avgStars = sortedResults.length > 0 ? Math.round(totalStars / sortedResults.length) : 0;
    
    console.log('📈 STATISTICS:');
    console.log(`   Total projects: ${results.length}`);
    console.log(`   Successful queries: ${sortedResults.length}`);
    console.log(`   Failed queries: ${errorResults.length}`);
    console.log(`   Total stars: ${totalStars.toLocaleString()}`);
    console.log(`   Average stars: ${avgStars.toLocaleString()}`);
    
    if (sortedResults.length > 0) {
      console.log(`   Most starred: ${sortedResults[0].name} (${sortedResults[0].stars.toLocaleString()} ⭐)`);
    }
    
    // JSON 파일로 저장
    const outputFile = path.join(__dirname, './shared/data/github-stars-report.json');
    const reportData = {
      generatedAt: new Date().toISOString(),
      totalProjects: results.length,
      successfulQueries: sortedResults.length,
      failedQueries: errorResults.length,
      totalStars,
      averageStars: avgStars,
      projects: results
    };
    
    fs.writeFileSync(outputFile, JSON.stringify(reportData, null, 2));
    console.log(`\n💾 Report saved to: ${outputFile}`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}