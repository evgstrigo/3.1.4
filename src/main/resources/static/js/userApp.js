
    const URL = "http://localhost:8080/admin/users";
    const userContainer = document.getElementById('myTable');
    // ******************* Обработка header'а // *********************
    let username = document.getElementById('headerUsername');
    let userRoles = document.getElementById('headerRoles');
    let userID;
    let userName;
    let userLastName;
    let userEmail;
    let userAge;

    function getUserAuthAndRenderTable() {
    fetch('http://localhost:8080/username')
        .then(response => response.json())
        .then(data => {
            username.innerText = data.username;
            userRoles.innerText = data.roles;
            userID = data.id;
            console.log(data.id)
            console.log(userID)
            if ( !userRoles.innerText.includes('ADMIN')) {
                console.log('No admin')
                document.getElementById("adminButton").hidden=true;
            }
            renderHTML(data);
        })
}

    getUserAuthAndRenderTable();


    function renderHTML(data) {
    let htmlString = '';
    htmlString += '<tr>';
    htmlString += '<td>' + data.id + '</td>';
    htmlString += '<td>' + data.name + '</td>';
    htmlString += '<td>' + data.lastName + '</td>';
    htmlString += '<td>' + data.age + '</td>';
    htmlString += '<td>' + data.email + '</td>';
    htmlString += '<td>' + data.roles + '</td>';
    htmlString += '</td>';
    htmlString += '</tr>';
    userContainer.innerHTML = htmlString;
}


