function login(){


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

        }
    })
}