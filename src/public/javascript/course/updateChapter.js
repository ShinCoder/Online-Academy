const chapterForm = document.getElementById('chapterForm');

chapterForm.addEventListener('submit', (event) => {
  let check = true;

  const chapterTitle = document.getElementById('chapterTitle');
  const chapterTitleError = document.getElementById('chapterTitleError');

  if (!chapterTitle.value) {
    check = false;
    chapterTitleError.classList.remove('d-none');
  }

  if (!check) {
    event.preventDefault();
  }
});
