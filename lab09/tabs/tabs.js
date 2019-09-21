export default function runApp() {
    /** your code goes here */
    var lis_stars=document.querySelectorAll('li.nav-item');
    
    fetch('planets.json').then(Response=>Response.json()).then(json=>{
        lis_stars.forEach(element=>{
            element.onclick=()=>{
                var active=document.querySelector('.active');
                active.classList.remove('active');
                element.querySelector('a').classList.add('active');
                json.forEach(each_planet=>{
                    if(element.firstElementChild.innerText===each_planet['name'] ){
                        var information=document.getElementById('information');
                        information.querySelector('h2').innerText=each_planet['name'];
                        information.querySelector('p').innerText=each_planet['details']
                        var ul=information.querySelector('ul')
                        ul.innerHTML='';
                        for (var thing in each_planet['summary']){
                            var b=document.createElement('b');
                            b.innerText=thing+':';
                            var li=document.createElement('li');
                            var text=' '+each_planet['summary'][thing];
                            
                            li.append(b,text);
                            ul.appendChild(li);
                        }
                    }
                })
            }
        })
    })
}