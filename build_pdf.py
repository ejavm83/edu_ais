#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AIS 교육자료집 PDF 생성 스크립트
마크다운 파일들을 읽어서 하나의 HTML로 통합하고 PDF로 변환
"""

import os
import re
import markdown
from pathlib import Path

def read_markdown_file(file_path):
    """마크다운 파일을 읽어서 내용 반환"""
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
        'markdown.extensions.codehilite'
    ]
    
    md = markdown.Markdown(extensions=extensions)
    html = md.convert(md_content)
    
    return html

def create_section_html(section_id, title, subtitle, content_html):
    """섹션 HTML 생성"""
    return f'''
        <div id="{section_id}" class="content-section">
            <div class="section-header">
                <h2>{title}</h2>
                <p class="section-subtitle">{subtitle}</p>
            </div>
            <div class="content">
                {content_html}
            </div>
        </div>
    '''

def build_complete_html():
    """완전한 HTML 문서 생성"""
    
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
    with open("AIS 교육자료집 통합본.html", 'r', encoding='utf-8') as f:
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
    # "<!-- 여기에 각 섹션의 내용이 추가됩니다 -->" 부분을 찾아서 교체
    placeholder = "<!-- 여기에 각 섹션의 내용이 추가됩니다 -->\n        <!-- 실제 구현에서는 각 마크다운 파일의 내용을 읽어와서 HTML로 변환하여 삽입합니다 -->"
    final_html = html_template.replace(placeholder, sections_html)
    
    # 완성된 HTML 파일 저장
    with open("AIS 교육자료집 완성본.html", 'w', encoding='utf-8') as f:
        f.write(final_html)
    
    print("✅ HTML 파일 생성 완료: AIS 교육자료집 완성본.html")
    return "AIS 교육자료집 완성본.html"

def convert_to_pdf(html_file):
    """HTML을 PDF로 변환 (wkhtmltopdf 사용)"""
    try:
        import subprocess
        
        pdf_file = "AIS 교육자료집.pdf"
        
        # wkhtmltopdf 명령어 실행
        cmd = [
            "wkhtmltopdf",
            "--page-size", "A4",
            "--margin-top", "20mm",
            "--margin-right", "15mm",
            "--margin-bottom", "20mm",
            "--margin-left", "15mm",
            "--encoding", "UTF-8",
            "--enable-local-file-access",
            "--print-media-type",
            "--javascript-delay", "1000",
            html_file,
            pdf_file
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"✅ PDF 파일 생성 완료: {pdf_file}")
            return pdf_file
        else:
            print(f"❌ PDF 변환 오류: {result.stderr}")
            return None
            
    except FileNotFoundError:
        print("❌ wkhtmltopdf가 설치되지 않았습니다.")
        print("설치 방법:")
        print("1. https://wkhtmltopdf.org/downloads.html 에서 다운로드")
        print("2. 또는 pip install wkhtmltopdf")
        return None
    except Exception as e:
        print(f"❌ PDF 변환 중 오류 발생: {e}")
        return None

def main():
    """메인 함수"""
    print("🚀 AIS 교육자료집 PDF 생성 시작...")
    
    # 현재 디렉토리 확인
    current_dir = os.getcwd()
    print(f"작업 디렉토리: {current_dir}")
    
    # HTML 생성
    html_file = build_complete_html()
    
    if html_file:
        print(f"📄 HTML 파일 생성 완료: {html_file}")
        
        # PDF 변환 시도
        pdf_file = convert_to_pdf(html_file)
        
        if pdf_file:
            print(f"📚 PDF 파일 생성 완료: {pdf_file}")
            print("\n🎉 AIS 교육자료집 생성 완료!")
            print(f"📁 파일 위치: {os.path.abspath(pdf_file)}")
        else:
            print("\n⚠️ PDF 변환 실패. HTML 파일을 브라우저에서 열어서 수동으로 PDF로 저장하세요.")
            print(f"📁 HTML 파일: {os.path.abspath(html_file)}")
    else:
        print("❌ HTML 생성 실패")

if __name__ == "__main__":
    main()
