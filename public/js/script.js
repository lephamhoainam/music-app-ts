// Aplayer
const aplayer = document.querySelector("#aplayer");
if(aplayer) {
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    
    let singer = aplayer.getAttribute("data-singer");
    singer = JSON.parse(singer);

    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: dataSong.title,
            artist: singer.fullname,
            url: dataSong.audio,
            cover: dataSong.avatar
        }],
        autoplay: false
    });

    const avatar = document.querySelector(".singer-detail .inner-avatar");

    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";
    });

    ap.on('play', function () {
        avatar.style.animationPlayState = "running";
    });
}
// End aplayer 


// Tính năng like và removedLike bài hát 
const like = document.querySelector(".inner-action.inner-like");
if(like) {
    like.addEventListener("click", () => {
        const songId = like.getAttribute("id-song"); // Lấy ra id của bài hát

        const icon = like.querySelector("i");
        const span = like.querySelector("span"); 
        
        icon.classList.toggle("fa-regular"); // Khi click vào thì đổi sang đã like
        icon.classList.toggle("fa-solid"); // Khi click vào thì đổi sang bỏ like

        let numberLike = Number(icon.getAttribute("data-number-like"));
        const isLiked = icon.classList.contains("fa-solid"); 

        if(isLiked) {
            numberLike++;
        } else {
            numberLike--;
        }

        icon.setAttribute("data-number-like", numberLike);
        span.textContent = numberLike; 

        const typeLike = isLiked ? "yes" : "no";

        // Gửi số lượng like
        fetch(`/songs/like/${typeLike}/${songId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
        });
        // Kết thúc gửi số lượng like
    });
}
// Kết thúc tính năng like và removedLike bài hát 