document.addEventListener("DOMContentLoaded", function () {
    const editor = document.getElementById("editor");
    const preview = document.getElementById("preview");
    const clearBtn = document.getElementById("clear-btn");

    // 저장된 내용 불러오기
    function loadNote() {
        const savedText = localStorage.getItem("note") || "";
        editor.value = savedText;
        preview.innerHTML = marked.parse(savedText);
    }

    // 입력 시 자동 저장 및 미리보기 업데이트
    function updatePreview() {
        const text = editor.value;
        localStorage.setItem("note", text);
        preview.innerHTML = marked.parse(text);
    }

    // 초기화 버튼 기능 (내용 삭제 + 저장된 데이터 제거)
    clearBtn.addEventListener("click", function () {
        editor.value = "";
        preview.innerHTML = "";
        localStorage.removeItem("note");
    });

    // 이벤트 리스너 등록
    editor.addEventListener("input", updatePreview);

    // 페이지 로드 시 실행
    loadNote();
});
