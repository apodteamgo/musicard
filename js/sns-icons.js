document.querySelectorAll('.notion-callout').forEach((callout) => {
  // 텍스트 컨텐츠에 포함된 링크 찾기
  const linkElement = callout.querySelector('.notion-callout__content a');
  const iconElement = callout.querySelector('.notion-callout__icon img');

  if (linkElement && iconElement) {
    // 아이콘 클릭 시 해당 링크로 이동
    iconElement.addEventListener('click', (event) => {
      event.preventDefault(); // 기본 동작 차단 (상위 클릭 이벤트 방지)
      window.open(linkElement.href, '_blank'); // 새 탭에서 링크 열기
    });

    // 아이콘에 커서 스타일 설정
    iconElement.style.cursor = 'pointer';
  }
});
