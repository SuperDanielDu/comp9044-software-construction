/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 *
 * Updated 2019.
 */

// import your own scripts here.

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with
// different datasets.
function initApp(apiUrl) {
  //name spasce to store global variable
  var MYNAME={};

  //get_user is used to get user's information /////user_info={'username':'' , 'id':''}/////wanna_get={'':'', '':''}
  function get_user(user_info,wanna_get,do_function){
    let url=`${apiUrl}/user/`;
    if (user_info['username'] && user_info['id']){
      url=`${apiUrl}/user/?username=${user_info['username']}&id=${user_info['id']}`;
    }
    else if (user_info['username']){
      url=`${apiUrl}/user/?username=${user_info['username']}`;
    }
    else if (user_info['id']){
      url=`${apiUrl}/user/?id=${user_info['id']}`;
    }

    let options={
      method:'GET',
      headers:{
        "Authorization":'Token ' + MYNAME.token,
        'Content-Type':'application/json',
        'accept':'application/json'
      }
    };

    fetch(url,options)
        .then(Response=>{
          MYNAME.status_code=Response.status;
          return Response.json();
        })
        //deal with response body according to status_code
        .then(res=> {
          //if status_code is not 200: catch error and alert error
          if (MYNAME.status_code!==200){
            return Promise.reject(res["message"]);
          }
          //if status_code is 200: upvote successful, get info and do something.
          else{
            for (let i in wanna_get){
              wanna_get[i]=res[i];
            }
            do_function(wanna_get);             ////get info and do something
          }
        }).catch(err=>alert(err));                   ///catch error but do nothing????

  }
  //function for quickly creating element
  function create_Element(tag,inner,attributes){
    let e=document.createElement(tag);
    e.innerText=inner;
    for (let i in attributes){
      e.setAttribute(i,attributes[i]);
    }
    return e;
  }

  //initialize website:
  function initialize(){
    //create header:
    let header=create_Element('header','',{class:'banner', id:"nav"});
      //create h1:
      let h1=create_Element('h1','Seddit',{id:"logo", class:"flex-center"});
      //create ul:
      let ul=create_Element('ul','',{class:"nav"});
        //create li1 li2 li3
        let li1=create_Element('li','',{class:"nav-item"});
        let input1=create_Element('input','',{id:"search",'data-id-search':'',placeholder:"Search Seddit",type:"search"});
        li1.appendChild(input1);
        let li2=create_Element('li','',{class:"nav-item"});
        let input2=create_Element('button','Log In',{'data-id-login':'',class:"button button-primary"});
        li2.appendChild(input2);
        let li3=create_Element('li','',{class:"nav-item"});
        let input3=create_Element('button','Sign Up',{'data-id-signup':'', class:"button button-secondary"});
        li3.appendChild(input3);
      ul.append(li1,li2,li3);
    header.append(h1,ul);
    document.getElementById('root').appendChild(header);
    //create main
    let main=create_Element('main','',{role:'main'});
      //create ul
      ul=create_Element('ul','',{id:"feed"});
        //create div
        let div=create_Element('div','',{class:"feed-header"});
          let h3=create_Element('h3','Popular posts',{class:"feed-title alt-text"});
          let button=create_Element('button','Post',{class:"button button-secondary",id:'POST'});
          button.onclick=()=>{alert('Please Login!')};
        div.append(h3,button);
      ul.appendChild(div);
    main.appendChild(ul);
    document.getElementById('root').appendChild(main);
  }
  initialize();
//-------------------------------------------------------------level 0,1
  //function of create login form
  function form_login_signup(status){
    const main=document.querySelector('main');
    //if form not exists
    let form;
    if (main.previousElementSibling.tagName!=='FORM'){
      //create a form
      form=create_Element('form','',{id:'login_signup_form'});
      //username input
      let input_username=create_Element('input','',{type:"text", name:"username", placeholder:"Username",style:'display:block'});
      //password input
      let input_password=create_Element('input','',{type:"password", name:"password", placeholder:"Password", style:'display:block'});
      //repeat password input
      let repeat_password=create_Element('input','',{type:"password", name:"Repeat_Password",placeholder:"Repeat Password"});
      //email input
      let input_email=create_Element('input','',{type:"text",name:"Input_Email",placeholder:"Email Address"});
      //name input
      let input_name=create_Element('input','',{type:"text",name:"Input_Name", placeholder:"Name"});
      //submit
      let submit=create_Element('input','',{type:"submit",name:'submit',value:status});
      // submit.onclick=(e)=>{
      //   e.preventDefault();
      //   if (status==='login'){
      //     if(input_username.value===''||input_password.value===''){
      //       alert('Please fill all fields!');
      //     }
      //     else{
      //       payload_function(input_username.value,input_password.value);
      //     }
      //   }
      //   else if(status==='signup'){
      //     if(input_username.value===''||input_password.value===''
      //     ||input_email.value===''||input_name.value===''){
      //       alert('Please fill all fields!');
      //     }
      //     else if(input_password.value!==repeat_password.value){
      //       alert("Passwords don't match")
      //     }
      //     else{
      //       payload_function(input_username.value,input_password.value,
      //         input_email.value,input_name.value);
      //     }
      //   }
      // }
      //add inputs into form;add form before main
      form.append(input_username,input_password,repeat_password,input_email,input_name,submit);
      main.parentElement.insertBefore(form,main);
    }
    //if form exists
    else{
      form=main.previousElementSibling;
      form.style.display='block';
    }

    //when click login, hide repeat_password,email and name
    if (status==='login'){
      form.Repeat_Password.style.display='none';
      form.Input_Email.style.display='none';
      form.Input_Name.style.display='none';
      form.onsubmit=(event)=>{
        event.preventDefault();
        payload_function(form.username.value,form.password.value);
        do_json('POST','/auth/login',MYNAME.payload);
        form.style.display='none';
      };
    }
    //when click signup, show repeat_password,email and name
    else{
      form.Repeat_Password.style.display='block';
      form.Input_Email.style.display='block';
      form.Input_Name.style.display='block';
      form.onsubmit=(event)=>{
        event.preventDefault();
        payload_function(form.username.value,form.password.value,
            form.Input_Email.value,form.Input_Name.value);
        do_json('POST','/auth/signup',MYNAME.payload);
        form.style.display='none';
      };
    }
    //change the value of submit
    form.submit.value=status;
    //move all the form to the right of page
    form.style.float='right';
  }

//Q1:part of login
  const button_login=document.querySelector('.button-primary');
  button_login.onclick=()=>form_login_signup('login');

//Q2:part of signup
  const button_signup=document.querySelector('.button-secondary');
  button_signup.onclick=()=>form_login_signup('signup');
  //click other place except buttons and forms hide all the forms
  document.body.onclick=(e)=>{
    if(e.target.parentElement && e.target.tagName!=='BUTTON' && e.target.parentElement.tagName!=='FORM'){
      document.querySelectorAll('form').forEach(element=>{
        if (element.id==="login_signup_form" || element.id==="login_signup_form")
        element.style.display='none'});
    }
  };

  //payload_function used to creat a json payload for username and password
  function payload_function(username,password,email,name){
    //if payload is login(username,password)
    if(arguments.length===2){
      MYNAME.payload={
        username: username,
        password: password
      };
    }
    //if payload is signup(username,password,email,name)
    else if(arguments.length===4){
      MYNAME.payload={
        username:username,
        password:password,
        email:email,
        name:name
      };
    }
  }
  //function do_json is used to communicate with backend
  function do_json(do_method,url,payload){
    //set the options
    let options={
      method:do_method,
      headers:{
        'Content-Type':'application/json',
        'accept':'application/json'
      },
      body:JSON.stringify(payload)
    };
    //fetch the url from backend

    fetch(`${apiUrl}${url}`,options)
    //return response body and get status_code
        .then(Response=>{
          MYNAME.status_code=Response.status;
          return Response.json();
        })
        //deal with response body according to status_code
        .then(res=> {
          //if status_code is not 200: catch error and alert error
          if (MYNAME.status_code!==200){
            return Promise.reject(res["message"]);
          }
          //if status_code is 200: alert successful, get token.
          else{
            //if payload.length is 2, login
            if (Object.keys(payload).length===2){
              alert("Login Successfully!");
              MYNAME.token=res['token'];
              //log in and get the feed


              get_feed(MYNAME.token);
////---------------------------------------------level 2 get the post && profile
              post_content();
              profile();
////---------------------------------------------level 2
////------------------------------------------------level3
              search_function();
            }

            //payload.length is 4, sign up
            else{
              alert("Sign Up Successfully!");
            }
          }
        }).catch(err=>alert(err));
  }

//Q3: feed
  //first delete all the example post:
  function delete_feed(){
    let example_posts=document.querySelectorAll('.post');
    for (let i=0;i<example_posts.length;i++){
      example_posts[i].parentElement.removeChild(example_posts[i]);
    }
  }
  delete_feed();
  //function for make feed
  function make_li(post,feed) {
    //create a li
    let li = create_Element('li', '', {class: "post", 'data-id-post': ''});
    //create first div(upvotes)
    let first_div = create_Element('div', post['meta']['upvotes'].length, {
      class: 'vote',
      'data-id-upvotes': ''
    });
    //create second div(content)
    let second_div = create_Element('div', '', {class: 'content'});
    //create h4(title)
    let h4 = create_Element('h4', post['title'], {'data-id-title': '', class: 'post-title alt-text'});
    second_div.appendChild(h4);
    //create description text
    let h5 = create_Element('h5', post['text'], {class: 'post-title alt-text'});
    second_div.appendChild(h5);
    //create image
    if (post['image']) {
      var img = create_Element('img', '', {src: 'data:image/png;base64,' + post['image'],style:'    width: 740px;\n' +
            'resize: auto;margin: 10px;position: relative;'});
      second_div.appendChild(img);
    }
    //create p(author + time)
    let date = new Date(parseInt(post['meta']['published']) * 1000);
    let p = create_Element('p'
        , 'Posted by ' + post['meta']['author'] + '\xa0\xa0\xa0\xa0' + date.toLocaleString()
        , {'data-id-author': '', class: 'post-author'});
    //if login
    if (MYNAME.token){
      profile(p,post['meta']['author']);
      if (img!=undefined){
        img.onclick=p.onclick;
      }
    }
    second_div.appendChild(p);
    //create p3(subseddit)
    let p3 = create_Element('p', 'Subseddit: ' + post['meta']['subseddit'], {class: 'post-author'});
    second_div.appendChild(p3);
    //create p2(num of comments)
    let p2 = create_Element('p', 'Comments(See All): ' + post['comments'].length, {style: 'fontSize:15px;width:auto;'});
    let comments=post['comments'];
    for(let i=0;i<comments.length;i++){
      let date = new Date(parseInt(comments[i]["published"]) * 1000);
      comments[i]["published"]=date.toLocaleString();
    }
    //create button of doing upvote
    let upvote_button=create_Element('button','Upvote!',{class:"button button-primary",style:'margin-bottom: 2px;'});
    //set the upvote button for live update--------------------------level 3
    //if the user logged in
    if (MYNAME.token){
      //get logged in user_id and
      get_user({'username':MYNAME.payload['username'],'id':''},{'id':''},(wanna_get)=>{
        //got the logged in user_id and rejudge the upvote_button_color
        //if the user's id in the upvotes list already
        if (post['meta']['upvotes'].indexOf(wanna_get['id'])!==-1){
          upvote_button.className='button button-secondary';
        }
        //if the user's id not in the upvotes list
        else {
          upvote_button.className="button button-primary";
        }
        upvote_button.onclick=(event)=>{
          //logged in, can do vote behavior
          do_upvote(post,event,first_div);    ////first_div is num of upvotes
        };
      });
      //after user login, if the login username == the post's author
      if (MYNAME.payload['username']==post['meta']['author']){
        var delete_post_button=create_Element('button','Delete',{class:'button button-secondary',style:'    margin-left: 5px;\n' +
              'margin-right: -16px;background-color: tomato;border-color: tomato;'});
        delete_post_button.onclick=()=>{
          delete_post(post['id']);
        };
        var update_post_button=create_Element('button','Update',{class:'button button-secondary'});
        post_content(update_post_button,post['id']);
      }

    }
    // if the user not logged in
    else{
      //click the button.alert
      upvote_button.onclick=()=>{alert('Please Login!')};
    }
    //---------------------------------------------level 3 comment button and live update
    let comment_form=create_Element('form','',{});
    let comment_input=create_Element('input','',{type:'text',placeholder:'comment',style:'margin: 5px;\n' +
          'height: 30px;font-size: 16px;border-radius: 4px;border: 1px solid #c8cccf;width: 499px;'});
    let comment_button=create_Element('submit','Comment',{class:"button button-secondary",style:'font-size: 12px;\n' +
          'padding: 8px;margin-top: 0px;bottom: 2px;position: relative;'});
    comment_button.onclick=(event)=>{
      event.preventDefault();
      if (!comment_input.value){
        alert('Comment Cannot Be None!');
        return;
      }
      if (!MYNAME.token){
        alert('Please Login!');
        return;
      }

      ////post new comment to backend
      let url=`${apiUrl}/post/comment?id=${post['id']}`;
      let options={
        method:'PUT',
        headers:{
          "Authorization":'Token ' + MYNAME.token,
          'Content-Type':'application/json',
          'accept':'application/json'
        },
        body:JSON.stringify({'comment':comment_input.value})
      };
      fetch(url,options)
          .then(Response=>{
            MYNAME.status_code=Response.status;
            return Response.json();
          })
          //deal with response body according to status_code
          .then(res=> {
            //if status_code is not 200: catch error and alert error
            if (MYNAME.status_code!==200){
              return Promise.reject(res["message"]);
            }
            //if status_code is 200: upvote successful, change the button color.
            else{
              alert("Comment Successfully!");
              let comment_modal=p2.parentElement.lastElementChild;     //p2 is the button of 'Comments(See All)'
              let div=create_Element('div','',{});
              let date = new Date();
              let published=date.toLocaleString();
              //add element div of author, published, comment
              let para1=create_Element('p',MYNAME.payload['username']+'\xa0\xa0\xa0\xa0'+published + '  :',
                  {class:"post-author",style:'font-size:20px;text-align: left;color: chartreuse;'});
              let para2=create_Element('p', comment_input.value,{class:"post-title alt-text",style:'margin-left: 200px;' +
                    'font-size: 37px;' + 'color: orangered;' + 'text-align: left;'});
              div.append(para1,para2);
              comment_modal.appendChild(div);
              p2.innerText='Comments(See All): '+comment_modal.children.length;
            }
          }).catch(err=>alert(err));
    };


    comment_form.append(comment_button,comment_input);
    second_div.append(p2,upvote_button,comment_form);
    //if the login username == the post's author,add the buttons into that post
    if(delete_post_button!==undefined){
      second_div.append(update_post_button, delete_post_button)
    }

    li.append(first_div,second_div);
    feed.appendChild(li);
    //level 2  Q4 Q5          //make modal for upvotes and comments
    if (MYNAME.token){
      make_modal_function(first_div,post['meta']['upvotes']);
      make_modal_function(p2,post['comments']);
    }
    else{
      first_div.onclick=()=>{alert('Please Login!')};
      p2.onclick=()=>{alert('Please Login!');};
    }
  }
  function make_feed(json,father_node){
    //making the main page
    var feed;
    if (arguments.length===1){
      feed = document.getElementById('feed');
    }
    //making the profile page
    else{
      feed=father_node;
    }
    for (let i=0;i<json['posts'].length;i++) {
      let post = json['posts'][i];
        make_li(post,feed)
    }
  }
  //create a get_feed function

  function get_feed(token) {

    delete_feed();
    let url;
    let options;
    //level 0: no token got
    if (arguments.length===0){
      url=`${apiUrl}/post/public`;
    }
    //login: get 200 and token
    else{
      url=`${apiUrl}/user/feed`;
      options={
        method:'GET',
        headers:{
          "Authorization":'Token '+ MYNAME.token,
          'Content-Type':'application/json',
          'accept':'application/json'
        },
      };
    }
    fetch(url,options)
        .then(res => res.json())
        .then(json => {
          //load 10 first
          make_feed(json);
          //keep loading
          if (arguments.length!==0){
            infinite_scroll();
          }
        })

  }
  //first run level 0
  get_feed();

//--------------------------------------------------------------level 2
  // The Modal (background) referred from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_login_form_modal
  let modal='.modal {display: none;position: fixed;z-index: 1;\
    left: 0;top: 0;width: 100%;height: 100%;\
    overflow: auto;background-color: rgb(0,0,0);\
    background-color: rgba(0,0,0,0.4);padding-top: 60px;\
  }';
  //the style for post_content modal
  let post_input='.post_input{height: 34px;margin-top: 13px;' +
      'font-size: 28px;margin-left: 20px;width: 446px;}';
  //container
  let container='.container {padding: 16px;}';
  let style=create_Element('style',modal+' \n '+container+' \n '+post_input , {});
  document.head.appendChild(style);

  //make a modal function;
  function make_modal_function(press,inner_data){
    //create upvotes_div to store the upvotes list
    let modal_div=create_Element('div',' ',{class:'modal',style:'text-align: center;font-size: 23px;color: orangered;height: 92%;'});
    // When the user clicks anywhere of the modal, close it
    modal_div.onclick=()=>{modal_div.style.display='none'};
    for (let i=0;i<inner_data.length;i++) {
      //if the inner_data= [1,2,3,4]:(upvotes),  inner_data[0] = 1(number)
      if (typeof (inner_data[i]) === 'number') {
        get_user({'username':'','id':inner_data[i]},{'username':''},function(wanna_get){
          let div_upvote = create_Element('div', wanna_get['username'], {});
          modal_div.appendChild(div_upvote);
          press.parentElement.appendChild(modal_div);
          press.addEventListener('click',()=>{modal_div.style.display='block'});
        });

      }
      //if the inner_data[i] is a json(comments), {"author": "Theresa","published": "1557845057","comment": "I love this shot!"}
      else {
        let div=create_Element('div','',{style:'text-align: left;font-size: 23px;color: orangered;float: left;width: -moz-fit-content;    width: 100%;'});
        //add element div of author, published, comment
        let p1=create_Element('p',inner_data[i]['author']+'\xa0\xa0\xa0\xa0'+inner_data[i]['published'] + '  :',
            {class:"post-author",style:'font-size:20px;text-align: -webkit-left;color: chartreuse;'});
        let p2=create_Element('p', inner_data[i]['comment'],{class:"post-title alt-text",style:'margin-left: 200px;' +
              'font-size: 37px;' + 'color: orangered;' + 'text-align: -webkit-left;'});
        div.append(p1,p2);
        modal_div.appendChild(div)
      }
    }
    press.parentElement.appendChild(modal_div);
    press.addEventListener('click',()=>{modal_div.style.display='block'});
  }

//Q6 Upvote user generated content
  function do_upvote(post,event,first_div){
    //if button color is white, can upvote
    let url;
    let options;
    if (event.target.className==='button button-primary'){
      url=`${apiUrl}/post/vote?id=${post['id']}`;
      options={
        method:'PUT',
        headers:{
          "Authorization":'Token ' + MYNAME.token,
          'Content-Type':'application/json',
          'accept':'application/json'
        }
      };
    }
    //if button color is blue, delete upvote
    else{
      url=`${apiUrl}/post/vote?id=${post['id']}`;
      options={
        method:'DELETE',
        headers:{
          "Authorization":'Token ' + MYNAME.token,
          'Content-Type':'application/json',
          'accept':'application/json'
        }
      };
    }
    fetch(url,options)
        .then(Response=>{
            MYNAME.status_code=Response.status;
            return Response.json();
          })
        //deal with response body according to status_code
        .then(res=> {
          //if status_code is not 200: catch error and alert error
          if (MYNAME.status_code!==200){
            return Promise.reject(res["message"]);
          }
          //if status_code is 200: upvote successful, change the button color.
          else{
            //if button color is white, can upvote
            if (event.target.className==='button button-primary'){
              alert("Upvote Successfully!");
              event.target.className='button button-secondary';
              let upvote_modal=first_div.parentElement.lastElementChild;
              let user_name_div=create_Element('div',MYNAME.payload['username'],{});
              upvote_modal.appendChild(user_name_div);
              first_div.innerText=upvote_modal.children.length;
            }
            //if button color is blue, delete upvote
            else{
              alert("Delete Upvote Successfully!");
              event.target.className='button button-primary';
              let upvote_modal=first_div.parentElement.lastElementChild;
              for (let i=0;i<upvote_modal.children.length;i++){
                if(upvote_modal.children[i].innerText===MYNAME.payload['username']){
                  upvote_modal.removeChild(upvote_modal.children[i]);
                  break;
                }
              }
              first_div.innerText=upvote_modal.children.length;
            }
            if(event.target.parentElement.parentElement.parentElement.parentElement.className==='modal'){
              make_feed(MYNAME.token)
            }
          }
        }).catch(err=>alert(err));
  }

//Q7 Post new content
  //get post button
  function post_content(update_button,post_id){
    //if event is not provided, post is the POST button
    var behaviour;
    var post;
    if (typeof(update_button)=='undefined') {
      post = document.getElementById('POST');
      behaviour='post';
    }
    //else post is the update button
    else{
      post=update_button;
      behaviour='update';
    }

    //make a modal for post page
    let modal_div=create_Element('div','',{class:'modal',style:'text-align: center;font-size: 23px;color: orangered;'});
    let form=create_Element('form','',{class:'modal-content',style:'background-color: azure;\
      width: 500px;height: 602px;margin-left: 461px;margin-top: 50px;position: absolute;'});
    let tr1=create_Element('tr','',{});
    let title=create_Element('input','',{type:"text",name:"title",placeholder:"Title",class:"post_input"});
    tr1.appendChild(title);
    let tr2=create_Element('tr','',{});
    let text=create_Element('input','',{type:"text",name:"text",placeholder:'Text',class:"post_input"});
    tr2.appendChild(text);
    if(behaviour==='post') {
      var tr3 = create_Element('tr', '', {});
      var subseddit = create_Element('input', '', {
        type: "text",
        name: "subseddit",
        placeholder: "subseddit",
        class: "post_input"
      });
      tr3.appendChild(subseddit);
    }
    let tr4=create_Element('tr','',{});
    let image=create_Element('input','',{type:"file",name:"image",style:'margin-top: 28px;\n' +
          'font-size: 17px;'});
    image.addEventListener('change',function(){
      let reader=new FileReader();
      reader.readAsDataURL(image.files[0]);
      reader.onload=function(){
        show_image.src = this.result;
      };
    });
    tr4.appendChild(image);
    let tr5=create_Element('tr','',{});
    let show_image=create_Element('img','',{src:'',style:'height: 232px;\n' +
          'margin-top: 15px;\n' +
          'margin-left: 22px;'});
    tr5.appendChild(show_image);
    let submit=create_Element('input','',{type:"submit",name:'submit',value:'POST',class:"post_input",style:'margin-left: -7px;'});
    if(behaviour==='update'){
      submit.value='UPDATE POST'
    }
    submit.onclick=(event)=>{
      event.preventDefault();
      var payload={
        'title':title.value,
        'text':text.value,
        'image':show_image.src.split(',')[1]
      };
      var url=`${apiUrl}/post/?id=${post_id}`;
      var method='PUT';
      if (behaviour==='post'){
        payload['subseddit']=subseddit.value;
        url = `${apiUrl}/post/`;
        method = 'POST'
      }
      let options={
        method:method,
        headers:{
          'Content-Type':'application/json',
          'accept':'application/json',
          'Authorization': 'Token '+MYNAME.token
        },
        body:JSON.stringify(payload)
      };
      fetch(url,options)
          .then(Response=>{
            MYNAME.post_status_code=Response.status;
            return Response.json();
          })
          //deal with response body according to status_code
          .then(res=> {
            //if status_code is not 200: catch error and alert error
            if (MYNAME.post_status_code!==200){
              return Promise.reject(res["message"]);
            }
            //if status_code is 200: upvote successful, change the button color.
            else{
              if (behaviour==='post'){
                alert('Post Successfully! Post ID: '+res['post_id']);
              }
              if(behaviour==='update'){
                alert('Update Post Successfully!');
              }
              get_feed(MYNAME.token);
            }
          }).catch(err=>alert(err));
    };
    if (behaviour==='post') {
      form.append(tr1, tr2, tr3, tr4, tr5, submit);
    }
    else if(behaviour==='update'){
      form.append(tr1, tr2, tr4, tr5, submit);
    }
    form.onclick=(event)=>{event.stopPropagation()};
    modal_div.appendChild(form);
    post.appendChild(modal_div);
    modal_div.onclick=(event)=>{
      event.stopPropagation();
      modal_div.style.display='none'
    };
    post.onclick=()=>{
      modal_div.style.display='block';
    };

  }
//Q8 profile
  function profile(profile_node,username){
    var profile;
    var extra_link='';
    //if making the main page
    if (arguments.length===0){
      let ul=document.querySelector('ul');
      if (document.getElementById('profile_button')){
        ul.removeChild(document.getElementById('profile_button'));
      }
      profile=create_Element('button','Profile',{id:'profile_button',class:"button button-secondary",style:'margin-left: 5px;\n' +
            'margin-right: -16px;background-color: tomato;border-color: tomato;'});
      ul.appendChild(profile);
    }
    //if making the profile
    else{
      profile=profile_node;
      extra_link='?username='+username;
    }
    //make a modal for post page
    function make_post_page_modal(){
      let modal_div=create_Element('div','',{class:'modal',style:'font-size: 23px;'});
      
      let feed_ul=create_Element('ul','',{'data-id-feed':'',style:'color: black;text-align: left;padding-right: 40px;\n' +
            'font-size: 15px;margin-left: 41px;margin-right: 41px;padding: 0;margin-bottom: 160px;'});

      let form=create_Element('form','',{class:'modal-content',style:'resize: auto;\n' +
            'background-color: azure;width: auto;height: auto; margin-left: 41px;margin-top: 60px;\n' +
            'color: orangered;display: block;margin-right: 41px;text-align: left;'});
      //if making main page, there is an update button in the profile modal.
      var update_email;
      var update_name;
      var update_password;
      var submit;
      if (extra_link===''){
        let update_profile=create_Element('button','Update',{id:'update_profile',class:"button button-secondary",style:'margin-left: 5px;\n' +
              'margin-right: -16px;background-color: tomato;border-color: tomato;'});
        let update_form=create_Element('form','',{class:'modal-content',style:'background-color: azure;width: 197px;margin-left: 6px;color: orangered;display: block;'});
        update_form.style.display='block';
        update_email=create_Element('input','Email :',{type:"text",placeholder:'Email'});
        update_name=create_Element('input','Name: ',{type:"text",placeholder:'Name'});
        update_password=create_Element('input','Password: ',{type:"text",placeholder:'Password'});
        submit=create_Element('input','',{id:"update_submit",type:'submit',value:'submit',
          name:'submit',class:"post_input",style:'width: 131px;margin-left: 0px;margin-top: 0px;font-size: inherit;'});
        update_form.append(update_email,update_name,update_password,submit);

        form.append(update_profile,update_form);
      }

      let id= create_Element('tr','ID: ',{});
      let username=create_Element('tr','Username: ',{});
      let email=create_Element('tr','Email: ',{});
      let name=create_Element('tr','Name: ',{});
      let total_posts=create_Element('tr','Total Posts: ',{});
      let following=create_Element('tr','Following: ',{});
      let followed=create_Element('tr','Followed: ',{});
      let total_upvotes=create_Element('tr','Total Upvotes: 0',{});
      let url = `${apiUrl}/user/` + extra_link;
      let options={
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'accept':'application/json',
          'Authorization': 'Token '+MYNAME.token
        },
      };
      fetch(url,options)
          .then(Response=>{
            MYNAME.get_user_status_code=Response.status;
            return Response.json();
          })
          //deal with response body according to status_code
          .then(res=> {
            //if status_code is not 200: catch error and alert error
            if (MYNAME.get_user_status_code!==200){
              return Promise.reject(res["message"]);
            }
            //if status_code is 200: upvote successful, change the button color.
            else{
              id.innerText=id.innerText+res['id'];
              username.innerText=username.innerText+res['username'];
              email.innerText=email.innerText+res['email'];
              name.innerText=name.innerText+res['name'];
              total_posts.innerText=total_posts.innerText+res['posts'].length;
              following.innerText=following.innerText+res['following'].length;
              followed.innerText=followed.innerText+res['followed_num'];
              //update_profile ////my main profile
              if (submit!=null){
                //Add a list of everyone a user follows in their profile page.
                let following_list=create_Element('tr','Following List:',{});
                function append_following_list(wanna_get){
                  following_list.innerText+=' '+wanna_get['username'];
                }
                for (let following_id of res['following']){
                  get_user({username:'',id:following_id},{username:''},append_following_list);
                }
                form.insertBefore(following_list,form.lastElementChild);
                //update_profile ////my main profile
                submit.addEventListener('click',(event)=>{
                  event.preventDefault();
                  update_profile(update_email.value,update_name.value,update_password.value,email,name);
                });
              }
              // other people's profile page  ////add follow button if this user is not me who logged in
              else{
                //If this user is not me, add follow button
                if (res['username']!==MYNAME.payload['username']){
                  let follow_button=create_Element('button','Follow',{class:'button button-primary',style:'float: right;\n' +
                        'margin: 5px;'});
                  //according to my following list and rejudge the upvote_button_color
                  //if the user's id in the following list already
                  function do_follow_after_get_my_info(wanna_get){
                    if (wanna_get['following'].indexOf(res['id'])!==-1){
                        follow_button.className='button button-secondary';
                      }
                      //if the user's id not in the upvotes list
                      else {
                        follow_button.className="button button-primary";
                      }

                      follow_button.onclick=(event)=>{
                        event.preventDefault();
                        do_follow(res['username'],event,followed)
                      };
                  }
                  get_user({username:'',id:''},{following:''},do_follow_after_get_my_info);
                  form.insertBefore(follow_button,form.firstElementChild);
                }
              }
              //make feed posts
              let post_id_list=res['posts'];
              for (let id of post_id_list){
                let url=`${apiUrl}/post/?id=${id}`;
                fetch(url,options)
                    .then(res=>res.json())
                    .then(json=>{
                      total_upvotes.innerText='Total Upvotes: '+(parseInt(total_upvotes.innerText.substring(15))+parseInt(json['meta']['upvotes'].length));
                      make_feed({'posts':[json]}, feed_ul);
                    })
              }
            }
          }).catch(err=>alert(err));

      form.append(id,username,email,name,total_posts,following,followed,total_upvotes);
      form.onclick=(event)=>{event.stopPropagation()};
      feed_ul.onclick=(event)=>{event.stopPropagation()};
      modal_div.addEventListener('click',(event)=>{
        event.stopPropagation();
        modal_div.style.display='none';
      });
      modal_div.append(form,feed_ul);
      profile.appendChild(modal_div);
    }

    profile.onclick=()=>{
      if (profile.querySelector('.modal')){
        profile.removeChild(profile.querySelector('.modal'));
      }
      make_post_page_modal();
      profile.firstElementChild.style.display='block';
    };
    // window.addEventListener('click',(event)=>{
    //   if(event.target==profile.firstElementChild){
    //     profile.firstElementChild.style.display='none';
    //   }
    // });
  }


