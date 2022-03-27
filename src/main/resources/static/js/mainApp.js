alert('Page is loaded');


// ******************* Обработка header'а // *********************
let username = document.getElementById('headerUsername');
let userRoles = document.getElementById('headerRoles');

function getUserAuth() {
    fetch('http://localhost:8080/username')
        .then(response => response.json())
        .then(data => {
            username.innerText = data.username;
            userRoles.innerText = data.roles;
        });

}

getUserAuth();

const URL = "http://localhost:8080/admin/users";
const userContainer = document.getElementById('myTable');


// ***************************** EDITING *********************************
// Edit modal const
const editModalWindow = new bootstrap.Modal(document.getElementById('modalWindow'));
const submitEditFormBtn = document.getElementById('submitEditForm');
const editUserFormId = document.getElementById('editUserFormId');
const editUserFormName = document.getElementById('editUserFormName');
const editUserFormLastName = document.getElementById('editUserFormLastName');
const editUserFormAge = document.getElementById('editUserFormAge');
const editUserFormEmail = document.getElementById('editUserFormEmail');
const editUserFormPassword = document.getElementById('editUserFormPassword');
// const editUserFormRoles = document.getElementById('editUserFormRoles');


// Открытие EDIT - модального окна и заполнение его данными пользователя

$(document).on('click', '#editBtn', function (event) {
    const line = event.target.parentNode.parentNode;
    const editFormId = line.children[0].innerHTML;
    const editFormName = line.children[1].innerHTML;
    const editFormLastName = line.children[2].innerHTML;
    const editFormAge = line.children[3].innerHTML;
    const editFormEmail = line.children[4].innerHTML;
    const editFormPassword = '';
    const editFormRoles = line.children[5].innerHTML;


    editUserFormId.value = editFormId;
    editUserFormName.value = editFormName;
    editUserFormLastName.value = editFormLastName;
    editUserFormAge.value = editFormAge;
    editUserFormEmail.value = editFormEmail;
    editUserFormPassword.value = editFormPassword;
    editUserFormRoles.value = editFormRoles;
    if (editFormRoles.includes('ADMIN')) {
        $('#optionAdmin').attr("selected", "selected")
    }
    if (editFormRoles.includes('USER')) {
        $('#optionUser').attr("selected", "selected")
    }
    console.log($("#editUserFormRoles")[0])
    openEditModal();
});

function openEditModal() {
    editModalWindow.show();
}


submitEditFormBtn.addEventListener('click', function (event) {
    event.preventDefault();
    editModalWindow.hide();
    updateCurrentUser();
})


