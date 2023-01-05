$(function(){
    $("button").on("click",go);
});
const maleKeywords = ["雄","強","賢","志"];
const femaleKeywords = ["芸","芬","佩"];

//箭頭函式
let go = () => {
    //alert("hi");
    var inputText = $("#userInput").val();

    //debugger;
    //some 簡單的判斷，是不是有任一個true 即可
    //Array method :some 
    //String method : includes -->如果有會回傳true
    const isMale = maleKeywords.some(thisElement => inputText.includes(thisElement));   
    const isFemale = femaleKeywords.some(thisElement => inputText.includes(thisElement));
   
    //如果篩選同時都有包含
    //Emoji Keyboard -->Win : Windows Key + .
    if(isMale && isFemale){
        $("h1").text("😁");
    }else if(isMale){
        $("h1").text("🧑");
    }else if(isFemale){
        $("h1").text("👩");
    }else{
        $("h1").text("😎");
    }
};
