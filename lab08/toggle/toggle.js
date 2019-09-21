(function() {
   'use strict';
   // write your js here.
   // setTimeout(() => {i.style.display='none'}, 2000);
   block();
   setInterval(block,4000)
   function block(){
      const i=document.getElementById('output');
      // setTimeout(() => {i.style.display='block'}, 2000);
      i.style.display='none'
      setTimeout(() => {i.style.display='block'}, 2000);
   }
   // console.log(i)
}());
