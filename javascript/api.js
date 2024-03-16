function login() {

    const data = {
        password: document.querySelector('#password').value,
        email: document.querySelector('#email').value
    }

    fetch("/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    })
        .then(response => {
            if (!response.ok) {
                response.json().then(answer => {
                    const div = document.createElement("div")
                    const style = [
                        "bg-red-500",
                        "p-4",
                        "mx-auto",
                        "text-white",
                        "w-1/4"
                    ]
                    style.forEach(element => div.classList.add(element))

                    div.textContent = answer.error
                    document.body.appendChild(div)
                })
            } else {
                response.json().then(answer => {
                    setCookie('name', answer.name, 1)

                    setCookie('email', answer.email, 1)

                    document.location.href = "/"

                }
                )
            }
        })
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



function register() {

    const data = {
        name: document.querySelector('#name').value,
        password: document.querySelector('#password').value,
        email: document.querySelector('#email').value
    }

    fetch("/users/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    })
        .then(response => {
            if (!response.ok) {
                response.json().then(answer => {
                    const div = document.createElement("div")
                    const style = [
                        "bg-red-500",
                        "p-4",
                        "mx-auto",
                        "text-white",
                        "w-1/4"
                    ]
                    style.forEach(element => div.classList.add(element))

                    div.textContent = answer.error
                    document.body.appendChild(div)
                })
            } else {
                response.json().then(() => {
                    setCookie('name', data.name, 1)

                    setCookie('email', data.email, 1)

                    document.location.href = "/"

                }
                )
            }
        })
}

function CreateEventCard(event) {
    const Parent = document.createElement('div')
    Parent.className = "flex relative shadow-md shadow-slate-600 m-10 flex-col items-center w-80 h-fit bg-gg-secondary border-2 border-white rounded-xl py-7 px-12"
    Parent.dataset.eventName = event.name_event

    const ImageContainer = document.createElement('div')
    ImageContainer.className = "w-fit h-fit flex justify-center items-center"
    const image = document.createElement('img')
    image.className = "border-1 shadow-md border-white rounded-xl"
    image.src = event.photo
    const title = document.createElement('h3')
    title.textContent = event.name_event
    title.className = "pt-3 font-bold text-lg text-center text-gg-light-gray"
    const description = document.createElement('p')
    description.textContent = event.description
    description.className = "text-sm text-center"

    const myDate = new Date(event.date)

    const buttonsContainer = document.createElement('div')
    buttonsContainer.className = "flex flex-col justify-center items-center w-fit h-fit my-4 gap-y-3.5"
    const SignupButton = document.createElement('button')
    SignupButton.className = "border-2 border-gg-dark-gray rounded-2xl px-4 py-1 px-4 text-gg-dark-gray font-bold text-center hover:bg-gg-accent hover:text-slate-700 transition ease-in-out duration-450"
    SignupButton.onclick = () => SignUpForEvent(event)
    const SeemoreButton = document.createElement('button')
    SeemoreButton.className = "border-2 border-gg-dark-gray rounded-2xl px-4 py-1 px-4 text-gg-dark-gray font-bold text-center hover:bg-gg-accent hover:text-slate-700 transition ease-in-out duration-450"
    const placesDiv = document.createElement('div')
    const eventDateElement = document.createElement('h1')
    eventDateElement.textContent = myDate.getDate() + '.' + myDate.getMonth() + '.' + myDate.getFullYear()
    const PlacesRemaining = document.createElement('h1')
    placesDiv.className = "w-fit h-fit border-b-2 border-gg-dark-gray px-4 py-2"
    PlacesRemaining.textContent = 'Places remaining: ' + event.places
    const link = document.createElement('a')
    link.className = "mt-2 underline text-blue-600 text-center"
    SignupButton.textContent = "Sign up"
    SeemoreButton.textContent = "See more"


    // add a button to delete the event if the event owner is the current user
    const user = getCookie("email")
    if (event?.owner == user) {
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '&times;'
        deleteButton.className = 'absolute right-1 top-1 border-2 border-gg-dark-gray rounded-full px-2 text-gg-dark-gray font-bold text-center hover:bg-slate-700 hover:text-red-400 transition ease-in-out duration-450'
        deleteButton.onclick = () => { DeleteEvent(event) }
        Parent.appendChild(deleteButton)
    }


    Parent.appendChild(ImageContainer)
    ImageContainer.appendChild(image)
    Parent.appendChild(title)
    Parent.appendChild(description)

    buttonsContainer.appendChild(SignupButton)
    buttonsContainer.appendChild(SeemoreButton)
    placesDiv.appendChild(PlacesRemaining)
    // placesDiv.appendChild()
    Parent.appendChild(buttonsContainer)
    Parent.appendChild(placesDiv)
    Parent.appendChild(link)
    Parent.appendChild(eventDateElement)

    return Parent;

}

function GetEvents() {
    fetch("/events", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .then(response => {
            if (!response.ok) {
                response.json().then(answer => {
                    const div = document.createElement("div")
                    const style = [
                        "bg-red-500",
                        "p-4",
                        "mx-auto",
                        "text-white",
                        "w-1/4"
                    ]
                    style.forEach(element => div.classList.add(element))

                    div.textContent = answer.error
                    document.body.appendChild(div)
                })
            } else {
                response.json().then(events => {
                    events.forEach(e => {
                        const card = CreateEventCard(e)
                        document.querySelector('#all-events-container').appendChild(card)
                    })


                }
                )
            }
        })
}

function GetUpcomingEvents() {
    fetch("/events/upcoming", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .then(response => {
            if (!response.ok) {
                response.json().then(answer => {
                    const div = document.createElement("div")
                    const style = [
                        "bg-red-500",
                        "p-4",
                        "mx-auto",
                        "text-white",
                        "w-1/4"
                    ]
                    style.forEach(element => div.classList.add(element))

                    div.textContent = answer.error
                    document.body.appendChild(div)
                })
            } else {
                response.json().then(events => {
                    events.forEach(e => {
                        const card = CreateEventCard(e)
                        document.querySelector('#upcoming-events-container').appendChild(card)
                    })
                }
                )
            }
        })
}


function SignUpForEvent(event) {
    const email = getCookie("email")
    if (!email) {
        showToast("You need to be logged in to subscribe to events! We'll take you there in a moment...", 3)
        setTimeout(() => {
            document.location.href = "/logInPage.html"
        }, 3000);
        return
    }


    fetch("/events/" + event.name_event + "/sign_up", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    }).then(response => {
        if (!response.ok) {
            response.json().then(answer => {
                showToast(answer.error, 2)
            })
        } else {
            response.json().then(answer => {
                showToast(answer.message, 2)
            })
        }
    })
}

function GetUserEvents() {
    const email = getCookie("email")
    if (!email) {
        // user is not logged in
        showToast("You must log into the system to see your events!", 10)
        setTimeout(() => {
            document.location.href = "/logInPage.html"
        }, 3000);
        return
    }


    fetch("/users/" + email + "/events").then(response => {
        if (!response.ok) {
            response.json().then(answer => {
                showToast(answer.error, 2)
            })
        } else {
            response.json().then(events => {
                events.forEach(event => {
                    const card = CreateEventCard(event)
                    document.querySelector("#container").appendChild(card)
                })
            })
        }
    })
}

function showToast(message, duration) {
    const toast = document.querySelector("#toast");
    if (!toast) {
        console.log("Cannot find toast element")
        return
    }

    toast.textContent = message
    toast.classList.toggle("hidden")
    setTimeout(() => {
        toast.textContent = ''
        toast.classList.toggle("hidden")
    }, duration * 1000)
}

function CreateEvent() {
    const eventDate = new Date(document.querySelector("#date").value)
    const placesStr = document.querySelector("#places").value
    const numPlaces = parseInt(placesStr)

    const data = {
        name_event: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        places: numPlaces,
        photo: document.querySelector("#photo").value,
        date: `${eventDate.getDate()}.${eventDate.getMonth()}.${eventDate.getFullYear()}`
    }

    fetch("/events/create", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            response.json().then(answer => {
                showToast(answer.error, 2)
            })
        } else {
            response.json().then(answer => {
                showToast(answer.message, 2)
            })
        }
    })
}

function DeleteEvent(event) {
    fetch("/events/delete", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(event)
    }).then(response => {
        if (!response.ok) {
            response.json().then(answer => {
                showToast(answer.error, 2)
            })
        } else {
            response.json().then(answer => {
                showToast(answer.message, 2)
                document.querySelectorAll(`div[data-event-name='${event.name_event}']`).forEach(
                    eventCard => eventCard.remove()
                )
            })
        }
    })
}