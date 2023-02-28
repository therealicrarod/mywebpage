'use strict'

//differed charge of videos//

const videoSource = ['<iframe  src="https://www.youtube.com/embed/C1cBXc_TFjc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        '<iframe  src="https://www.youtube.com/embed/qdPRNdwwu8A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        '<iframe  src="https://youtube.com/embed/RsnrTDCBXE8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        '<iframe  src="https://youtube.com/embed/G9QM6i15ThY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        '<iframe  src="https://youtube.com/embed/0UdDrtMY8BI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'];
var videoList = ["video1Container","video2Container","video3Container","video4Container","video5Container"];

function createBtn () {
    for (let i=0;i<videoList.length;i++){
        let videoContainer = document.getElementById(videoList[i]);
        videoContainer.addEventListener('click',()=>{
            videoContainer.innerHTML=videoSource[i];
        })
    }
}

createBtn()

//call to action button action//