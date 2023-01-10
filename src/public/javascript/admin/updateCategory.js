const nameInput = document.getElementById("name");
const uploadImageOverlay = document.querySelector(".course-image-wrapper-overlay");
const uploadCourseBannerInput = document.querySelector("#uploadCourseBannerInput");

const nameValidateError = document.getElementById("nameValidateError");
const imageValidateError = document.getElementById("imageBannerInputError");

const mainForm = document.getElementById("mainForm");

mainForm.addEventListener("submit", (event) => {
    let check = true;

    if (!nameInput.value) {
        nameValidateError.innerText = "Please type in category name";
        check = false;
    }
    
    if (!check) {
        event.preventDefault();
    }

})

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