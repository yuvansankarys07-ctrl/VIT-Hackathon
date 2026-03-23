const tabs = document.querySelectorAll('.tab');
const title = document.getElementById('form-title');
const form = document.getElementById('auth-form');
const submitBtn = document.getElementById('submit-btn');
const forgotWrap = document.getElementById('forgot-wrap');
const footerText = document.getElementById('footer-text');
const footerLink = document.getElementById('footer-link');

const signupOnlyFields = document.querySelectorAll('.signup-only');

let currentMode = 'login';

function setMode(mode) {
  currentMode = mode;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.mode === mode;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  const isSignup = mode === 'signup';

  signupOnlyFields.forEach((field) => {
    field.classList.toggle('hidden', !isSignup);

    const input = field.querySelector('input');
    if (!input) return;

    if (isSignup) {
      input.setAttribute('required', 'required');
    } else {
      input.removeAttribute('required');
      input.value = '';
    }
  });

  title.textContent = isSignup ? 'Signup Form' : 'Login Form';
  submitBtn.textContent = isSignup ? 'Signup' : 'Login';
  forgotWrap.classList.toggle('hidden', isSignup);
  footerText.firstChild.textContent = isSignup ? 'Already a member? ' : 'Not a member? ';
  footerLink.textContent = isSignup ? 'Login now' : 'Signup now';
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => setMode(tab.dataset.mode));
});

footerLink.addEventListener('click', (event) => {
  event.preventDefault();
  const nextMode = currentMode === 'login' ? 'signup' : 'login';
  setMode(nextMode);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (currentMode === 'signup') {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  }

  alert(currentMode === 'login' ? 'Login successful!' : 'Signup successful!');
  form.reset();
  if (currentMode === 'signup') {
    setMode('login');
  }
});

setMode('login');
