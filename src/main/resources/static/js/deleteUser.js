$(document).ready(function () {
    $(".table .dBtn").on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');

        $.get(href, function (user, status) {
            $("#deleteModal_id").val(user.id);
            $("#deleteModal_firstName").val(user.name);
            $("#deleteModal_lastName").val(user.lastName);
            $("#deleteModal_email").val(user.email);
            $("#deleteModal_age").val(user.age);
        });
        $('#deleteModal').modal();
    });
});