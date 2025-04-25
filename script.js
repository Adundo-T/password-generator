let passwordHistory = [];

function generatePassword() {
  let length = parseInt(document.getElementById('length').value);
  const includeLower = document.getElementById('includeLower').checked;
  const includeUpper = document.getElementById('includeUpper').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSymbols = document.getElementById('includeSymbols').checked;

  if (isNaN(length) || length < 4 || length > 50) {
    alert("Please choose a length between 4 and 50.");
    return;
  }
   // ✅ Check if at least one character type is selected
   if (!includeLower && !includeUpper && !includeNumbers && !includeSymbols) {
    alert("Please select at least one character type!");
    return;
  }

  let charSet = '';
  if (includeLower) charSet += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUpper) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) charSet += '0123456789';
  if (includeSymbols) charSet += '!@#$%^&*()';

  if (charSet === '') {
    alert("Please select at least one character type.");
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  document.getElementById('passwordOutput').textContent = password;

  // Add to history (keep only last 5)
  if (passwordHistory.length >= 5) {
    passwordHistory.shift();
  }
  passwordHistory.push(password);
  updateHistory();

  // Calculate password strength
  const strength = calculateStrength(password, length, includeLower, includeUpper, includeNumbers, includeSymbols);
  document.getElementById('strengthIndicator').textContent = "Strength: " + strength;
}

function addAutoGenerateListeners() {
  const inputs = document.querySelectorAll(
    '#length, #includeLower, #includeUpper, #includeNumbers, #includeSymbols'
  );

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const autoGenerateEnabled = document.getElementById('autoGenerate').checked;
      if (autoGenerateEnabled) {
        generatePassword();
      }
    });
  });
}


function copyToClipboard() {
  const password = document.getElementById('passwordOutput').textContent;
  if (password === 'Your password will appear here' || password === '') {
    alert("Please generate a password first.");
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);

  showToast("Password copied to clipboard!");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2500);
}

function updateHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';

  passwordHistory.forEach(function(password) {
    const listItem = document.createElement('li');
    listItem.textContent = password;
    historyList.appendChild(listItem);
  });
}

function clearHistory() {
  passwordHistory = [];
  updateHistory();
}

function toggleDarkMode() {
  const body = document.body;
  const button = document.querySelector('button[onclick="toggleDarkMode()"]');

  body.classList.toggle('dark-mode');

  // Update button text based on the mode
  if (body.classList.contains('dark-mode')) {
    button.textContent = 'Light Mode';  // Change text to Light Mode in dark mode
  } else {
    button.textContent = 'Dark Mode';   // Change text to Dark Mode in light mode
  }
}

// Call auto-generate listener after DOM is ready
window.addEventListener('DOMContentLoaded', addAutoGenerateListeners);






  