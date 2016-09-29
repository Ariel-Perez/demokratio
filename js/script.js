$(document).ready(function() {
    document.getElementById('contact-form').onsubmit = function() {
        var data = formToJSON($('#contact-form'), 'follower');
        $.ajax({
            url: 'http://demokratio.herokuapp.com/followers/',
            data: data,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(response) {
                alert('Thank you for your interest!');
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert('There was an error while sending the form.');
            }
        });
        return false;
    };
});

function ajax(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('ready!');
        }};
    xhttp.open("POST", "http://demokratio.herokuapp.com/followers", true);
    xhttp.send(data);
}

function formToJSON(form, model) {
    var values = {};
    var inputs = form.find('input,select,textarea');
    inputs.each(function(idx, input) {
        if(input.name.indexOf(model) == 0) {
            var name = input.name.substr(model.length);
            name = name.substr(1, name.length - 2);

            console.log(name, input.type, input.value);
            if (input.type == "checkbox") {
                values[name] = input.hasAttribute("checked");
            } else {
                values[name] = input.value;
            }
        }
    });

    return JSON.stringify(values);
}