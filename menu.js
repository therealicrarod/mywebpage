'use strict'

var menuContent = document.getElementById('menuContent');
var screenSize = window.innerWidth;


//console.log(screenSize)

addEventListener('resize',(e)=>{
    screenSize = window.innerWidth; 
    widthCheck(screenSize);
})

function widthCheck(value){
    if (value > 768){
        isMobile(false);
    }else if(value < 768){
    isMobile(true);
    }
}

function isMobile(value){
    
        let burger = document.getElementById("burger");
        let close = document.getElementById("closeBtn");
        menuContent.style.display="none";
        burger.style.display="block";
        if (value) {
        burger.addEventListener('click',(e)=>{
            menuContent.style.display="flex";
            close.style.display="block";
            close.addEventListener('click',(e)=>{
                menuContent.style.display="none";
            })
        })
    } else if (value == false){
        menuContent.style.display="flex"
        burger.style.display="none";
        close.style.display="none";
    }
}

widthCheck(screenSize);

//dynamic menu//

var trigger = document.getElementById("splash"),
    show = document.getElementById("menu"),
    ctoTrigger=false;
//call to action
    var CTO = document.getElementById('CTO');

//create the intersection observer
async function setObserver (target,display) {
    
    let options={threshold:0.8}

    const callback = (entries,observer) => {
        //console.log(entries[0].isVisible);
        //console.log(entries[0]); 
        
        //splash animation code
        var splashIMG= document.getElementById('splashImg');



        
        if (entries[0].isIntersecting != true){
            //console.log("true");
                display.style.top="0px";

                //extra target 4 call to action
                CTO.style.transform="translateX(0px)"
                CTO.opacity="1";

                //splash animation
                if(splashIMG != undefined){
                splashIMG.style.transform="translateX(60px)";
                splashIMG.style.opacity="0";
                }
                ctoAction();
                //observer.unobserve(entries[0].target);
        }else{
            if (splashIMG != undefined){
                splashIMG.style.transform="translateX(0px)"
                splashIMG.style.opacity="1";
            }
            CTO.style.transform="translateX(500px)"
            ctoTrigger = true;
            display.style.top="-500px"
        }
    }

    let observer = new IntersectionObserver(callback,options);
    observer.observe(target);
    //console.log(observer);
}

//set delay to show and hide message
function ctoAction (){
    var msg = document.getElementById("CTOMsg");
    var img = document.getElementById("CTOImg");
    if (ctoTrigger) {
        setTimeout(() => {
            
            msg.style.transform="translateX(0px)";
            msg.style.opacity="1";

            //set delay to hide
            setTimeout(()=>{
                msg.style.transform="translateX(100px)";
                msg.style.opacity="0";
            },5500)
        },1500)
    }
}


setObserver(trigger,show)