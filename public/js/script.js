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


// Tính năng like và unLike bài hát 
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

        const option = {
            method: "PATCH" 
        }

        // Gửi số lượng like
        fetch(`/songs/like/${typeLike}/${songId}`, option)
            .then(res => res.json())
            .then(data => {
                console.log(data);
        });
        // Kết thúc gửi số lượng like
    });
}
// Kết thúc tính năng like và unLike bài hát


// Tính năng thêm và hủy bài hát yêu thích 
const buttonFavorite = document.querySelector("[button-favorite]");
if(buttonFavorite) {
    buttonFavorite.addEventListener("click", () => {
        const songId = buttonFavorite.getAttribute("button-favorite");

        const icon = buttonFavorite.querySelector("i");

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

        const isFavorite = icon.classList.contains("fa-solid");
        const typeFavorite = isFavorite ? "Favorite" : "unFavorite";

        const option = {
            method: "PATCH" 
        }

        // Gửi favorite
        fetch(`/songs/favorite/${typeFavorite}/${songId}`, option)
            .then(res => res.json())
            .then(data => {
                console.log(data);
        });
        // Kết thúc gửi favorite
    });
}
// Kết thúc tính năng thêm và hủy bài hát yêu thích 


// Tính năng checkbox-multi
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if(checkBoxMulti) {
    const inputCheckAll = checkBoxMulti.querySelector("input[name=checkall]");
    const inputIds = checkBoxMulti.querySelectorAll("input[name=id]");

    console.log(inputCheckAll);
    console.log(inputIds);

    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked) {
            inputIds.forEach(input => {
                input.checked = true;
            });
        } else {
            inputIds.forEach(input => {
                input.checked = false;
            });
        }
    });

    inputIds.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputIds.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}
// Kết thúc tính năng checkbox-multi