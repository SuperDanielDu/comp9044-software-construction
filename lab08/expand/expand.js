(function() {
  'use strict';
  // TODO: Write some js
  var i=document.querySelectorAll('div.tool-bar');
    i.forEach(arr=>{
      // arr.nextElementSibling.style.display='block'
      console.log(arr.nextElementSibling.style.display)
      arr.onclick=()=>{
        if(arr.nextElementSibling.style.display!=='none'){
          arr.nextElementSibling.style.display='none';
          arr.children[0].children[0].innerHTML='expand_more'
        }
        else{
          arr.nextElementSibling.style.display='block';
          arr.children[0].children[0].innerHTML='expand_less'
        }
      }
    })
}());
