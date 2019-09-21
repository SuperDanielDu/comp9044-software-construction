export default function runApp() {
    /** your code goes here */
    // //remove first child
    // const first_to_be_removed=document.querySelector('.user');
    // father_node.removeChild(first_to_be_removed);
    const out = document.getElementById("output")
    //get data from posts
    //
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json_posts => {
            // do something with the JSON
            json.forEach(element => {
                var person=document.createElement('div');
                person.className='user';
                var h2=document.createElement('h2');
                h2.innerText = element['name'];
                var p=document.createElement('p');
                p.innerText = element['company']['catchPhrase'];
                person.appendChild(h2);
                person.appendChild(p);
                
                var ul=document.createElement('ul');
                ul.className='posts';
                
                json_posts.forEach(post => {
                    if (element['id']===post['userId']){
                        var li=document.createElement('li');
                        li.className='post';
                        li.innerText=post['title'];
                        ul.appendChild(li);
                    }
                })
                person.appendChild(ul);
                out.appendChild(person)
                // father_node.appendChild(person);
            })
        });
    })
    
}