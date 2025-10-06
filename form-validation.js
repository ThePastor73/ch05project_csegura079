/*
  Author: Cristian Segura
  Date: 10/06/2025
  File: form-validation.js
  Description:
  This script provides client-side form validation for the Contact Form.
  It checks whether required fields are completed, validates email input length,
  and prevents form submission until all fields are correctly filled in.
*/

/*
  Function Name: checkMissing()
  Purpose:
  This function loops through all form elements with the class "required".
  It counts how many of those fields are still empty and updates the message
  below the form (in the <span> with the id "missing-count") to notify the user.
  The message appears in red if there are missing fields and turns green when
  all required fields have been filled correctly.
*/
function checkMissing() {
  const requiredFields = document.querySelectorAll('.required');
  let missingCount = 0;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      missingCount++;
    }
  });

  const messageSpan = document.getElementById('missing-count');
  if (messageSpan) {
    if (missingCount > 0) {
      messageSpan.textContent = `${missingCount} required field(s) still incomplete.`;
      messageSpan.style.color = "red";
    } else {
      messageSpan.textContent = "All required fields completed.";
      messageSpan.style.color = "green";
    }
  }

  return missingCount;
}

/*
  Function Name: validateEmail()
  Purpose:
  This function checks if the email input field has at least 8 characters.
  If the email is too short, it adds a CSS class named "invalid" that highlights
  the field with a red border and light red background. When the email input
  becomes valid, the "invalid" class is removed, restoring the field to its
  normal required styling.
*/
function validateEmail() {
  const emailInput = document.getElementById('email');
  if (!emailInput) return true;

  const isValid = emailInput.value.trim().length >= 8;
  if (!isValid) {
    emailInput.classList.add('invalid');
  } else {
    emailInput.classList.remove('invalid');
  }
  return isValid;
}

/*
  Function Name: validateForm()
  Purpose:
  This is a combined function that runs both checkMissing() and validateEmail()
  whenever the user clicks the "Submit Form" button. It uses alert messages to
  inform the user whether fields are missing or the email is invalid. If all
  validations pass, it displays a success message.
*/
function validateForm() {
  const missing = checkMissing();
  const emailOK = validateEmail();

  if (missing > 0 || !emailOK) {
    alert("⚠️ Please complete all required fields and ensure the email has at least 8 characters.");
  } else {
    alert("✅ Form submitted successfully!");
  }
}

/*
  This section waits until the DOM (HTML document) is fully loaded before
  attaching event listeners to the input fields and submit button. It ensures
  live feedback for users as they type, updating the missing count and email
  validation in real time.
*/
document.addEventListener('DOMContentLoaded', () => {
  const requiredFields = document.querySelectorAll('.required');
  const submitBtn = document.getElementById('submitBtn');

  // Run live checks as user types
  requiredFields.forEach(field => {
    field.addEventListener('input', () => {
      checkMissing();
      if (field.id === 'email') validateEmail();
    });
  });

  // Run combined validation when the button is clicked
  if (submitBtn) {
    submitBtn.addEventListener('click', validateForm);
  }
});