/////---------------------------------------------------------------------------------level 3
//Q9 infinite_scroll
  function infinite_scroll(){
    let feed=document.getElementById('feed');
    //continue get other feed
    MYNAME.start_post=10;

    window.addEventListener('scroll', function () {
      if (window.innerHeight + window.pageYOffset === document.body.scrollHeight) {
        // console.log(window.innerHeight, window.pageYOffset, document.body.scrollHeight);
        //------------------
        scroll_feed(MYNAME.start_post, 1);
        MYNAME.start_post += 1;
      }
    })

  }

  function scroll_feed(){
    let url=`${apiUrl}/user/feed?p=${MYNAME.start_post}&n=${1}`;
    let options={
      method:'GET',
      headers:{
        "Authorization":'Token '+ MYNAME.token,
        'Content-Type':'application/json',
        'accept':'application/json'
      },
    };
    fetch(url,options)
        .then(res=>res.json())
        .then(json=>{
          make_feed(json);
        });
  }
//Q10 write comment done in the make_feed
//Q11 update profile
  function update_profile(new_email,new_name,new_password,email_node,name_node){
    let url=`${apiUrl}/user/`;
    let options={
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'accept':'application/json',
        'Authorization': 'Token '+MYNAME.token
      },
      body:JSON.stringify({"email": new_email,
        "name": new_name,
        "password": new_password})
    };

    fetch(url,options)
        .then(Response=>{
          MYNAME.get_user_status_code=Response.status;
          return Response.json();
        })
        //deal with response body according to status_code
        .then(res=> {
          //if status_code is not 200: catch error and alert error
          if (MYNAME.get_user_status_code !== 200) {
            return Promise.reject(res["message"]);
          }
          //if status_code is 200: upvote successful, change the button color.
          else {
              if(new_email){
                email_node.innerText='Email: '+ new_email;
              }
              if(new_name){
                name_node.innerText='Name: ' + new_name;
              }
          }
        }).catch(err=>alert(err));
  }
