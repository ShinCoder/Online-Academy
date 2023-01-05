const uploadImageOverlay = document.querySelector(".course-image-wrapper-overlay");
const uploadProfileAvatarInput = document.querySelector("#uploadProfileAvatarInput");

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
    uploadProfileAvatarInput.click();
})

uploadProfileAvatarInput.addEventListener("change", () => {
    if (uploadProfileAvatarInput.files && uploadProfileAvatarInput.files.length) {
        const imageReader = new FileReader();
        imageReader.onload = async (event) => {
            document.getElementById('image-preview').setAttribute('src', event.target.result)
        }
        imageReader.readAsDataURL(uploadProfileAvatarInput.files[0])
    }
})

const courseDetailChapter = document.querySelector('#courseDetailChapter');

const mainForm = document.querySelector("#mainCreateCourseForm");
mainForm.addEventListener('submit', async (event) => {
    let check = true;

    const profileFirstName = document.querySelector('#profileFirstName');
    const profileLastName = document.querySelector('#profileLastName');

    const profileFirstNameError = document.querySelector("#profileFirstNameError");
    const profileLastNameError = document.querySelector("#profileLastNameError");
    const imageBannerInputError = document.querySelector("#imageBannerInputError");
    const profileShortDescriptionError = document.querySelector("#profileShortDescriptionError");


    if (!profileFirstName?.value) {
        profileFirstNameError.classList.remove("d-none");
        check = false;
    }
    if (!profileLastName?.value) {
        profileLastNameError.classList.remove("d-none");
        check = false;
    }
    if (!uploadProfileAvatarInput.files[0]) {
        imageBannerInputError.classList.remove("d-none");
        check = false;
    }
    if (!tinymce.get("shortDescription").getContent()) {
        profileShortDescriptionError.classList.remove("d-none");
        check = false;
    }

    if (!check) {
        event.preventDefault();
    }
})