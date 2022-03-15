$(document).ready(function () {
    $(".table .eBtn").on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');

        $.get(href, function (user, status) {
            $("#modal_id").val(user.id);
            $("#modal_firstName").val(user.name);
            $("#modal_lastName").val(user.lastName);
            $("#modal_password").val(user.password);
            $("#modal_email").val(user.email);
            $("#modal_age").val(user.age);
        });
        $('#editModal').modal();
    });
});