'use strict'

var fullbutton = document.querySelectorAll(".webScreenshots");
console.log(fullbutton[0].childNodes);
const section = document.getElementById("web");

for (let i = 0; i < fullbutton[0].childNodes.length; i++ ){
    var element = fullbutton[0].childNodes[i].id;

    if(element == "ayvinos1"){
        fullbutton[0].childNodes[i].addEventListener('click',()=>{
            createFullscreen("ayvinos1");
        })
    }else if (element == "ayvinos2"){
        fullbutton[0].childNodes[i].addEventListener('click',()=>{
            createFullscreen("ayvinos2");
        })
    }
}

function createFullscreen(value){
    const urls = ["imgs/ayvinos_webpage_screenshot.png","imgs/ayvinos_webpage_screenshot2.png"];
    switch (value){
        case "ayvinos1":
            createCode(urls[0]);
            break
        case "ayvinos2":
            createCode(urls[1]);
            break
    }
}

function createCode (value){

    var div = document.createElement("DIV"),
        img = document.createElement("IMG"),
        frag = document.createDocumentFragment(),
        span = document.createElement("SPAN"),
        close = document.createElement("IMG"),
        closeUrl = "imgs/closeBTN.svg";

    div.classList.add("fullscreenWrapper")
    div.setAttribute("id","fullscreenPreview")
    img.src=value;
    img.classList.add("fullscreenImg");
    span.classList.add("pseudoWrapperWeb");
    
    close.src=closeUrl;
    close.classList.add("closeWeb");

    span.appendChild(img);
    div.appendChild(close);
    div.appendChild(span);
    frag.appendChild(div);
    section.appendChild(frag);

    close.addEventListener('click',function(){
        let fullScreen = document.getElementById("fullscreenPreview");
        section.removeChild(fullScreen);
    })
}