// Updating user
function updateCurrentUser() {
    let currentPassword = ''
    // проверяем вводился ли пароль. если не вводился, отправляем в контроллер юзера с пустым паролем
    // в контроллере обработаем и при необходимости оставим прежний пароль или зашифруем новый
    if (editUserFormPassword.value !== '') {
        currentPassword = editUserFormPassword.value;
    }

    let jsonObj = {
        "id": editUserFormId.value,
        "name": editUserFormName.value,
        // "passwd": editUserFormPassword.value,
        "passwd": currentPassword,
        "lastName": editUserFormLastName.value,
        "email": editUserFormEmail.value,
        "age": editUserFormAge.value,
        "roles": []
    };

// Adding roles
    if ($('#editUserFormRoles').val().includes('ADMIN')) {
        jsonObj['roles'].push({
            "id": 1,
            "value": "ADMIN",
            "authority": "ADMIN"
        });
    }

// Adding roles
    if ($('#editUserFormRoles').val().includes('USER')) {
        jsonObj['roles'].push({
            "id": 2,
            "value": "USER",
            "authority": "USER"
        });
    }



    fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonObj),
    })
        .then(() => {
            console.log('Table reloaded');
            updateUsersData();   // перегружаем всю таблицу
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}




// ***************************** DELETING *********************************

// Delete modal const
const deleteModalWindow = new bootstrap.Modal(document.getElementById('deleteModalWindow'));
const submitDeleteFormBtn = document.getElementById('submitDeleteForm');
const deleteUserFormId = document.getElementById('deleteUserFormId');
const deleteUserFormName = document.getElementById('deleteUserFormName');
const deleteUserFormLastName = document.getElementById('deleteUserFormLastName');
const deleteUserFormAge = document.getElementById('deleteUserFormAge');
const deleteUserFormEmail = document.getElementById('deleteUserFormEmail');
let idToDelete;
// Открытие DELETE - модального окна и заполнение его данными пользователя
$(document).on('click', '#deleteBtn', function (event) {
    const line = event.target.parentNode.parentNode;
    // console.log(event.target.parentNode.parentNode.children[0].innerHTML)
    const deleteFormId = line.children[0].innerHTML;
    const deleteFormName = line.children[1].innerHTML;
    const deleteFormLastName = line.children[2].innerHTML;
    const deleteFormAge = line.children[3].innerHTML;
    const deleteFormEmail = line.children[4].innerHTML;


    deleteUserFormId.value = deleteFormId;
    deleteUserFormName.value = deleteFormName;
    deleteUserFormLastName.value = deleteFormLastName;
    deleteUserFormAge.value = deleteFormAge;
    deleteUserFormEmail.value = deleteFormEmail;
    idToDelete = deleteFormId;
    openDeleteModal();
});

function openDeleteModal() {
    deleteModalWindow.show();
}


submitDeleteFormBtn.addEventListener('click', function (event) {
    event.preventDefault();
    deleteModalWindow.hide();
    deleteCurrentUser(idToDelete);
})

// Deleting user
function deleteCurrentUser(id) {
    fetch(URL + '/' + id, {
        method: 'DELETE'
    })
        .then(() => {
            console.log('Table reloaded');
            updateUsersData();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


// ***************************** CREATING *********************************
const submitCreateFormBtn = document.getElementById('submitCreateForm')

const createUserFormName = document.getElementById('createUserFormName');
const createUserFormLastName = document.getElementById('createUserFormLastName');
const createUserFormAge = document.getElementById('createUserFormAge');
const createUserFormEmail = document.getElementById('createUserFormEmail');
const createUserFormPassword = document.getElementById('createUserFormPassword');
const createUserFormRoles = document.getElementById('createUserFormRoles');


submitCreateFormBtn.addEventListener('click', function (event) {
    event.preventDefault();
    createUser();

    $('#adminNavItem').tab('show')
    $("#createForm")[0].reset();
})


// Creating user
function createUser() {
    let jsonObj = {
        "name": createUserFormName.value,
        "passwd": createUserFormPassword.value,
        "lastName": createUserFormLastName.value,
        "email": createUserFormEmail.value,
        "age": createUserFormAge.value,
        "roles": []
    };


    if ($('#createUserFormRoles').val().includes('ADMIN')) {
        jsonObj['roles'].push({
            "id": 1,
            "value": "ADMIN",
            "authority": "ADMIN"
        });
    }

    if ($('#createUserFormRoles').val().includes('USER')) {
        jsonObj['roles'].push({
            "id": 2,
            "value": "USER",
            "authority": "USER"
        });
    }

    console.log(jsonObj);
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonObj),
    })
        .then(() => {
            console.log('Table reloaded');
            updateUsersData();   // перегружаем всю таблицу
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


// ***************************** UTIL *********************************


// Reloading userTable (used each time we make fetch)
updateUsersData();


// Rendering table
function updateUsersData() {
    fetch(URL)
        .then(response => response.json())
        .then(data => renderHTML(data));
    // alert("UserData updated!")
}

function renderHTML(data) {
    let htmlString = '';
    for (i = 0; i < data.length; i++) {
        htmlString += '<tr>';
        htmlString += '<td>' + data[i].id + '</td>';
        htmlString += '<td>' + data[i].name + '</td>';
        htmlString += '<td>' + data[i].lastName + '</td>';
        htmlString += '<td>' + data[i].age + '</td>';
        htmlString += '<td>' + data[i].email + '</td>';
        // htmlString += '<td>' + data[i].passwd + '</td>';   ПАРОЛЬ УДАЛЁН ИЗ ТАБЛИЦЫ ОТОБРАЖЕНИЯ
        htmlString += '<td>';
        for (ii = 0; ii < data[i].roles.length; ii++) {
            htmlString += data[i].roles[ii].value + ' ';
        }
        htmlString += '</td>';
        htmlString += '<td><button class="btn btn-info btn-sm" id="editBtn">Edit</button></td>';
        htmlString += '<td><button class="btn btn-danger btn-sm" id="deleteBtn">Delete</button></td>';
        htmlString += '</tr>';
    }
    userContainer.innerHTML = htmlString;
}