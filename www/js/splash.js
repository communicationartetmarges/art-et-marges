(function () {
    function removeElem(e) {
        e.parentElement.removeChild(e)
    }

    function init() {
        let videoPlay = document.getElementById("video-play");
        let videoPause = document.getElementById("video-pause");

        videoPlay.addEventListener('click', (evt) => {
            let myVideo = document.getElementById("video1");
            myVideo.play();
            removeElem(videoPlay)
        })
        videoPause.addEventListener('click', () => {
            let myVideo = document.getElementById("video1");
            let splash = document.getElementById("Splash");
            removeElem(splash)
        })
    }

    document.onreadystatechange = function startApplication() {
        if ('interactive' === document.readyState) {
            init()
        }
    };
})()