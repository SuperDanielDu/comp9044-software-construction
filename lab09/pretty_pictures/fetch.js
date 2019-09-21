export default function runApp() {
    /** your code goes here */
    const out=document.getElementById('output');
    const more=document.getElementById('more');
    more.addEventListener('click',function(){
        for(var i=0;i<5;i++){
            if (out.lastElementChild.className==='img-post'){
                out.removeChild(out.lastElementChild);
            }
        }
        for(var i=0;i<5;i++){
            fetch('https://picsum.photos/200/300/?random')
            .then(response =>response.url)
            .then(url=>{
                //hide the loading????
                var div=document.createElement('div');
                div.className='img-post';
                var img=document.createElement('img');
                img.src=url;
                var p=document.createElement('p');
                var d=new Date();
                var time=d.getHours()+':'+d.getMinutes();
                p.innerText='Fetched at '+time;

                div.append(img,p);
                // div.appendChild(p);
                out.appendChild(div);
            })
        }

        // show the loading
    })
}