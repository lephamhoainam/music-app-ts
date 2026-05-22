// preview image
const avatarInput = document.querySelector("#avatar");
const previewImage = document.querySelector("#previewImage");

if (avatarInput && previewImage) {
    avatarInput.addEventListener("change", function (e) {
        const file = e.target.files[0];

        if (file) {
            previewImage.src = URL.createObjectURL(file);
            previewImage.style.display = "block";
        } else {
            previewImage.src = "";
            previewImage.style.display = "none";
        }
    });
}
// End preview image


// Audio
const audioInput = document.querySelector("#audio");
if (audioInput) {
    const previewAudio = document.createElement("audio");

    previewAudio.controls = true;
    previewAudio.style.width = "100%";
    previewAudio.style.marginTop = "10px";
    previewAudio.style.display = "none";

    audioInput.parentNode.appendChild(previewAudio);

    audioInput.addEventListener("change", function (e) {
        const file = e.target.files[0];

        if (file) {
            previewAudio.src = URL.createObjectURL(file);
            previewAudio.style.display = "block";
        } else {
            previewAudio.src = "";
            previewAudio.style.display = "none";
        }
    });
}
// Kết thúc audio



// // Preview picture 
// const uploadInput = document.querySelector("#avatar");
// const previewImage = document.querySelector("#previewImage");

// uploadInput.addEventListener("change", (e) => {
//     const file = e.target.files[0];

//     if (file) {
//         previewImage.src = URL.createObjectURL(file);
//     }
// });
// // End preview picture