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
        autoplay: true
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