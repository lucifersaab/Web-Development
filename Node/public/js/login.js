document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        if (email === 'hashim138' && password === '1234') {
          window.location.href = '/admin';
        } else {
          alert('Invalid credentials. Please try again.');
        }
    });
});
