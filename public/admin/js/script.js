// Ảnh
const avatarInput = document.querySelector("#avatar");
if (avatarInput) {
    const previewImage = document.createElement("img");

    previewImage.style.maxWidth = "200px";
    previewImage.style.marginTop = "10px";
    previewImage.style.display = "none";
    previewImage.style.borderRadius = "6px";

    avatarInput.parentNode.appendChild(previewImage);

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
// Kết thúc ảnh


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