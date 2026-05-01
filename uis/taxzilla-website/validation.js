const form = document.getElementById('applicationForm');
const formAlert = document.getElementById('formAlert');
const clearFormButton = document.getElementById('clearFormButton');

const fields = {
  fullName: document.getElementById('fullName'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  clientType: document.getElementById('clientType'),
  serviceInterest: document.getElementById('serviceInterest'),
  annualIncome: document.getElementById('annualIncome'),
  currentProfession: document.getElementById('currentProfession'),
  businessName: document.getElementById('businessName'),
  monthlyReceipts: document.getElementById('monthlyReceipts'),
  state: document.getElementById('state'),
  consultationDate: document.getElementById('consultationDate'),
  painPoint: document.getElementById('painPoint'),
  consent: document.getElementById('consent')
};

const errorEls = {
  fullName: document.getElementById('fullName-error'),
  email: document.getElementById('email-error'),
  phone: document.getElementById('phone-error'),
  clientType: document.getElementById('clientType-error'),
  serviceInterest: document.getElementById('serviceInterest-error'),
  annualIncome: document.getElementById('annualIncome-error'),
  currentProfession: document.getElementById('currentProfession-error'),
  businessName: document.getElementById('businessName-error'),
  monthlyReceipts: document.getElementById('monthlyReceipts-error'),
  state: document.getElementById('state-error'),
  consultationDate: document.getElementById('consultationDate-error'),
  bookkeepingMethod: document.getElementById('bookkeepingMethod-error'),
  mileageTracking: document.getElementById('mileageTracking-error'),
  services: document.getElementById('services-error'),
  painPoint: document.getElementById('painPoint-error'),
  consent: document.getElementById('consent-error')
};

const radioGroups = ['bookkeepingMethod', 'mileageTracking'];

function setFieldState(input, errorEl, message) {
  if (!input || !errorEl) return;

  errorEl.textContent = message;

  if (input.type === 'checkbox' || input.type === 'radio') {
    if (message) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
    return;
  }

  if (message) {
    input.classList.add('border-red-600', 'ring-red-200');
    input.classList.remove('border-slate-300');
    input.setAttribute('aria-invalid', 'true');
  } else {
    input.classList.remove('border-red-600', 'ring-red-200');
    input.classList.add('border-slate-300');
    input.removeAttribute('aria-invalid');
  }
}

function setGroupError(groupName, message) {
  const el = errorEls[groupName];
  if (!el) return;
  el.textContent = message;
}

function validateTextPattern(value, pattern) {
  return pattern.test(value.trim());
}

function validateConsultationDate(value) {
  if (!value) return false;
  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today;
}

function getSelectedRadioValue(name) {
  const selected = form.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : '';
}

function getSelectedServices() {
  return [...form.querySelectorAll('input[name="services"]:checked')];
}

function hideAlert() {
  if (!formAlert) return;
  formAlert.classList.add('hidden');
  formAlert.textContent = '';
}

function clearAllErrors() {
  Object.keys(errorEls).forEach((key) => {
    errorEls[key].textContent = '';
  });

  Object.values(fields).forEach((field) => {
    if (field.type !== 'checkbox' && field.type !== 'radio') {
      field.classList.remove('border-red-600', 'ring-red-200');
      field.classList.add('border-slate-300');
    }
    field.removeAttribute('aria-invalid');
  });
}

function showAlert(type, message) {
  if (!formAlert) return;
  formAlert.classList.remove('hidden', 'border-red-200', 'bg-red-50', 'text-red-800', 'border-emerald-200', 'bg-emerald-50', 'text-emerald-800');

  if (type === 'error') {
    formAlert.classList.add('border-red-200', 'bg-red-50', 'text-red-800');
  }

  if (type === 'success') {
    formAlert.classList.add('border-emerald-200', 'bg-emerald-50', 'text-emerald-800');
  }

  formAlert.textContent = message;
}

function validateRadioGroup(groupName) {
  if (!getSelectedRadioValue(groupName)) {
    setGroupError(groupName, 'Please select one option.');
    return false;
  }
  setGroupError(groupName, '');
  return true;
}

function validateServices() {
  if (getSelectedServices().length === 0) {
    setGroupError('services', 'Select at least one service of interest.');
    return false;
  }
  setGroupError('services', '');
  return true;
}

function validateField(fieldName) {
  switch (fieldName) {
    case 'fullName': {
      const fullName = fields.fullName.value.trim();
      const message = validateTextPattern(fullName, /^[A-Za-z\s'-]{2,80}$/)
        ? ''
        : 'Please enter a valid full name (letters, spaces, apostrophes, or hyphens).';
      setFieldState(fields.fullName, errorEls.fullName, message);
      return !message;
    }
    case 'email': {
      const email = fields.email.value.trim();
      const message = validateTextPattern(email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
        ? ''
        : 'Please enter a valid email address.';
      setFieldState(fields.email, errorEls.email, message);
      return !message;
    }
    case 'phone': {
      const phone = fields.phone.value.trim();
      const message = validateTextPattern(phone, /^\+?[0-9()\s-]{10,20}$/)
        ? ''
        : 'Please enter a valid phone number with 10 to 20 digits/characters.';
      setFieldState(fields.phone, errorEls.phone, message);
      return !message;
    }
    case 'clientType': {
      const message = fields.clientType.value ? '' : 'Please choose your client type.';
      setFieldState(fields.clientType, errorEls.clientType, message);
      validateField('businessName');
      return !message;
    }
    case 'annualIncome': {
      const message = fields.annualIncome.value ? '' : 'Please choose your annual income range.';
      setFieldState(fields.annualIncome, errorEls.annualIncome, message);
      return !message;
    }
    case 'serviceInterest': {
      const message = fields.serviceInterest.value ? '' : 'Please choose a service interest tier.';
      setFieldState(fields.serviceInterest, errorEls.serviceInterest, message);
      return !message;
    }
    case 'currentProfession': {
      const message = validateTextPattern(fields.currentProfession.value, /^[A-Za-z0-9\s&.,'\/-]{2,120}$/)
        ? ''
        : 'Please enter your current profession or industry.';
      setFieldState(fields.currentProfession, errorEls.currentProfession, message);
      return !message;
    }
    case 'businessName': {
      const needsBusinessName = fields.clientType.value === 'business' || fields.clientType.value === 'both';
      const valid = validateTextPattern(fields.businessName.value, /^[A-Za-z0-9\s&.,'-]{2,120}$/);
      const message = needsBusinessName && !valid ? 'Business name is required for business applicants.' : '';
      setFieldState(fields.businessName, errorEls.businessName, message);
      return !message;
    }
    case 'monthlyReceipts': {
      const receipts = Number(fields.monthlyReceipts.value);
      const isValid = Number.isInteger(receipts) && receipts >= 0 && receipts <= 20000;
      const message = isValid ? '' : 'Enter a whole number between 0 and 20,000.';
      setFieldState(fields.monthlyReceipts, errorEls.monthlyReceipts, message);
      return !message;
    }
    case 'state': {
      const state = fields.state.value.trim().toUpperCase();
      fields.state.value = state;
      const message = validateTextPattern(state, /^[A-Z]{2}$/)
        ? ''
        : 'Enter a valid 2-letter US state code (example: AL).';
      setFieldState(fields.state, errorEls.state, message);
      return !message;
    }
    case 'consultationDate': {
      const message = validateConsultationDate(fields.consultationDate.value)
        ? ''
        : 'Choose today or a future date for consultation.';
      setFieldState(fields.consultationDate, errorEls.consultationDate, message);
      return !message;
    }
    case 'painPoint': {
      const painPoint = fields.painPoint.value.trim();
      const message = painPoint.length >= 20 && painPoint.length <= 500
        ? ''
        : 'Describe your pain point in 20 to 500 characters.';
      setFieldState(fields.painPoint, errorEls.painPoint, message);
      return !message;
    }
    case 'consent': {
      const message = fields.consent.checked ? '' : 'You must confirm consent before submitting.';
      errorEls.consent.textContent = message;
      if (message) {
        fields.consent.setAttribute('aria-invalid', 'true');
      } else {
        fields.consent.removeAttribute('aria-invalid');
      }
      return !message;
    }
    default:
      return true;
  }
}

function validateForm() {
  clearAllErrors();
  let valid = true;

  ['fullName', 'email', 'phone', 'clientType', 'serviceInterest', 'annualIncome', 'currentProfession', 'businessName', 'monthlyReceipts', 'state', 'consultationDate', 'painPoint', 'consent'].forEach((fieldName) => {
    if (!validateField(fieldName)) valid = false;
  });

  radioGroups.forEach((groupName) => {
    if (!validateRadioGroup(groupName)) valid = false;
  });

  if (!validateServices()) valid = false;

  return valid;
}

if (clearFormButton) {
  clearFormButton.addEventListener('click', () => {
    form.reset();
    clearAllErrors();
    hideAlert();
  });
}

const interactiveFields = form.querySelectorAll('input, select, textarea');
interactiveFields.forEach((fieldEl) => {
  fieldEl.addEventListener('blur', () => {
    const fieldName = fieldEl.name;

    if (radioGroups.includes(fieldName)) {
      validateRadioGroup(fieldName);
      hideAlert();
      return;
    }

    if (fieldName === 'services') {
      validateServices();
      hideAlert();
      return;
    }

    if (fieldName && fields[fieldName]) {
      validateField(fieldName);
      hideAlert();
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isValid = validateForm();
  if (!isValid) {
    showAlert('error', 'Please correct the highlighted errors before submitting your application.');
    return;
  }

  hideAlert();
  form.innerHTML = `
    <div class="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-emerald-900 shadow-sm" role="status" aria-live="polite">
      <h2 class="text-3xl font-display leading-none">Success!</h2>
      <p class="mt-3 text-base font-semibold">Your application has been validated and submitted successfully.</p>
    </div>
  `;
});

form.addEventListener('input', () => {
  hideAlert();
});
