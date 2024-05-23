document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    
    authForm.addEventListener('submit', async (e) => {
        const formType = authForm.querySelector('input[name="formType"]').value;

        if (formType === 'login') {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/login/admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                if (!response.ok) {
                    const errorMessage = await response.text();
                    return;
                }

                const data = await response.json();
                localStorage.setItem('token', data.token);
                window.location.href = '/admin'; 
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
    });
});
