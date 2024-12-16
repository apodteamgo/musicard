document.querySelectorAll('.notion-callout').forEach((callout) => {
  const linkElement = callout.querySelector('.notion-callout__content a'); // 링크 요소
  const iconElement = callout.querySelector('.notion-callout__icon img'); // 아이콘 요소

  if (linkElement && iconElement) {
    // 아이콘 클릭 이벤트 설정
    callout.querySelector('.notion-callout__icon').addEventListener('click', () => {
      window.open(linkElement.href, '_blank'); // 새 탭에서 링크 열기
    });

    // 커서 모양 변경
    iconElement.style.cursor = 'pointer';
  }
});

