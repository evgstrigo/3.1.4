alert('Starting...')
const URL = "http://localhost:8080/admin/users"
const content = document.querySelector('tbody')
let results = ''

// Edit modal const
const id = document.getElementById('modal_id')
const name = document.getElementById('modal_firstName')
const lastName = document.getElementById('modal_lastName')
const age = document.getElementById('modal_age')
const email = document.getElementById('modal_email')
const passwd = document.getElementById('modal_password')


//Delete modal const
const deleteId = document.getElementById('deleteModal_id')
const deleteName = document.getElementById('deleteModal_firstName')
const deleteLastName = document.getElementById('deleteModal_lastName')
const deleteAge = document.getElementById('deleteModal_age')
const deleteEmail = document.getElementById('deleteModal_email')
const deletePasswd = document.getElementById('deleteModal_password')


//Create const
const createForm = document.getElementById('formAddNewUser')

const createName = document.getElementById('firstName')
const createLastName = document.getElementById('lastName')
const createAge = document.getElementById('age')
const createEmail = document.getElementById('email')
const createPasswd = document.getElementById('password')


// function per show results
const show = (users) => {
    users.forEach(user => {
        results += `<tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
<!--                            <td>${user.passwd}</td>-->
                            <td class="text-center"><a class="btnEdit btn btn-primary">Edit</a></td>
                            <td class="text-center"><a class="btnDelete btn btn-danger">Delete</a></td>
                       </tr>
                    `
    })
    content.innerHTML = results
}

//Show all elements
fetch(URL)
    .then(response => response.json())
    .then(data => show(data))
    .catch(error => console.log(error))


const on = (element, event, selector, handler) => {

    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

//Function Edit
let idForm = 0
on(document, 'click', '.btnEdit', e => {
    const line = e.target.parentNode.parentNode
    idForm = line.children[0].innerHTML
    const nameForm = line.children[1].innerHTML
    const lastNameForm = line.children[2].innerHTML
    const ageForm = line.children[3].innerHTML
    const emailForm = line.children[4].innerHTML
    const passwdForm = line.children[5].innerHTML

    id.value = idForm
    name.value = nameForm
    lastName.value = lastNameForm
    age.value = ageForm
    email.value = emailForm
    passwd.value = passwdForm

    $('#editModal').modal('show')
})



//Sending edited user to server
editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('SENDING EDITED USER')
    fetch( (URL), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id.value,
            name: name.value,
            lastName: lastName.value,
            age: age.value,
            email: email.value,
            passwd: passwd.value
        })
    })
        .then(response => response.json())
        .then(response => location.reload())

    editModal.hide()
    $('#editModal').modal('hide')

})



//Create form
createForm.addEventListener('submit', (e)=>{
    e.preventDefault()

        console.log('CREATE FORM')
        fetch(URL, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: createName.value,
                lastName: createLastName.value,
                age: createAge.value,
                email: createEmail.value,
                passwd: createPasswd.value
            })
        })
            .then( response => response.json() )
            .then( data => {
                const newUser = []
                newUser.push(data)
                show(newUser)
            }).then(response => location.reload())
})




//Function Delete
let idDeleteForm = 0
on(document, 'click', '.btnDelete', e => {
    console.log('btnDelete')
    const line = e.target.parentNode.parentNode
    console.log('line = ' + e.target.parentNode.parentNode)

    idDeleteForm = line.children[0].innerHTML
    console.log('idForm = ' + line.children[0].innerHTML)

    const nameDeleteForm = line.children[1].innerHTML
    console.log('nameForm = ' + line.children[1].innerHTML)

    const lastNameDeleteForm = line.children[2].innerHTML
    console.log('lastNameForm = ' + line.children[2].innerHTML)


    const ageDeleteForm = line.children[3].innerHTML
    console.log('ageForm = ' + line.children[3].innerHTML)


    const emailDeleteForm = line.children[4].innerHTML
    console.log('emailForm = ' + line.children[4].innerHTML)



    deleteId.value = idDeleteForm
    deleteName.value = nameDeleteForm
    deleteLastName.value = lastNameDeleteForm
    deleteAge.value = ageDeleteForm
    deleteEmail.value = emailDeleteForm

    $('#deleteModal').modal('show')
})

//Sending delete request
deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('SENDING DELETE REQUEST')
    fetch( (URL + '/' + idDeleteForm), {
        method: 'DELETE'})
        // .then( res => res.json() )
        .then( ()=> location.reload())
    $('#deleteModal').modal('hide')
})
