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

tinymce.init({
    selector: '#detailDescription',
    menubar: false,
    toolbar: 'undo redo | styles | bold italic numlist bullist',
    plugins: 'lists',
    statusbar: false,
    height: '500px',
    placeholder: "Please fill in a short description for this course"
});

tinymce.init({
    selector: '#syllabusDescription',
    menubar: false,
    toolbar: 'undo redo | styles | bold italic numlist bullist',
    plugins: 'lists',
    statusbar: false,
    height: '500px',
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
    const coursePrice = document.querySelector('#coursePrice');

    const courseNameInputError = document.querySelector("#courseNameInputError");
    const courseShortDescriptionError = document.querySelector("#courseShortDescriptionError");
    const courseDetailDescriptionError = document.querySelector("#courseDetailDescriptionError");
    const syllabusDescriptionError = document.querySelector("#syllabusDescriptionError");
    const coursePriceError = document.querySelector("#coursePriceError");

    const data = {
        courseTitle: courseTitle?.value,
        courseCategory: courseCategory?.value,
        courseShortDescription: tinymce.get("shortDescription").getContent(),
        courseDetailDescription: tinymce.get("detailDescription").getContent(),
        syllabusDescription: tinymce.get("syllabusDescription").getContent(),
        price: coursePrice?.value
    }

    if (!data?.courseTitle) {
        courseNameInputError.classList.remove("d-none");
        check = false;
    }
    if (!data?.courseShortDescription) {
        courseShortDescriptionError.classList.remove("d-none");
        check = false;
    }
    if (!data?.courseDetailDescription) {
        courseDetailDescriptionError.classList.remove("d-none");
        check = false;
    }
    if (!data?.syllabusDescription) {
        syllabusDescriptionError.classList.remove("d-none");
        check = false;
    }
    if (!data?.price) {
        coursePriceError.classList.remove("d-none");
        check = false;
    }
    else if (isNaN(data?.price)) {
        coursePriceError.innerText = "Price must be number !";
        coursePriceError.classList.remove("d-none");
        check = false;
    }

    if (!check) {
        event.preventDefault();
    }
})