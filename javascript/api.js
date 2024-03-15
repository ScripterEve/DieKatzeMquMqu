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
                 "p-4",
                 "mx-auto",
                 "text-white",
                 "w-1/4"
                ]
                style.forEach(element => div.classList.add(element))
                    
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



  function register(){

    const data={
        name: document.querySelector('#name').value,
         password: document.querySelector('#password').value,
         email: document.querySelector('#email').value
     }
 
 fetch("/users/create",{
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
                  "p-4",
                  "mx-auto",
                  "text-white",
                  "w-1/4"
                 ]
                 style.forEach(element => div.classList.add(element))
                     
                 div.textContent=answer.error
                 document.body.appendChild(div)
             })
         } else {
             response.json().then(() => {
         setCookie('name',data.name,1)
 
         setCookie('email',data.email,1)
 
         document.location.href="/"
 
         }
             )
     }})
 }
 
 function CreateEventCard(inputImage, inputTitle, inputDescription, places) {
    const Parent = document.createElement('div')
    Parent.className = "flex shadow-md shadow-slate-600 m-10 flex-col items-center w-80 h-fit bg-gg-secondary border-2 border-white rounded-xl py-7 px-12"

    const ImageContainer = document.createElement('div')
    ImageContainer.className = "w-fit h-fit flex justify-center items-center"
    const image = document.createElement('img')
    image.className = "border-1 shadow-md border-white rounded-xl"
    image.src = inputImage
    const title = document.createElement('h3')
    title.textContent = inputTitle
    title.className = "pt-3 font-bold text-lg text-center"
    const description = document.createElement('p')
    description.textContent = inputDescription
    description.className = "text-sm text-center"


    const buttonsContainer = document.createElement('div')
    buttonsContainer.className = "flex flex-col justify-center items-center w-fit h-fit my-4 gap-y-3.5"
    const SignupButton = document.createElement('button')
    SignupButton.className = "border-2 border-white rounded-2xl px-4 py-1 shadow-inner shadow-slate-500 px-4 text-center hover:bg-gg-accent transition ease-in-out duration-450"
    const SeemoreButton = document.createElement('button')
    SeemoreButton.className = "border-2 border-white px-4 py-1 shadow-inner shadow-slate-500 rounded-2xl hover:bg-gg-accent transition ease-in-out duration-450"
    const placesDiv = document.createElement('div')
    const PlacesRemaining = document.createElement('h1')
    placesDiv.className = "w-fit h-fit border-2 border-white px-4 py-2 shadow-inner shadow-slate-500"
    PlacesRemaining.textContent = places
    const link = document.createElement('a')
    link.className = "mt-2 underline text-blue-600 text-center"
    SignupButton.textContent = "Sign up"
    SeemoreButton.textContent = "See more"

    

    Parent.appendChild(ImageContainer)
    ImageContainer.appendChild(image)
    Parent.appendChild(title)
    Parent.appendChild(description)

    buttonsContainer.appendChild(SignupButton)
    buttonsContainer.appendChild(SeemoreButton)
    placesDiv.appendChild(PlacesRemaining)
    Parent.appendChild(buttonsContainer)
    Parent.appendChild(placesDiv)
    Parent.appendChild(link)

    return Parent;

 }

 function GetEvents() {
    fetch("/events",{
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    
    })
        .then (response => {
            if(!response.ok){
                response.json().then(answer => {
                    const div=document.createElement("div")
                    const style=[
                     "bg-red-500",
                     "p-4",
                     "mx-auto",
                     "text-white",
                     "w-1/4"
                    ]
                    style.forEach(element => div.classList.add(element))
                        
                    div.textContent=answer.error
                    document.body.appendChild(div)
                })
            } else {
                response.json().then(events => {
                    events.forEach(e => {
                       const card = CreateEventCard(e.photo, e.name_event, e.description, e.places)
                                document.querySelector('#container').appendChild(card)
                    })
                    
    
            }
                )
        }})
    }