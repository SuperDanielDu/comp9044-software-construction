(function() {
    var i=document.querySelectorAll('div.tool-bar');
    i.forEach(arr=>{
        // console.log(arr.nextSibling)
        // console.log(arr.nextElementSibling)       ?????
        arr.onclick=()=>{
            arr.nextElementSibling.style.display='none';
        }
    })
}());
