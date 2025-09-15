#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HTML을 PDF로 변환하는 스크립트 (weasyprint 사용)
"""

import os
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

def convert_html_to_pdf(html_file, pdf_file):
    """HTML 파일을 PDF로 변환"""
    try:
        print(f"📄 HTML 파일 읽는 중: {html_file}")
        
        # HTML 파일 읽기
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # CSS 스타일 추가 (인쇄용)
        css_content = """
        @page {
            size: A4;
            margin: 20mm 15mm 20mm 15mm;
        }
        
        body {
            font-family: 'Malgun Gothic', '맑은 고딕', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .container {
            max-width: none;
            margin: 0;
            padding: 0;
            background: white;
            box-shadow: none;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #2c5aa0;
            padding-bottom: 20px;
            margin-bottom: 30px;
            page-break-after: avoid;
        }
        
        .header h1 {
            color: #2c5aa0;
            font-size: 2.2em;
            margin: 0;
        }
        
        .toc {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            page-break-after: always;
        }
        
        .toc h2 {
            color: #2c5aa0;
            border-bottom: 2px solid #2c5aa0;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        
        .toc-section {
            margin-bottom: 20px;
        }
        
        .toc-section h3 {
            color: #444;
            font-size: 1.2em;
            margin-bottom: 10px;
            padding-left: 10px;
            border-left: 4px solid #2c5aa0;
        }
        
        .toc-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .toc-list li {
            margin: 5px 0;
            padding: 5px 10px;
            background: white;
            border-radius: 3px;
            border-left: 2px solid #e9ecef;
        }
        
        .toc-list a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
        }
        
        .content-section {
            margin-bottom: 40px;
            page-break-before: always;
        }
        
        .content-section:first-of-type {
            page-break-before: avoid;
        }
        
        .section-header {
            background: linear-gradient(135deg, #2c5aa0, #4a90e2);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            margin-bottom: 25px;
            page-break-after: avoid;
        }
        
        .section-header h2 {
            margin: 0;
            font-size: 1.6em;
        }
        
        .section-header .section-subtitle {
            margin: 5px 0 0 0;
            opacity: 0.9;
            font-size: 1em;
        }
        
        .content {
            padding: 0 15px;
        }
        
        .learning-objectives {
            background: #e8f4fd;
            border: 1px solid #b3d9ff;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            page-break-inside: avoid;
        }
        
        .learning-objectives h3 {
            color: #2c5aa0;
            margin-top: 0;
            font-size: 1.2em;
        }
        
        .learning-guide {
            background: #f0f8ff;
            border: 1px solid #cce7ff;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            page-break-inside: avoid;
        }
        
        .learning-guide h3 {
            color: #2c5aa0;
            margin-top: 0;
            font-size: 1.2em;
        }
        
        .level-guide {
            margin: 10px 0;
            padding: 10px;
            background: white;
            border-radius: 5px;
            border-left: 3px solid #2c5aa0;
            page-break-inside: avoid;
        }
        
        .level-guide h4 {
            color: #2c5aa0;
            margin: 0 0 5px 0;
            font-size: 1.1em;
        }
        
        .checklist {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            page-break-inside: avoid;
        }
        
        .checklist h3 {
            color: #2c5aa0;
            margin-top: 0;
            font-size: 1.2em;
        }
        
        .checklist ul {
            margin: 10px 0;
        }
        
        .checklist li {
            margin: 3px 0;
            list-style: none;
        }
        
        .checklist li:before {
            content: "☐ ";
            color: #2c5aa0;
            font-weight: bold;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: #2c5aa0;
            page-break-after: avoid;
        }
        
        h1 {
            font-size: 1.8em;
        }
        
        h2 {
            font-size: 1.5em;
        }
        
        h3 {
            font-size: 1.3em;
        }
        
        h4 {
            font-size: 1.1em;
        }
        
        p {
            margin: 10px 0;
            text-align: justify;
        }
        
        ul, ol {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        li {
            margin: 5px 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            page-break-inside: avoid;
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        
        code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        
        pre {
            background-color: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
            page-break-inside: avoid;
        }
        
        blockquote {
            border-left: 4px solid #2c5aa0;
            margin: 15px 0;
            padding: 10px 20px;
            background-color: #f8f9fa;
        }
        
        .back-to-toc {
            display: none;
        }
        
        @media print {
            .toc {
                page-break-after: always;
            }
            
            .content-section {
                page-break-before: always;
            }
            
            .content-section:first-of-type {
                page-break-before: avoid;
            }
        }
        """
        
        print("📝 CSS 스타일 적용 중...")
        
        # HTML과 CSS를 결합하여 PDF 생성
        html_doc = HTML(string=html_content)
        css_doc = CSS(string=css_content)
        
        print("🔄 PDF 변환 중...")
        html_doc.write_pdf(pdf_file, stylesheets=[css_doc])
        
        print(f"✅ PDF 파일 생성 완료: {pdf_file}")
        return True
        
    except Exception as e:
        print(f"❌ PDF 변환 오류: {e}")
        return False

def main():
    """메인 함수"""
    html_file = "AIS 교육자료집 완성본.html"
    pdf_file = "AIS 교육자료집.pdf"
    
    if not os.path.exists(html_file):
        print(f"❌ HTML 파일을 찾을 수 없습니다: {html_file}")
        return
    
    print("🚀 HTML을 PDF로 변환 시작...")
    success = convert_html_to_pdf(html_file, pdf_file)
    
    if success:
        file_size = os.path.getsize(pdf_file) / (1024 * 1024)  # MB
        print(f"\n🎉 AIS 교육자료집 PDF 생성 완료!")
        print(f"📁 파일 위치: {os.path.abspath(pdf_file)}")
        print(f"📊 파일 크기: {file_size:.1f} MB")
        print(f"\n📖 사용 방법:")
        print(f"1. PDF 파일을 열어서 목차를 클릭하면 해당 페이지로 이동합니다")
        print(f"2. Ctrl+F로 특정 내용을 검색할 수 있습니다")
        print(f"3. 인쇄 시 페이지 나누기가 자동으로 적용됩니다")
    else:
        print("❌ PDF 생성 실패")

if __name__ == "__main__":
    main()
