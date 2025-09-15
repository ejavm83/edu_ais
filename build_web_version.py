#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AIS 교육자료집 웹 버전 생성 스크립트
마크다운 파일들을 읽어서 웹 친화적인 HTML로 변환
"""

import os
import re
import markdown
from pathlib import Path

def read_markdown_file(file_path):
    """마크다운 파일 읽기"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return content
    except Exception as e:
        print(f"파일 읽기 오류 {file_path}: {e}")
        return ""

def clean_markdown_content(content):
    """마크다운 내용 정리"""
    # YAML front matter 제거
    content = re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)
    
    # 네비게이션 링크 제거
    content = re.sub(r'> \*\*📚 학습자료 메인 인덱스\*\*:.*?\n', '', content)
    content = re.sub(r'> \*\*📖 이전 노트\*\*:.*?\n', '', content)
    content = re.sub(r'> \*\*📖 다음 노트\*\*:.*?\n', '', content)
    
    # 빈 줄 정리
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    return content.strip()

def markdown_to_html(md_content):
    """마크다운을 HTML로 변환"""
    # 마크다운 확장 설정
    extensions = [
        'markdown.extensions.tables',
        'markdown.extensions.fenced_code',
        'markdown.extensions.toc',
        'markdown.extensions.codehilite',
        'markdown.extensions.extra'
    ]
    
    md = markdown.Markdown(extensions=extensions)
    html = md.convert(md_content)
    
    return html

def create_section_html(section_id, title, subtitle, content_html):
    """섹션 HTML 생성"""
    return f'''
                <div id="{section_id}" class="section">
                    <div class="section-header">
                        <h2>{title}</h2>
                        <p class="subtitle">{subtitle}</p>
                    </div>
                    <div class="content">
                        {content_html}
                    </div>
                </div>
    '''

def build_web_version():
    """웹 버전 HTML 생성"""
    
    # 파일 매핑 (섹션 ID, 제목, 부제목, 파일명)
    sections = [
        ("section-1-1", "1.1 AIS 개요 및 기본 개념", "AIS-ASM의 개념과 주요 메시지 유형", "AIS 교육자료 - 1.1 AIS 개요 및 기본 개념.md"),
        ("section-1-2", "1.2 AIS 시스템 구성 요소", "하드웨어 및 소프트웨어 구성 요소", "AIS 교육자료 - 1.2 AIS 시스템 구성 요소.md"),
        ("section-1-3", "1.3 AIS 작동 원리 및 통신 방식", "TDMA 통신 방식과 작동 원리", "AIS 교육자료 - 1.3 AIS 작동 원리 및 통신 방식.md"),
        ("section-1-4", "1.4 AIS 메시지 유형 및 데이터 구조", "메시지 유형과 데이터 구조", "AIS 교육자료 - 1.4 AIS 메시지 유형 및 데이터 구조.md"),
        ("section-2-1", "2.1 국제 규정 및 표준", "IMO, ITU, IALA, IEC 표준", "AIS 교육자료 - 2.1 국제 규정 및 표준.md"),
        ("section-2-2", "2.2 국내 규정 및 법령", "국내 AIS 관련 법령", "AIS 교육자료 - 2.2 국내 규정 및 법령.md"),
        ("section-2-3", "2.3 AIS 설치 의무 대상", "설치 의무 대상 선박", "AIS 교육자료 - 2.3 AIS 설치 의무 대상.md"),
        ("section-3-1", "3.1 AIS 데이터 전처리", "데이터 전처리 방법", "AIS 교육자료 - 3.1 AIS 데이터 전처리.md"),
        ("section-3-2", "3.2 데이터 품질 관리", "데이터 품질 관리 방법", "AIS 교육자료 - 3.2 데이터 품질 관리.md"),
        ("section-3-3", "3.3 기계학습 및 AI 활용", "AI/ML을 활용한 데이터 분석", "AIS 교육자료 - 3.3 기계학습 및 AI 활용.md"),
        ("section-4-1", "4.1 해상 안전 및 보안", "해상 안전 시스템", "AIS 교육자료 - 4.1 해상 안전 및 보안.md"),
        ("section-4-2", "4.2 해상 교통 관제", "VTS 및 교통 관제", "AIS 교육자료 - 4.2 해상 교통 관제.md"),
        ("section-5-1", "5.1 퀴즈 및 연습문제", "학습 평가 문제", "AIS 교육자료 - 5.1 퀴즈 및 연습문제.md"),
        ("section-5-2", "5.2 핵심 용어 사전", "AIS 관련 용어 정리", "AIS 교육자료 - 5.2 핵심 용어 사전.md"),
        ("section-5-3", "5.3 참고 자료 및 링크", "추가 학습 자료", "AIS 교육자료 - 5.3 참고 자료 및 링크.md"),
    ]
    
    # 기본 HTML 템플릿 읽기
    with open("AIS 교육자료집 웹버전.html", 'r', encoding='utf-8') as f:
        html_template = f.read()
    
    # 섹션 내용 생성
    sections_html = ""
    
    for section_id, title, subtitle, filename in sections:
        print(f"처리 중: {filename}")
        
        # 마크다운 파일 읽기
        md_content = read_markdown_file(filename)
        if not md_content:
            continue
            
        # 마크다운 내용 정리
        clean_content = clean_markdown_content(md_content)
        
        # HTML로 변환
        content_html = markdown_to_html(clean_content)
        
        # 섹션 HTML 생성
        section_html = create_section_html(section_id, title, subtitle, content_html)
        sections_html += section_html + "\n"
    
    # HTML에 섹션 내용 삽입
    placeholder = "                <!-- 여기에 각 섹션의 내용이 추가됩니다 -->\n                <!-- 실제 구현에서는 각 마크다운 파일의 내용을 읽어와서 HTML로 변환하여 삽입합니다 -->"
    final_html = html_template.replace(placeholder, sections_html)
    
    # 완성된 HTML 파일 저장
    with open("AIS 교육자료집 완성 웹버전.html", 'w', encoding='utf-8') as f:
        f.write(final_html)
    
    print("✅ 웹 버전 HTML 파일 생성 완료: AIS 교육자료집 완성 웹버전.html")
    return "AIS 교육자료집 완성 웹버전.html"

def main():
    """메인 함수"""
    print("🚀 AIS 교육자료집 웹 버전 생성 시작...")
    
    # 현재 디렉토리 확인
    current_dir = os.getcwd()
    print(f"작업 디렉토리: {current_dir}")
    
    # 웹 버전 HTML 생성
    html_file = build_web_version()
    
    if html_file:
        print(f"📄 웹 버전 HTML 파일 생성 완료: {html_file}")
        print(f"\n🎉 AIS 교육자료집 웹 버전 생성 완료!")
        print(f"📁 파일 위치: {os.path.abspath(html_file)}")
        print(f"\n📖 사용 방법:")
        print(f"1. HTML 파일을 브라우저에서 열어서 확인하세요")
        print(f"2. 목차를 클릭하면 해당 섹션으로 이동합니다")
        print(f"3. 브라우저에서 Ctrl+P로 PDF로 저장할 수 있습니다")
        print(f"4. 웹 버전은 반응형 디자인으로 모바일에서도 잘 보입니다")
    else:
        print("❌ 웹 버전 HTML 생성 실패")

if __name__ == "__main__":
    main()
