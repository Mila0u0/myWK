$(function (){
    // debugger;
    //Load video : set video element's src
    // find video element
    // document.getElementById("myVideo") 可精簡▼
    // $("#myVideo").attr("src","sample-mp4-file.mp4");
    $("#myVideo").css("display","block");
    //Set Play Button <- click event ..xxxx
    // onclick, addEventListener
    $("#playBtn").on("click",function(){
        // debugger;-->可以測試跑到那一段的值 (網頁的console檢查)
   
      //當影片開始音量 預設(固定)小數兩位
        $("#volumeDisplay").text($("#myVideo")[0].volume.toFixed(2));
        $("#progressBar")[0].max = $("#myVideo")[0].duration;  //max 指定圓球走到的點(bar的長短不一)
        // debugger;
        // console.log("Yo");
        // 1.Play Video or Pause Video <-- Check Video Current Status
        // 2.Set Button Text -> innerHTML
        if($("#myVideo")[0].paused){
            $("#myVideo")[0].play();
            $("#playBtn").text("Pause");
        }else{
            $("#myVideo")[0].pause();
            $("#playBtn").text("Play");
        }
    });
    //Set FullScreen Button
    $("#fullBtn").on("click",function(){
        $("#myVideo")[0].webkitEnterFullscreen();
    });
  
    $("#lowerVolumeBtn").on("click", downVolume);
    $("#higherVolumeBtn").on("click", upVolume);
    $("#myVideo").on("timeupdate", updateProgress);
    $("#progressBar").on("change", changeProgress);
      //timeupdate 一直觸發(隨時更新)
     // change 表單很常使用到
  
  });
  
  function downVolume(){
    var myVideo = $("#myVideo")[0];
    if(myVideo.volume == 0){
    }else if(myVideo.volume < 0.1){
        myVideo.volume = 0;
    }else{
        myVideo.volume = myVideo.volume - 0.1;
    }
    $("#volumeDisplay").text(myVideo.volume.toFixed(2));
  }
  
  function upVolume(){
    var myVideo = $("#myVideo")[0];
    if (myVideo.volume == 1) {
    } else if (myVideo.volume > 0.9) {
        myVideo.volume = 1;
    } else {
        myVideo.volume = myVideo.volume + 0.1;
    }
    $("#volumeDisplay").text(myVideo.volume.toFixed(2));
  }
  
  function updateProgress(){
    $("#timeDisplay").text(Math.floor($("#myVideo")[0].currentTime));  //指示音频/视频播放的当前位置（以秒计）
    // $("#timeDisplay").append("/"+Math.floor($("#myVideo")[0].duration)+"秒");
    $("#timeDisplay").append(`/${Math.floor($("#myVideo")[0].duration)}秒`);
    $("#progressBar")[0].value = $("#myVideo")[0].currentTime;
  }
  
  function changeProgress(){
    $("#myVideo")[0].pause();
    $("#myVideo")[0].currentTime = $("#progressBar")[0].value;
    $("#myVideo")[0].play();
  }