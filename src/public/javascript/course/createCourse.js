const uploadImageOverlay = document.querySelector(".course-image-wrapper-overlay");
const uploadCourseBannerInput = document.querySelector("#uploadCourseBannerInput");

tinymce.init({
    selector: '#shortDescription',
    menubar: false,
    toolbar: 'undo redo | styles | bold italic numlist bullist',
    plugins: 'lists',
    statusbar: false,
    height: '300px',
    placeholder: "Please fill in a short description for this course"
});

uploadImageOverlay.addEventListener("click", () => {
    uploadCourseBannerInput.click();
})

uploadCourseBannerInput.addEventListener("change", () => {
    if (uploadCourseBannerInput.files && uploadCourseBannerInput.files.length) {
        const imageReader = new FileReader();
        imageReader.onload = async (event) => {
            document.getElementById('image-preview').setAttribute('src', event.target.result)
        }
        imageReader.readAsDataURL(uploadCourseBannerInput.files[0])
    }
})

const addChapterBtn = document.querySelector('#addChapterBtn');
const courseDetailChapter = document.querySelector('#courseDetailChapter');
let chapters = [];

addChapterBtn.addEventListener("click", () => {
    const currentChapterLength = chapters.length + 1;

    const newChapterTitleOrder = document.createElement('h3');
    newChapterTitleOrder.innerHTML = `<i class="fa fa-book" aria-hidden="true"></i> Chapter ${currentChapterLength}: `;

    const newChapterTitle = document.createElement('input');
    newChapterTitle.setAttribute('placeholder', `Please fill in name of the chapter ${currentChapterLength}`);
    newChapterTitle.setAttribute('type', 'text');
    newChapterTitle.setAttribute('id', `newChapterTitle-${currentChapterLength}`);
    newChapterTitle.setAttribute('class', 'form-control newChapterTitle');

    const nameChapterError = document.createElement('p');
    nameChapterError.setAttribute('id', `nameChapterError${currentChapterLength}`);
    nameChapterError.setAttribute('class', `nameChapterError d-none`);
    nameChapterError.innerText = "Please fill in chapter's name !";

    const newChapterTitleWrapper = document.createElement('div');
    newChapterTitleWrapper.appendChild(newChapterTitleOrder);
    newChapterTitleWrapper.appendChild(newChapterTitle);
    newChapterTitleWrapper.appendChild(nameChapterError);
    newChapterTitleWrapper.setAttribute('class', 'newChapterTitleWrapper')

    const newChapterWrapper = document.createElement('div');
    newChapterWrapper.setAttribute('class', 'chapterWrapper');

    const newLessonInChapterBtn = document.createElement('button');
    newLessonInChapterBtn.setAttribute('class', 'btn btn-success');
    newLessonInChapterBtn.setAttribute('type', 'button')
    newLessonInChapterBtn.innerHTML = `<i class="fa fa-plus-circle" aria-hidden="true"></i> Add lesson for Chapter ${currentChapterLength}`;

    newLessonInChapterBtn.addEventListener('click', () => {
        const lessonLength = chapters[currentChapterLength - 1]?.lessons?.length;
        if (lessonLength >= 0) {
            chapters[currentChapterLength - 1].lessons.push({
                titleId: `chapter-${currentChapterLength}-lessonTitle-${lessonLength + 1}`,
                descriptionId: `chapter-${currentChapterLength}-lessonDescription-${lessonLength + 1}`,
                videoUrlId: `chapter-${currentChapterLength}-videoUrl-${lessonLength + 1}`
            });

            const lessonWrapper = document.createElement('div');
            lessonWrapper.setAttribute('class', 'lessonWrapper');

            const lessonTitleWording = document.createElement('h3');
            lessonTitleWording.innerHTML = `<i class="fa fa-circle" aria-hidden="true"></i> Lesson ${lessonLength + 1}: `;

            const lessonTitleInput = document.createElement('input');
            lessonTitleInput.setAttribute('placeholder', `Please fill in name of lesson ${lessonLength + 1} of Chapter ${currentChapterLength}`);
            lessonTitleInput.setAttribute('type', 'text');
            lessonTitleInput.setAttribute('id', `chapter-${currentChapterLength}-lessonTitle-${lessonLength + 1}`);
            lessonTitleInput.setAttribute('class', 'form-control');

            const lessonTitleWrapper = document.createElement('div');
            lessonTitleWrapper.setAttribute('class', 'lessonTitleWrapper');
            lessonTitleWrapper.appendChild(lessonTitleWording);
            lessonTitleWrapper.appendChild(lessonTitleInput);

            const lessonVideoUrlWording = document.createElement('p');
            lessonVideoUrlWording.setAttribute('class', 'lessonVideoUrlWording');
            lessonVideoUrlWording.innerText = "Video URL: ";

            const lessonVideoUrl = document.createElement('input');
            lessonVideoUrl.setAttribute('placeholder', 'Please fill in video url of this lesson');
            lessonVideoUrl.setAttribute('type', 'text');
            lessonVideoUrl.setAttribute('id', `chapter-${currentChapterLength}-videoUrl-${lessonLength + 1}`);
            lessonVideoUrl.setAttribute('class', 'form-control');

            const lessonVideoUrlWrapper = document.createElement('div');
            lessonVideoUrlWrapper.setAttribute('class', 'lessonVideoUrlWrapper');
            lessonVideoUrlWrapper.appendChild(lessonVideoUrlWording);
            lessonVideoUrlWrapper.appendChild(lessonVideoUrl);

            const lessonDescriptionWording = document.createElement('p');
            lessonDescriptionWording.innerText = "Description: ";
            lessonDescriptionWording.setAttribute('class', 'lessonDescriptionWording');

            const lessonDescriptionTextArea = document.createElement('textarea');
            lessonDescriptionTextArea.setAttribute('id', `chapter-${currentChapterLength}-lessonDescription-${lessonLength + 1}`);

            const lessonDescriptionWrapper = document.createElement('div');
            lessonDescriptionWrapper.setAttribute('class', 'lessonDescriptionWrapper');
            lessonDescriptionWrapper.appendChild(lessonDescriptionWording);
            lessonDescriptionWrapper.appendChild(lessonDescriptionTextArea);

            const addVideoToLessonBtn = document.createElement('button');
            addVideoToLessonBtn.setAttribute('class', 'btn btn-info addVideoToLessonBtn');
            addVideoToLessonBtn.innerHTML = `<i class="fa fa-plus-square" aria-hidden="true"></i> Upload lesson video`;
            addVideoToLessonBtn.setAttribute('type', 'button');

            const lessonVideoInputRef = document.createElement('input');
            lessonVideoInputRef.setAttribute('class', 'uploadLessonVideo');
            lessonVideoInputRef.setAttribute('id', `chapter-${currentChapterLength}-lessonVideoInputRef-${lessonLength + 1}`);
            lessonVideoInputRef.setAttribute('type', 'file');
            lessonVideoInputRef.setAttribute('accept', "video/mp4");
            lessonVideoInputRef.setAttribute('name', `chapter-${currentChapterLength}-lessonVideo-${lessonLength + 1}`);


            addVideoToLessonBtn.addEventListener("click", () => {
                lessonVideoInputRef.click();
            })

            const lessonVideoWrapper = document.createElement('div');
            lessonVideoWrapper.setAttribute('class', 'lessonVideoUrlWrapper');
            lessonVideoWrapper.setAttribute('id', `chapter-${currentChapterLength}-lessonVideoWrapper-${lessonLength + 1}`);
        
            
            lessonVideoWrapper.appendChild(addVideoToLessonBtn);
            lessonVideoWrapper.appendChild(lessonVideoInputRef);

            
            lessonVideoInputRef.addEventListener("change", () => {
                if (lessonVideoInputRef.files && lessonVideoInputRef.files.length) {
                    const imageReader = new FileReader();
                    imageReader.onload = async (e) => {
                        const videoCreate = document.createElement('video');
                        videoCreate.setAttribute('class', 'video-js vjs-default-skin lessonVideo')
                        videoCreate.setAttribute('controls', true)
                        videoCreate.setAttribute('preload', 'auto')
                        videoCreate.setAttribute('id', 'lesson1')
            
                        const sourceCreate = document.createElement('source');
                        sourceCreate.setAttribute('type', 'video/mp4');
                        sourceCreate.setAttribute('id', 'video1source');
                        sourceCreate.setAttribute('src', e.target.result);
            
                        videoCreate.appendChild(sourceCreate);
                        lessonVideoWrapper.appendChild(videoCreate);
                    }
                    imageReader.readAsDataURL(lessonVideoInputRef.files[0])
                }
            })

            lessonWrapper.appendChild(lessonTitleWrapper);
            lessonWrapper.appendChild(lessonVideoUrlWrapper);
            lessonWrapper.appendChild(lessonDescriptionWrapper);
            lessonWrapper.appendChild(lessonVideoWrapper);

            newChapterTitleWrapper.parentNode.insertBefore(lessonWrapper, newLessonInChapterBtn);

            tinymce.init({
                selector: `#chapter-${currentChapterLength}-lessonDescription-${lessonLength + 1}`,
                menubar: false,
                toolbar: 'undo redo | styles | bold italic numlist bullist',
                plugins: 'lists',
                statusbar: false,
                height: '300px',
                placeholder: `Please fill in description for Lesson ${lessonLength + 1} of Chapter ${currentChapterLength}`
            });
        }
    })

    newChapterWrapper.appendChild(newChapterTitleWrapper);
    newChapterWrapper.appendChild(newLessonInChapterBtn);

    courseDetailChapter.appendChild(newChapterWrapper);

    chapters = [...chapters, {
        id: currentChapterLength,
        titleId: `newChapterTitle-${currentChapterLength}`,
        lessons: []
    }]
})

