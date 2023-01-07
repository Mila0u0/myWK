let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnergy;
//mapArray - 決定地圖中每個格子的元素
//ctx - HTML5 Canvas用
//currentImgMainX, currentImgMainY - 決定主角所在座標
//imgMountain, imgMain, imgEnemy - 障礙物, 主角, 敵人的圖片物件
const gridLength = 200;
//網頁載入完成後初始化動作
//--讀取圖片的函式(下載)---
function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  // get num of sources
  for (var src in sources) {
    numImages++;
  }
  for (var src in sources) {
    images[src] = new Image();
    images[src].onload = function () {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
};
//-------------------------------

$(function () {
  mapArray = [ //0-可走,1-障礙,2-終點,3-敵人
    [0, 1, 1],
    [0, 4, 5],
    [4, 1, 2]];
  ctx = $("#myCanvas")[0].getContext("2d");
  //canvas類似畫布-指定2d繪製模式


  imgMain = new Image();
  imgMain.src = "images/girl.png";
  currentImgMain = {
    "x": 0,
    "y": 0
  };
  //等到圖片載入完成-再映到畫面上
  imgMain.onload = function () {
    ctx.drawImage(imgMain, 0, 0, 32, 47, currentImgMain.x+50, currentImgMain.y+50, gridLength/2,gridLength/2);
  };
  //0,0,80,130  ;依位置,裁剪寬高圖片 


  //----呼叫loadfunction(兩層迴圈)------------
  var sources = {
    cabinet: 'images/object.png',
    energy: 'images/object.png',
    cake:'images/cake.png'
  };
  loadImages(sources, function (images) {
    for (var x in mapArray) {
      for (var y in mapArray[x]) {
        if (mapArray[x][y] == 1) {
          ctx.drawImage(images.cabinet, 0, 0, 96, 96,y * gridLength+25, x * gridLength, gridLength*0.8, gridLength*0.8);
        }
        else if (mapArray[x][y] == 2) {
          ctx.drawImage(images.energy, 671, 0, 107, 96, y * gridLength+25, x * gridLength, gridLength*0.8, gridLength*0.8);
        } 
        else if (mapArray[x][y] == 3) {
          ctx.drawImage(images.cake, 0,0, 200, 200, y * gridLength+50, x * gridLength, gridLength*0.6, gridLength*0.6);
        }
        else if (mapArray[x][y] == 4) {
          ctx.drawImage(images.cake, 0,0, 200, 200, y * gridLength+50, x * gridLength, gridLength*0.6, gridLength*0.6);
        } 
        else if (mapArray[x][y] == 5) {
          ctx.drawImage(images.cake, 0,0, 200, 200, y * gridLength+50, x * gridLength, gridLength*0.6, gridLength*0.6);
        }
      }
    }
  });
  //-------------------------------

  //---------------原始寫法----------------
  // imgMountain = new Image();
  // imgMountain.src = "images/material.png";
  // imgEnemy = new Image();
  // imgEnemy.src = "images/Enemy.png";

  // imgMountain.onload = function () {
  //   imgEnemy.onload = function () {
  //     for (var x in mapArray) {
  //       for (var y in mapArray[x]) {
  //         if (mapArray[x][y] == 1) {
  //           //竹筍所在的位置
  //           ctx.drawImage(imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
  //         } else if (mapArray[x][y] == 3) {
  //           ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
  //         }
  //       }
  //     }
  //   }
  // }
});
//------------------------------------------


//處理使用者按下按鍵
$(document).on("keydown", function (event) {
  // debugger;
  let targetImg, targetBlock, cutImagePositionX;
  //cutImagePositionX - 決定主角臉朝向哪個方向
  targetImg = { //主角的目標座標
    "x": -1,
    "y": -1
  };
  targetBlock = { //主角的目標(對應2維陣列)
    "x": -1,
    "y": -1
  }
  event.preventDefault();
  //避免鍵盤預設行為發生，如捲動/放大/換頁...
  //判斷使用者按下什麼並推算目標座標
  console.log(event.code);  //測試上下左右建 ，是否有作用

  switch (event.code) {
    case "ArrowLeft":
      targetImg.x = currentImgMain.x - gridLength;
      targetImg.y = currentImgMain.y;
      cutImagePositionY = 47;//臉朝左
      break;
    case "ArrowUp":
      targetImg.x = currentImgMain.x;
      targetImg.y = currentImgMain.y - gridLength;
      cutImagePositionY = 141;//臉朝上
      break;
    case "ArrowRight":
      targetImg.x = currentImgMain.x + gridLength;
      targetImg.y = currentImgMain.y;
      cutImagePositionY = 94;//臉朝右
      break;
    case "ArrowDown":
      targetImg.x = currentImgMain.x;
      targetImg.y = currentImgMain.y + gridLength;
      cutImagePositionY = 0;//臉朝下
      break;
    default://其他按鍵不處理
      return;
  }
  //確認目標位置不會超過地圖
  if (targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0) {
    targetBlock.x = targetImg.y / gridLength;
    targetBlock.y = targetImg.x / gridLength;
  } else {
    targetBlock.x = -1;
    targetBlock.y = -1;
  }
  //清空主角原本所在的位置
  ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

  if (targetBlock.x != -1 && targetBlock.y != -1) {
    //確認地圖資料
    switch (mapArray[targetBlock.x][targetBlock.y]) {
      case 0: // 一般道路(可移動)
        $("#talkBox").text(":好累，真想快點睡覺");
        currentImgMain.x = targetImg.x;
        currentImgMain.y = targetImg.y;
        break;
      case 1: // 有障礙物(不可移動)
        $("#talkBox").text(":櫃子");
        break;
      case 2: // 終點(可移動)
        $("#talkBox").text(":睡覺!!");
        currentImgMain.x = targetImg.x;
        currentImgMain.y = targetImg.y;
        setTimeout(function(){$("#video").css("display","block");}, 500);
        $("#video").append('<video  id="myVideo"  autoplay   controls src="sample-mp4-file.mp4"></video>')
        // $("#myVideo").autoplay();
          // debugger;
          //Load video : set video element's src
          // find video element
          // document.getElementById("myVideo") 可精簡▼

        break;
      case 3: // 敵人(不可移動)
        $("#talkBox").text(":吃點東西");
        // console.log($('progress').val()); 
        // let progress = 0.1;
        $("progress").prop("value",function(){
           let bar = $('progress').val();
          if( bar < 0.2){
            // return  $("progress").prop("value",progress+0.3)
            // $('switch').prop('case','0');
            
            return  bar+0.3
            
          }
          
        });
        
        currentImgMain.x = targetImg.x;
        currentImgMain.y = targetImg.y;
        break;
        case 4: // 敵人(不可移動)
        $("#talkBox").text(":吃點東西");
        // console.log($('progress').val()); 
        // let progress = 0.1;
        $("progress").prop("value",function(){
           let bar = $('progress').val();
          if( bar < 0.6){
            // return  $("progress").prop("value",progress+0.3)
            // $('switch').prop('case','0');
            return  bar+0.3
            
          }
          
        });
        
        currentImgMain.x = targetImg.x;
        currentImgMain.y = targetImg.y;
        break;
        case 5: // 敵人(不可移動)
        $("#talkBox").text(":吃點東西");
        // console.log($('progress').val()); 
        // let progress = 0.1;
        $("progress").prop("value",function(){
           let bar = $('progress').val();
          if( bar < 0.8){
            // return  $("progress").prop("value",progress+0.3)
            // $('switch').prop('case','0');
            return  bar+0.3
            
          }
          
        });
        
        currentImgMain.x = targetImg.x;
        currentImgMain.y = targetImg.y;
        break;
    }
  } else {
    $("#talkBox").text("牆");
  }
  //重新繪製主角
ctx.drawImage(imgMain, 0,cutImagePositionY,32,47,currentImgMain.x+50, currentImgMain.y+50,gridLength/2,gridLength/2);


});

$('#close').on('click',function(){
  $(window).prop("location", location.href);
});