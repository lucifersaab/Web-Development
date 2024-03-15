var jsonPlaceholderURL = 'https://jsonplaceholder.typicode.com/users';

function displayReviews(){
    console.log("hey")
    $.ajax({
        url: jsonPlaceholderURL,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            console.log('JSONPlaceholder Response:', response);
        },
        error: function(error) {
            console.error('JSONPlaceholder Error:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', displayReviews);