//Q12 user page(made in Q8 profile)
//Q13 follow/unfollow
  function do_follow(username,event,node_of_followed_num){
    //if button color is white, can follow
    let url;
    let options;
    if (event.target.className==='button button-primary'){
      url=`${apiUrl}/user/follow?username=${username}`;
      options={
        method:'PUT',
        headers:{
          "Authorization":'Token ' + MYNAME.token,
          'Content-Type':'application/json',
          'accept':'application/json'
        }
      };
    }
    //if button color is blue, delete upvote
    else{
      url=`${apiUrl}/user/unfollow?username=${username}`;
      options={
        method:'PUT',
        headers:{
          "Authorization":'Token ' + MYNAME.token,
          'Content-Type':'application/json',
          'accept':'application/json'
        }
      };
    }
    fetch(url,options)
        .then(Response=>{
          MYNAME.status_code=Response.status;
          return Response.json();
        })
        //deal with response body according to status_code
        .then(res=> {
          //if status_code is not 200: catch error and alert error
          if (MYNAME.status_code!==200){
            return Promise.reject(res["message"]);
          }
          //if status_code is 200: upvote successful, change the button color.
          else{
            //if button color is white, can follow
            if (event.target.className==='button button-primary'){
              alert("Follow Successfully!");
              event.target.className='button button-secondary';
              node_of_followed_num.innerText='Followed:'+ (parseInt(node_of_followed_num.innerText.slice(9,))+1);
            }
            //if button color is blue, can unfollow
            else{
              alert("Unfollow Successfully!");
              event.target.className='button button-primary';
              node_of_followed_num.innerText='Followed:'+ (parseInt(node_of_followed_num.innerText.slice(9,))-1);
            }
          }
        }).catch(err=>alert(err));
  }
