(function () {
    function removeElem(e) {
        e.parentElement.removeChild(e)
    }

    function getLocaleStorage() {
        try {
            const storage = window.localStorage;
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return storage;
        }
        catch (e) {
            return false;
        }
    };

    const toLocalStorage =
        (key, value) => {
            const storage = getLocaleStorage();
            if (storage) {
                storage.setItem(key, JSON.stringify(value));
            }
        };

    const getLocalStorageValue = (key, dflt) => {
        const storage = getLocaleStorage();
        if (storage) {
            const jsonString = storage.getItem(key);
            if (jsonString) {
                return JSON.parse(jsonString);
            }
        }
        return dflt;
    };

    function tryInit(f, name) {
        try { f() } catch (err) {
            console.log('Failed Init: ' + name)
            console.log(err);
        }
    }

    function initSpash() {
        const splashState = getLocalStorageValue('splash', [])

        document
            .querySelectorAll(".splash")
            .forEach((splash) => {
                const id = splash.id;
                if (splashState.indexOf(id) < 0) { // never seen
                    toLocalStorage('splash', splashState.concat([id]));
                    splash
                        .querySelectorAll(".splash--close")
                        .forEach((close) => {
                            close.addEventListener("click", () => removeElem(splash))
                        })
                }
                else {
                    removeElem(splash)
                }
            })
    }

    function initVideo() {
        let videoPlay = document.getElementById("video-play");
        let videoPause = document.getElementById("video-pause");

        videoPlay.addEventListener('click', (evt) => {
            let myVideo = document.getElementById("video1");
            myVideo.play();
        })
        videoPause.addEventListener('click', () => {
            let myVideo = document.getElementById("video1");
            myVideo.pause();
        })
    }

    function init() {
        tryInit(initSpash, 'splash');
        tryInit(initVideo, 'video');
    }


    document.onreadystatechange = function startApplication() {
        if ('interactive' === document.readyState) {
            init()
        }
    };
})()

