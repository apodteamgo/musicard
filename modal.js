const cards = document.querySelectorAll(".notion-collection-card.gallery");
const modal = document.getElementById("modal");
const iframe = document.getElementById("modal-iframe");
const closeBtn = document.querySelector(".close-btn");

// 카드 클릭 이벤트
cards.forEach(card => {
    card.addEventListener("click", (event) => {
        event.preventDefault(); // 기본 동작 방지

        // 카드 내부 <a> 태그에서 href 가져오기
        const link = card.querySelector("a");
        let url = link ? link.getAttribute("href") : "";

        if (url) {
            // 상대 경로를 절대 경로로 변환
            if (!url.startsWith("http")) {
                url = window.location.origin + url;
            }

            // iframe에 URL 설정
            iframe.src = url;

            // 모달 표시
            modal.style.display = "flex";
        } else {
            console.error("URL not found for this card.");
        }
    });
});

// 닫기 버튼 이벤트
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    iframe.src = ""; // iframe 초기화 (안전)
});

// 모달 배경 클릭 시 닫기
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        iframe.src = ""; // iframe 초기화 (안전)
    }
});
