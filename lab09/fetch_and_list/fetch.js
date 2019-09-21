export default function runApp() {
    /** your code goes here */
    const out=document.getElementById('output');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
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
            out.appendChild(person);
        });
    })
    // const first_to_be_removed=document.querySelector('.user');
    // father_node.removeChild(first_to_be_removed);
}