let player; //YouTube Player
let currentPlay = 0; //記錄目前撥到第幾首歌
//YouTube API Ready
function onYouTubeIframeAPIReady() {
    //alert("hi");

    player = new YT.Player("player", {    //"player" div的id
        height: "390",
        width: "640",
        videoId: playList[currentPlay],
        playerVars: {
            autoplay: 0, //是否自動撥放
            controls: 0, //是否顯示控制項
            start: playTime[currentPlay][0],//開始秒數
            end: playTime[currentPlay][1],//結束秒數
            iv_load_policy: 3   //畫面上可置入行銷連結
        },
        events: {
            //when the video player is ready =>onReady
            onReady: onPlayerReady,
            //when the player's state changes=>onStateChange
            onStateChange: onPlayerStateChange
        }
    });
}
//YouTube Player Ready
function onPlayerReady(event) {
    $("#playButton").on("click", function () {
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}
//Player State Change
function onPlayerStateChange(event) {
    //event .data   
    // -1 – unstarted
    // 0 – ended
    // 1 – playing
    // 2 – paused
    // 3 – buffering
    // 5 – video cued

    if (Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]) {
        //go to next song
        if (currentPlay < playList.length - 1) {
            currentPlay++;
            player.loadVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "large"
            });
        } else {
            currentPlay = 0;
            player.cueVideoById({
                videoId: playList[currentPlay],
                startSeconds: playTime[currentPlay][0],
                endSeconds: playTime[currentPlay][1],
                suggestedQuality: "large"
            });
        }
    }
    if (event.data == 1) {
        $("h2").text(player.getVideoData().title);
    }
}