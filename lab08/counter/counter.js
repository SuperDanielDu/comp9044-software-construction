(function() {
   'use strict';
   // write your code here
   var a=setInterval(refresh,1000);
   function refresh(){
      var d=new Date();
      var t=d.toLocaleString();
      document.getElementById('output').innerHTML=t;
   }
}());