//Q14  Delete/Update Post Let a logged in user update a post they made or delete it via (DELETE /post) or (PUT /post)
  function delete_post(post_id){
    var url=`${apiUrl}/post/?id=${post_id}`;
    let options={
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'accept':'application/json',
        'Authorization': 'Token '+MYNAME.token
      },
    };
    fetch(url,options)
        .then(Response=>{
          MYNAME.post_status_code=Response.status;
          return Response.json();
        })
        //deal with response body according to status_code
        .then(res=> {
          //if status_code is not 200: catch error and alert error
          if (MYNAME.post_status_code!==200){
            return Promise.reject(res["message"]);
          }
          //if status_code is 200: upvote successful, change the button color.
          else{
            alert('Delete Post Successfully!');
            get_feed(MYNAME.token);
          }
        }).catch(err=>alert(err));
  }
//Q15 search functionality
  function search_function() {
    let search=document.getElementById('search');
    let feed = document.getElementById('feed');
    search.addEventListener('keyup',(event)=>{
      if (event.keyCode=='13' && search.value!=''){
        delete_feed();
        get_user({username:MYNAME.payload['usernmae'],id:''},{following: ''},function(wanna_get){
          for (let id of wanna_get['following']){
            get_user({username:'',id:id},{posts:''},function(wanna_get_posts){
              for (let post_id of wanna_get_posts['posts']) {
                let url = `${apiUrl}/post/?id=${post_id}`;
                let options = {
                  method: 'GET',
                  headers: {
                    "Authorization": 'Token ' + MYNAME.token,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                  }
                };
                fetch(url, options)
                    .then(Response => Response.json())
                    .then(json=>{
                      let content=json['title']+' '+json['text'];
                      let regexp=new RegExp("\\b"+search.value+'\\b','i');
                      if (content.search(regexp)!==-1){
                        make_li(json,feed);
                      }
                    })
              }
            })
          }
        })
      }
      else if(event.keyCode=='13' && search.value==''){
        get_feed(MYNAME.token);
      }
    })
  }



}


export default initApp;