const mainForm = document.querySelector("#mainCreateCourseForm");
mainForm.addEventListener('submit', async (event) => {
    let check = true;

    const courseTitle = document.querySelector('#courseTitle');
    const courseCategory = document.querySelector('#courseCategory');

    const courseNameInputError = document.querySelector("#courseNameInputError");
    const imageBannerInputError = document.querySelector("#imageBannerInputError");
    const courseCategoryInputError = document.querySelector("#courseCategoryInputError");
    const courseDescriptionError = document.querySelector("#courseDescriptionError");
    const chapterError = document.querySelector("#chapterError");

    const data = {
        courseTitle: courseTitle?.value,
        uploadCourseBannerInput: uploadCourseBannerInput.files[0],
        courseCategory: courseCategory.value,
        courseDescriptionValue: tinymce.get("shortDescription").getContent(),
        chapters: chapters?.length > 0 ?
            [...chapters].map((item) => {
                const newLesson = [...item.lessons].map((lesson) => {
                    return ({
                        title: document.querySelector(`#${lesson.titleId}`).value,
                        videoUrl: document.querySelector(`#${lesson.videoUrlId}`).value,
                        description: tinymce.get(`${lesson.descriptionId}`).getContent() || null,
                    })
                })
                return ({
                    ...item,
                    title: document.querySelector(`#${item?.titleId}`).value,
                    lessons: [...newLesson]
                })
            })
            : []
    }

    if (!data?.courseTitle) {
        courseNameInputError.classList.remove("d-none");
        check = false;
    }
    if (!data?.uploadCourseBannerInput) {
        imageBannerInputError.classList.remove("d-none");
        check = false;
    }
    if (!data?.courseCategory) {
        courseCategoryInputError.classList.remove("d-none");
        check = false;
    }
    if (!data?.courseDescriptionValue) {
        courseDescriptionError.classList.remove("d-none");
        check = false;
    }
    if (!data?.chapters?.length) {
        chapterError.classList.remove("d-none");
        check = false;
    }
    else {
        data?.chapters.forEach((item) => {
            if (!document.querySelector(`#${item?.titleId}`)) {
                document.getElementById(`nameChapterError${item?.id}`).classList.remove("d-none");
                check = false;
            }
        })
    }

    mainForm.elements["allChapter"].value = JSON.stringify([...data?.chapters]);
   
    const allLessonVideoRef = document.querySelectorAll('.uploadLessonVideo');
    
    mainForm.elements["allVideo"].value = JSON.stringify(Array.from(allLessonVideoRef).map((item) => (
        item.getAttribute("name")
    )))

    console.log("main ", mainForm.elements["allVideo"].value)
    
    if (!check) {
        event.preventDefault();
    }
})