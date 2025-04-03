const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

// 입력할 때마다 Markdown을 HTML로 변환하여 미리보기 표시
editor.addEventListener("input", () => {
    preview.innerHTML = marked(editor.value);
});

// 새로고침해도 입력 내용 유지 (localStorage 활용)
editor.value = localStorage.getItem("markdown") || "";
preview.innerHTML = marked(editor.value);

editor.addEventListener("input", () => {
    localStorage.setItem("markdown", editor.value);
});
