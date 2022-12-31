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

const courseDetailChapter = document.querySelector('#courseDetailChapter');

const mainForm = document.querySelector("#mainCreateCourseForm");
mainForm.addEventListener('submit', async (event) => {
    let check = true;

    const courseTitle = document.querySelector('#courseTitle');
    const courseCategory = document.querySelector('#courseCategory');

    const courseNameInputError = document.querySelector("#courseNameInputError");
    const imageBannerInputError = document.querySelector("#imageBannerInputError");
    const courseCategoryInputError = document.querySelector("#courseCategoryInputError");
    const courseDescriptionError = document.querySelector("#courseDescriptionError");

    const data = {
        courseTitle: courseTitle?.value,
        uploadCourseBannerInput: uploadCourseBannerInput.files[0],
        courseCategory: courseCategory.value,
        courseDescriptionValue: tinymce.get("shortDescription").getContent()
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
    
    if (!check) {
        event.preventDefault();
    }
})