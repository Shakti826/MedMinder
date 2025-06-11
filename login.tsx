/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface User {
    id: string;
    username: string;
    password?: string; // Stored in plain text for simulation. DO NOT DO THIS IN PRODUCTION.
}

const USERS_STORAGE_KEY = 'medMinderUsers';
const LOGIN_CURRENT_USER_STORAGE_KEY = 'medMinderCurrentUser'; // Renamed for clarity within this module

// --- Utility Functions ---
function loginGenerateId(): string { // Renamed for clarity within this module
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

function getUsers(): User[] {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
}

function saveUsers(users: User[]): void {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function displayErrorMessage(formId: 'login' | 'register', message: string): void {
    const errorElement = document.getElementById(`${formId}-error-message`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrorMessage(formId: 'login' | 'register'): void {
    const errorElement = document.getElementById(`${formId}-error-message`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function setButtonLoadingState(buttonId: string, isLoading: boolean, defaultText: string): void {
    const button = document.getElementById(buttonId) as HTMLButtonElement | null;
    if (button) {
        if (isLoading) {
            button.disabled = true;
            button.textContent = 'Processing...';
        } else {
            button.disabled = false;
            button.textContent = defaultText;
        }
    }
}


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in, if so, redirect to main app
    if (localStorage.getItem(LOGIN_CURRENT_USER_STORAGE_KEY)) {
        window.location.href = 'index.html';
        return; // Stop further execution on this page
    }

    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const registerForm = document.getElementById('register-form') as HTMLFormElement;
    const showRegisterLink = document.getElementById('show-register-form') as HTMLAnchorElement;
    const showLoginLink = document.getElementById('show-login-form') as HTMLAnchorElement;

    // Toggle forms
    showRegisterLink?.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        clearErrorMessage('login');
        clearErrorMessage('register');
        (document.getElementById('register-username') as HTMLInputElement)?.focus();
    });

    showLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        clearErrorMessage('login');
        clearErrorMessage('register');
        (document.getElementById('login-username') as HTMLInputElement)?.focus();
    });

    // Login form submission
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrorMessage('login');
        const loginButton = document.getElementById('login-button') as HTMLButtonElement;
        const defaultButtonText = loginButton.textContent || "Login";
        setButtonLoadingState('login-button', true, defaultButtonText);


        const username = (document.getElementById('login-username') as HTMLInputElement).value.trim();
        const password = (document.getElementById('login-password') as HTMLInputElement).value;

        const users = getUsers();
        const user = users.find(u => u.username === username);

        setTimeout(() => { // Simulate network delay
            if (user && user.password === password) {
                localStorage.setItem(LOGIN_CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
                window.location.href = 'index.html'; // Redirect to main app
            } else {
                displayErrorMessage('login', 'Invalid username or password.');
            }
            setButtonLoadingState('login-button', false, defaultButtonText);
        }, 500);
    });

    // Registration form submission
    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrorMessage('register');
        const registerButton = document.getElementById('register-button') as HTMLButtonElement;
        const defaultButtonText = registerButton.textContent || "Register";
        setButtonLoadingState('register-button', true, defaultButtonText);

        const username = (document.getElementById('register-username') as HTMLInputElement).value.trim();
        const password = (document.getElementById('register-password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('register-confirm-password') as HTMLInputElement).value;

        if (!username || !password) {
            displayErrorMessage('register', 'Username and password are required.');
            setButtonLoadingState('register-button', false, defaultButtonText);
            return;
        }
        if (password.length < 6) {
             displayErrorMessage('register', 'Password must be at least 6 characters long.');
            setButtonLoadingState('register-button', false, defaultButtonText);
            return;
        }
        if (password !== confirmPassword) {
            displayErrorMessage('register', 'Passwords do not match.');
            setButtonLoadingState('register-button', false, defaultButtonText);
            return;
        }

        const users = getUsers();
        if (users.find(u => u.username === username)) {
            displayErrorMessage('register', 'Username already exists.');
            setButtonLoadingState('register-button', false, defaultButtonText);
            return;
        }
        
        setTimeout(() => { // Simulate network delay
            const newUser: User = { id: loginGenerateId(), username, password };
            users.push(newUser);
            saveUsers(users);
            localStorage.setItem(LOGIN_CURRENT_USER_STORAGE_KEY, JSON.stringify(newUser)); // Auto-login
            window.location.href = 'index.html'; // Redirect to main app
             setButtonLoadingState('register-button', false, defaultButtonText);
        }, 500);
    });

    // Set initial focus
    (document.getElementById('login-username') as HTMLInputElement)?.focus();

    // Basic i18n for static labels
    (document.getElementById('auth-title') as HTMLElement).textContent = "MedMinder";
    (document.getElementById('login-heading') as HTMLElement).textContent = "Login";
    (document.getElementById('login-username-label') as HTMLElement).textContent = "Username";
    (document.getElementById('login-password-label') as HTMLElement).textContent = "Password";
    (document.getElementById('login-button') as HTMLElement).textContent = "Login";
    (document.getElementById('login-toggle-text') as HTMLElement).innerHTML = `Don't have an account? <a href="#">Register here</a>`;
    (document.querySelector('#login-toggle-text a') as HTMLElement).onclick = (e) => {
        e.preventDefault(); showRegisterLink?.click();
    };


    (document.getElementById('register-heading') as HTMLElement).textContent = "Register";
    (document.getElementById('register-username-label') as HTMLElement).textContent = "Username";
    (document.getElementById('register-password-label') as HTMLElement).textContent = "Password";
    (document.getElementById('register-confirm-password-label') as HTMLElement).textContent = "Confirm Password";
    (document.getElementById('register-button') as HTMLElement).textContent = "Register";
    (document.getElementById('register-toggle-text') as HTMLElement).innerHTML = `Already have an account? <a href="#">Login here</a>`;
     (document.querySelector('#register-toggle-text a') as HTMLElement).onclick = (e) => {
        e.preventDefault(); showLoginLink?.click();
    };
});

export {}; // Treat this file as a module
