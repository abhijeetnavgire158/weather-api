console.log('CLIENT JS FILE');

fetch('/weather?search=pune').then(function(response) {
    return response.json();
}).then(function(data) {
    console.log(data);
}).catch(function(error) {
    console.log(error);
}).finally(function() {
    console.log('Final API CALLS End');
}); 