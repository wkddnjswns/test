const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const clearBtn = document.getElementById("clear-btn");
const saveBtn = document.getElementById("save-btn");

// 저장된 데이터 불러오기
function loadNote() {
    const savedText = localStorage.getItem("note") || "";
    editor.value = savedText;
    preview.innerHTML = marked.parse(savedText);
}

// 입력할 때마다 저장 & 미리보기 업데이트
function updatePreview() {
    const text = editor.value;
    localStorage.setItem("note", text);
    preview.innerHTML = marked.parse(text);
}

// 초기화 버튼
clearBtn.addEventListener("click", () => {
    editor.value = "";
    preview.innerHTML = "";
    localStorage.removeItem("note");
});

// GitHub README.md 저장 기능
async function updateReadme() {
    const repoOwner = "wkddnjswns";  // 내 GitHub 아이디
    const repoName = "test";  // 내 레포지토리 이름
    const filePath = "README.md";  // 수정할 파일
    const token = "ghp_xxxxxxx";  // GitHub Personal Access Token (보안상 서버에서 처리해야 함)

    const content = editor.value;
    const encodedContent = btoa(unescape(encodeURIComponent(content))); // Base64 인코딩

    // 현재 파일 정보 가져오기 (SHA 값 필요)
    const fileUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
    const response = await fetch(fileUrl, {
        headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json"
        }
    });
    const fileData = await response.json();
    const sha = fileData.sha;

    // GitHub API를 통해 README.md 업데이트
    await fetch(fileUrl, {
        method: "PUT",
        headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Update README.md from Markdown Editor",
            content: encodedContent,
            sha: sha
        })
    });

    alert("README.md가 업데이트되었습니다!");
}

// 저장 버튼 클릭 이벤트
saveBtn.addEventListener("click", updateReadme);

// 초기 데이터 로드
loadNote();
editor.addEventListener("input", updatePreview);
