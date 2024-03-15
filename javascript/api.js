function login(){

   const data={
        password: document.querySelector('#password').value,
        email: document.querySelector('#email').value
    }

fetch("/login",{
    method:"POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)

})
    .then (response => {
        if(!response.ok){
            response.json().then(answer => {
                const div=document.createElement("div")
                const style=[
                 "bg-red-500",
                 "p-4"
                ]
                div.textContent=answer.error
                document.body.appendChild(div)
            })
        } else {
            response.json().then(answer => {
        setCookie('name',answer.name,1)

        setCookie('email',answer.email,1)

        document.location.href="/"

        }
            )
    }})
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }