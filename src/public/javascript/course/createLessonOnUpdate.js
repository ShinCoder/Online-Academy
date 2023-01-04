tinymce.init({
    selector: '#lessonDescription',
    menubar: false,
    toolbar: 'undo redo | styles | bold italic numlist bullist',
    plugins: 'lists',
    statusbar: false,
    height: '300px',
    placeholder: "Please type in a short description for this lesson"
});

const addVideoToLessonBtn = document.getElementById("addVideoToLessonBtn");
const lessonVideoInputRef = document.getElementById("uploadLessonVideo");

addVideoToLessonBtn.addEventListener("click", () => {
    lessonVideoInputRef.click();
})

const videoWrapper = document.getElementById("videoWrapper");

lessonVideoInputRef.addEventListener("change", () => {
    if (lessonVideoInputRef.files && lessonVideoInputRef.files.length) {
        const imageReader = new FileReader();
        imageReader.onload = async (e) => {
            const oldVideo = document.getElementById("videoSource");
            if (oldVideo) {
                oldVideo.remove();
            }

            const videoCreate = document.createElement('video');
            videoCreate.setAttribute('class', 'video-js vjs-default-skin lessonVideo')
            videoCreate.setAttribute('controls', true)
            videoCreate.setAttribute('preload', 'auto')
            videoCreate.setAttribute('id', 'videoSource')

            const sourceCreate = document.createElement('source');
            sourceCreate.setAttribute('type', 'video/mp4');
            sourceCreate.setAttribute('id', 'video1source');
            sourceCreate.setAttribute('src', e.target.result);

            videoCreate.appendChild(sourceCreate);
            videoWrapper.appendChild(videoCreate);
        }
        imageReader.readAsDataURL(lessonVideoInputRef.files[0])
    }
})

const lessonForm = document.getElementById('lessonForm');

lessonForm.addEventListener('submit', (event) => {
    let check = true;

    const lessonTitle = document.getElementById("lessonTitle");
    const lessonDescription = tinymce.get("lessonDescription").getContent()

    const lessonNameInputError = document.getElementById('lessonNameInputError');
    const lessonDescriptionError = document.getElementById('lessonDescriptionError');
    const lessonVideoError = document.getElementById('lessonVideoError');

    if (!lessonTitle.value) {
        check = false;
        lessonNameInputError.classList.remove('d-none');
    }
    if (!lessonDescription) {
        check = false;
        lessonDescriptionError.classList.remove('d-none');
    }
    if (!lessonVideoInputRef.files || !lessonVideoInputRef.files.length) {
        check = false;
        lessonVideoError.classList.remove('d-none');
    }


    if (!check) {
        event.preventDefault();
    }


})