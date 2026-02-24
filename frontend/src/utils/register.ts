interface CaptchaQuestion {
  question: string;
  answer: string;
}

class TecommersRegister {
  private form: HTMLFormElement | null;
  private successModal: HTMLElement | null;
  private countdownElement: HTMLElement | null;
  private submitBtn: HTMLElement | null;
  private resetBtn: HTMLElement | null;
  private continueBtn: HTMLElement | null;
  private captchaQuestions: CaptchaQuestion[];
  private isSubmitting: boolean;
  private countdown: number;
  private countdownInterval: NodeJS.Timeout | null;
  private currentCaptcha: CaptchaQuestion | null;
  private firstErrorField: string | null;
  private confirmPasswordTimeout: NodeJS.Timeout | null;

  constructor() {
    this.form = document.getElementById('registerForm') as HTMLFormElement;
    this.successModal = document.getElementById('successModal');
    this.countdownElement = document.getElementById('countdown');
    this.submitBtn = document.getElementById('submitBtn');
    this.resetBtn = document.getElementById('resetBtn');
    this.continueBtn = document.getElementById('continueBtn');
    
    this.captchaQuestions = [
      { question: "¿Cuál es el resultado de 7 + 5?", answer: "12" },
      { question: "¿Cuántos días tiene una semana?", answer: "7" },
      { question: "¿Cuánto es 5 + 4?", answer: "9" },
      { question: "¿Cuántos lados tiene un triángulo?", answer: "3" }
    ];
    
    this.isSubmitting = false;
    this.countdown = 5;
    this.countdownInterval = null;
    this.currentCaptcha = null;
    this.firstErrorField = null;
    this.confirmPasswordTimeout = null;
    
    this.init();
  }

  private init(): void {
    this.setupEventListeners();
    this.setupPasswordToggle();
    this.setupPasswordStrength();
    this.setupRealTimeValidation();
    this.setupCaptchaQuestion();
    this.setMaxBirthDate();
  }

  private setupEventListeners(): void {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    this.resetBtn?.addEventListener('click', () => {
      this.resetForm();
    });

    this.continueBtn?.addEventListener('click', () => {
      this.redirectToAccount();
    });
  }

  private setupPasswordToggle(): void {
    document.querySelectorAll('.toggle-password').forEach(button => {
      button.addEventListener('click', (e) => {
        this.togglePasswordVisibility(e);
      });
    });
  }

  private setupPasswordStrength(): void {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    
    passwordInput?.addEventListener('input', () => {
      const password = passwordInput.value;
      this.updatePasswordStrength(password);
      this.validatePasswordRequirements(password);
    });
  }

  private setupRealTimeValidation(): void {
    if (!this.form) return;

    const inputs = this.form.querySelectorAll('input[required]');
    inputs.forEach(input => {
      let timeout: NodeJS.Timeout;
      
      input.addEventListener('blur', () => {
        clearTimeout(timeout);
        this.validateField(input.id);
      });

      if (input.id === 'nombre') {
        input.addEventListener('input', (e) => {
          const value = (input as HTMLInputElement).value;
          clearTimeout(timeout);
          
          timeout = setTimeout(() => {
            if (value.length > 0 && value.length < 2) {
              this.showError('nombre', 'El nombre debe tener al menos 2 caracteres');
              input.classList.remove('valid');
              input.classList.add('invalid');
              return;
            }
            
            if (/\d/.test(value)) {
              this.showError('nombre', 'El nombre no puede contener números');
              input.classList.remove('valid');
              input.classList.add('invalid');
              return;
            }
            
            if (/\s/.test(value)) {
              const partes = value.split(' ');
              const ultimaParte = partes[partes.length - 1];
              
              if (ultimaParte && ultimaParte.length < 2 && ultimaParte.length > 0) {
                this.showError('nombre', 'Debe haber al menos 2 letras después del espacio');
                input.classList.remove('valid');
                input.classList.add('invalid');
                return;
              }
              
              if (ultimaParte === '') {
                this.showError('nombre', 'Debe escribir algo después del espacio');
                input.classList.remove('valid');
                input.classList.add('invalid');
                return;
              }
            }
            
            if (value.length >= 2 && !/\d/.test(value)) {
              if (value.length >= 3) {
                this.validateNombre(value);
              } else {
                this.hideError('nombre');
                input.classList.remove('invalid');
                input.classList.remove('valid');
              }
            } else if (value.length === 0) {
              input.classList.remove('valid');
              input.classList.remove('invalid');
              this.hideError('nombre');
            }
          }, 300);
        });
      } else if (input.id === 'email') {
        input.addEventListener('input', (e) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            if ((input as HTMLInputElement).value.length > 0) {
              this.validateEmail((input as HTMLInputElement).value);
            }
          }, 300);
        });
      } else if (input.id === 'telefono') {
        input.addEventListener('input', (e) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            if ((input as HTMLInputElement).value.length > 0) {
              this.validateTelefono((input as HTMLInputElement).value);
            }
          }, 300);
        });
      } else {
        input.addEventListener('input', () => {
          if (this.hasError(input.id)) {
            this.hideError(input.id);
          }
        });
      }
    });

    const confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement;
    confirmPassword?.addEventListener('input', (e) => {
      if (this.confirmPasswordTimeout) clearTimeout(this.confirmPasswordTimeout);
      this.confirmPasswordTimeout = setTimeout(() => {
        this.validatePasswordMatch();
      }, 300);
    });

    const terminos = document.getElementById('terminos') as HTMLInputElement;
    terminos?.addEventListener('change', () => {
      this.validateField('terminos');
    });
  }

  private setupCaptchaQuestion(): void {
    const randomIndex = Math.floor(Math.random() * this.captchaQuestions.length);
    this.currentCaptcha = this.captchaQuestions[randomIndex];
    
    const captchaLabel = document.querySelector('.captcha-label');
    if (captchaLabel && this.currentCaptcha) {
      captchaLabel.textContent = this.currentCaptcha.question;
      
      // Dispatch custom event with new question
      const event = new CustomEvent('captchaQuestionChanged', { 
        detail: { question: this.currentCaptcha.question } 
      });
      window.dispatchEvent(event);
    }
  }

  private setMaxBirthDate(): void {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const fechaInput = document.getElementById('fechaNacimiento') as HTMLInputElement;
    if (fechaInput) {
      fechaInput.max = maxDate.toISOString().split('T')[0];
    }
  }

  private togglePasswordVisibility(event: Event): void {
    const button = event.currentTarget as HTMLButtonElement;
    const targetId = button.dataset.target;
    const passwordInput = document.getElementById(targetId || '') as HTMLInputElement;
    const icon = button.querySelector('.material-symbols-outlined');
    
    if (passwordInput && icon) {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.textContent = 'visibility_off';
      } else {
        passwordInput.type = 'password';
        icon.textContent = 'visibility';
      }
    }
  }

  private updatePasswordStrength(password: string): void {
    const strengthBar = document.querySelector('.strength-bar') as HTMLElement;
    const strengthText = document.querySelector('.strength-text') as HTMLElement;
    
    if (!strengthBar || !strengthText) return;
    
    if (!password) {
      strengthBar.style.width = '0%';
      strengthBar.style.backgroundColor = '';
      strengthText.textContent = 'Seguridad de la contraseña';
      strengthText.style.color = '';
      return;
    }
    
    let score = 0;
    const requirements = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[@$!%*?&]/.test(password)
    ];
    
    score = requirements.filter(Boolean).length;
    
    const percentage = (score / 5) * 100;
    strengthBar.style.width = `${percentage}%`;
    
    if (score <= 1) {
      strengthBar.style.backgroundColor = '#ef4444';
      strengthText.textContent = 'Muy débil';
      strengthText.style.color = '#ef4444';
    } else if (score === 2) {
      strengthBar.style.backgroundColor = '#f59e0b';
      strengthText.textContent = 'Débil';
      strengthText.style.color = '#f59e0b';
    } else if (score === 3) {
      strengthBar.style.backgroundColor = '#3b82f6';
      strengthText.textContent = 'Aceptable';
      strengthText.style.color = '#3b82f6';
    } else if (score === 4) {
      strengthBar.style.backgroundColor = '#10b981';
      strengthText.textContent = 'Buena';
      strengthText.style.color = '#10b981';
    } else {
      strengthBar.style.backgroundColor = '#059669';
      strengthText.textContent = 'Excelente';
      strengthText.style.color = '#059669';
    }
  }

  private validatePasswordRequirements(password: string): void {
    const requirements = [
      { rule: 'length', test: password.length >= 8 },
      { rule: 'uppercase', test: /[A-Z]/.test(password) },
      { rule: 'lowercase', test: /[a-z]/.test(password) },
      { rule: 'number', test: /[0-9]/.test(password) },
      { rule: 'special', test: /[@$!%*?&]/.test(password) }
    ];
    
    requirements.forEach(req => {
      const li = document.querySelector(`[data-rule="${req.rule}"]`);
      const icon = li?.querySelector('.requirement-icon');
      
      if (li && icon) {
        if (req.test) {
          li.classList.add('valid');
          icon.textContent = 'check_circle';
          (icon as HTMLElement).style.color = '#10b981';
        } else {
          li.classList.remove('valid');
          icon.textContent = 'cancel';
          (icon as HTMLElement).style.color = '#ef4444';
        }
      }
    });
  }

  private async handleSubmit(): Promise<void> {
    if (this.isSubmitting) return;
    
    this.firstErrorField = null;
    
    if (!this.validateForm()) {
      this.scrollToFirstError();
      return;
    }
    
    this.isSubmitting = true;
    if (this.submitBtn) {
      (this.submitBtn as HTMLButtonElement).disabled = true;
      this.submitBtn.innerHTML = `
        <span class="material-symbols-outlined btn-icon">sync</span>
        Procesando...
      `;
    }
    
    await this.simulateSubmit();
    this.showSuccessMessage();
  }

  private validateForm(): boolean {
    let isValid = true;
    
    const fieldOrder = ['nombre', 'email', 'telefono', 'fechaNacimiento', 'password', 'confirmPassword', 'captcha', 'terminos'];
    
    for (const fieldId of fieldOrder) {
      let fieldValid: boolean;
      
      if (fieldId === 'confirmPassword') {
        fieldValid = this.validatePasswordMatch();
      } else {
        fieldValid = this.validateField(fieldId);
      }
      
      if (!fieldValid) {
        isValid = false;
        
        if (!this.firstErrorField) {
          this.firstErrorField = fieldId;
        }
      }
    }
    
    return isValid;
  }

  private validateField(fieldId: string): boolean {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (!field) return true;
    
    let value: string | boolean;
    
    if (field.type === 'checkbox') {
      value = field.checked;
    } else {
      value = field.value.trim();
    }
    
    switch(fieldId) {
      case 'nombre':
        return this.validateNombre(value as string);
      case 'email':
        return this.validateEmail(value as string);
      case 'telefono':
        return this.validateTelefono(value as string);
      case 'fechaNacimiento':
        return this.validateFechaNacimiento(value as string);
      case 'password':
        return this.validatePassword(value as string);
      case 'confirmPassword':
        return this.validatePasswordMatch();
      case 'captcha':
        return this.validateCaptcha(value as string);
      case 'terminos':
        return this.validateTerminos(value as boolean);
      default:
        return true;
    }
  }

  private scrollToFirstError(): void {
    if (this.firstErrorField) {
      const errorField = document.getElementById(this.firstErrorField);
      if (errorField) {
        errorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        errorField.focus();
      }
    }
  }

  private validateNombre(value: string): boolean {
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    
    if (!value) {
      this.showError('nombre', 'El nombre completo es obligatorio');
      nombreInput?.classList.remove('valid');
      return false;
    }
    
    if (value.length < 2) {
      this.showError('nombre', 'El nombre debe tener al menos 2 caracteres');
      nombreInput?.classList.remove('valid');
      nombreInput?.classList.add('invalid');
      return false;
    }
    
    if (value.length > 50) {
      this.showError('nombre', 'El nombre debe tener máximo 50 caracteres');
      nombreInput?.classList.remove('valid');
      return false;
    }
    
    if (/\d/.test(value)) {
      this.showError('nombre', 'Solo se permiten letras y espacios');
      nombreInput?.classList.remove('valid');
      return false;
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
      this.showError('nombre', 'Solo se permiten letras y espacios');
      nombreInput?.classList.remove('valid');
      return false;
    }
    
    if (/\s/.test(value)) {
      const partes = value.split(' ');
      const ultimaParte = partes[partes.length - 1];
      
      if (ultimaParte.length < 2) {
        this.showError('nombre', 'Debe haber al menos 2 letras después del espacio');
        nombreInput?.classList.remove('valid');
        nombreInput?.classList.add('invalid');
        return false;
      }
      
      if (value.trim() !== value) {
        this.showError('nombre', 'No se permiten espacios al inicio o al final');
        nombreInput?.classList.remove('valid');
        nombreInput?.classList.add('invalid');
        return false;
      }
    }
    
    if (!/\s/.test(value)) {
      this.showError('nombre', 'Por favor, ingresa nombre y apellido completos');
      nombreInput?.classList.remove('valid');
      nombreInput?.classList.add('invalid');
      return false;
    }
    
    const partesNombre = value.trim().split(/\s+/);
    if (partesNombre.length < 2) {
      this.showError('nombre', 'Ingresa nombre y apellido completos');
      nombreInput?.classList.remove('valid');
      nombreInput?.classList.add('invalid');
      return false;
    }
    
    for (let parte of partesNombre) {
      if (parte.length < 2) {
        this.showError('nombre', 'Cada parte del nombre debe tener al menos 2 letras');
        nombreInput?.classList.remove('valid');
        nombreInput?.classList.add('invalid');
        return false;
      }
    }
    
    this.hideError('nombre');
    nombreInput?.classList.remove('invalid');
    nombreInput?.classList.add('valid');
    return true;
  }

  private validateEmail(value: string): boolean {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    
    if (!value) {
      this.showError('email', 'El correo electrónico es obligatorio');
      emailInput?.classList.remove('valid');
      return false;
    }
    
    if (!/@/.test(value)) {
      this.showError('email', 'El correo debe incluir el símbolo @');
      emailInput?.classList.remove('valid');
      return false;
    }
    
    const parts = value.split('@');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      this.showError('email', 'Ingresa un correo válido (ejemplo: usuario@dominio.com)');
      emailInput?.classList.remove('valid');
      return false;
    }
    
    if (!/\./.test(parts[1])) {
      this.showError('email', 'El dominio del correo parece incompleto');
      emailInput?.classList.remove('valid');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      this.showError('email', 'Ingresa un correo válido (ejemplo: usuario@dominio.com)');
      emailInput?.classList.remove('valid');
      return false;
    }
    
    if (/\s/.test(value)) {
      this.showError('email', 'El correo no debe contener espacios');
      emailInput?.classList.remove('valid');
      return false;
    }
    
    this.hideError('email');
    emailInput?.classList.remove('invalid');
    emailInput?.classList.add('valid');
    return true;
  }

  private validateTelefono(value: string): boolean {
    const telefonoInput = document.getElementById('telefono') as HTMLInputElement;
    
    if (!value) {
      this.showError('telefono', 'El teléfono es obligatorio');
      telefonoInput?.classList.remove('valid');
      return false;
    }
    
    if (!/^\d+$/.test(value)) {
      this.showError('telefono', 'Ingresa 10 dígitos, todos deben ser números y sin espacios');
      telefonoInput?.classList.remove('valid');
      return false;
    }

    if (value.length > 10) {
      this.showError('telefono', 'El teléfono debe tener exactamente 10 dígitos, por favor, ingresa un número que no tenga más de 10 dígitos');
      telefonoInput?.classList.remove('valid');
      return false;
    }
    
    if (value.length !== 10) {
      this.showError('telefono', 'El teléfono debe tener exactamente 10 dígitos');
      telefonoInput?.classList.remove('valid');
      return false;
    }
    
    this.hideError('telefono');
    telefonoInput?.classList.remove('invalid');
    telefonoInput?.classList.add('valid');
    return true;
  }

  private validateFechaNacimiento(value: string): boolean {
    const fechaInput = document.getElementById('fechaNacimiento') as HTMLInputElement;
    
    if (!value) {
      this.showError('fechaNacimiento', 'La fecha de nacimiento es obligatoria');
      fechaInput?.classList.remove('valid');
      return false;
    }
    
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 18) {
      this.showError('fechaNacimiento', 'Debes ser mayor de 18 años para registrarte');
      fechaInput?.classList.remove('valid');
      return false;
    }
    
    this.hideError('fechaNacimiento');
    fechaInput?.classList.remove('invalid');
    fechaInput?.classList.add('valid');
    return true;
  }

  private validatePassword(value: string): boolean {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    
    if (!value) {
      this.showError('password', 'La contraseña es obligatoria');
      passwordInput?.classList.remove('valid');
      return false;
    }
    
    if (value.length < 8) {
      this.showError('password', 'La contraseña debe tener al menos 8 caracteres');
      passwordInput?.classList.remove('valid');
      return false;
    }
    
    if (!/[A-Z]/.test(value)) {
      this.showError('password', 'Incluye al menos una letra mayúscula');
      passwordInput?.classList.remove('valid');
      return false;
    }
    
    if (!/[a-z]/.test(value)) {
      this.showError('password', 'Incluye al menos una letra minúscula');
      passwordInput?.classList.remove('valid');
      return false;
    }
    
    if (!/[0-9]/.test(value)) {
      this.showError('password', 'Incluye al menos un número');
      passwordInput?.classList.remove('valid');
      return false;
    }
    
    if (!/[@$!%*?&]/.test(value)) {
      this.showError('password', 'Incluye al menos un carácter especial (@$!%*?&)');
      passwordInput?.classList.remove('valid');
      return false;
    }
    
    this.hideError('password');
    passwordInput?.classList.remove('invalid');
    passwordInput?.classList.add('valid');
    return true;
  }

  private validatePasswordMatch(): boolean {
    const confirmInput = document.getElementById('confirmPassword') as HTMLInputElement;
    
    if (!confirmInput) {
      this.showError('confirmPassword', 'Debes confirmar tu contraseña');
      return false;
    }
    
    const password = (document.getElementById('password') as HTMLInputElement)?.value || '';
    const confirmPassword = confirmInput.value;
    
    if (!confirmPassword) {
      this.showError('confirmPassword', 'Debes confirmar tu contraseña');
      confirmInput.classList.remove('valid');
      return false;
    }
    
    if (password !== confirmPassword) {
      this.showError('confirmPassword', 'Las contraseñas no coinciden');
      confirmInput.classList.remove('valid');
      return false;
    }
    
    this.hideError('confirmPassword');
    confirmInput.classList.remove('invalid');
    confirmInput.classList.add('valid');
    return true;
  }

  private validateCaptcha(value: string): boolean {
    const captchaInput = document.getElementById('captcha') as HTMLInputElement;
    
    if (!value) {
      this.showError('captcha', 'Debes responder la pregunta de seguridad');
      captchaInput?.classList.remove('valid');
      return false;
    }
    
    if (!this.currentCaptcha) return false;
    
    if (value.trim().toLowerCase() !== this.currentCaptcha.answer.toLowerCase()) {
      this.showError('captcha', 'Respuesta incorrecta. Por favor, intenta nuevamente');
      captchaInput?.classList.remove('valid');
      return false;
    }
    
    this.hideError('captcha');
    captchaInput?.classList.remove('invalid');
    captchaInput?.classList.add('valid');
    return true;
  }

  private validateTerminos(value: boolean): boolean {
    if (!value) {
      this.showError('terminos', 'Debes aceptar los términos y condiciones');
      return false;
    }
    
    this.hideError('terminos');
    return true;
  }

  private showError(fieldId: string, message: string): void {
  const errorElement = document.getElementById(`error-${fieldId}`);
  const inputElement = document.getElementById(fieldId) as HTMLInputElement;
  
  if (errorElement) {
    errorElement.innerHTML = `
      <span class="material-symbols-outlined">error</span>
      ${message}
    `;
    errorElement.classList.add('show'); // Esta línea es crucial
    
    if (inputElement) {
      inputElement.classList.add('invalid');
      inputElement.classList.remove('valid');
    }
    
    // Disparar evento para React
    window.dispatchEvent(new CustomEvent('validationChanged'));
  }
}

private hideError(fieldId: string): void {
  const errorElement = document.getElementById(`error-${fieldId}`);
  const inputElement = document.getElementById(fieldId) as HTMLInputElement;
  
  if (errorElement) {
    errorElement.classList.remove('show'); // Esta línea es crucial
    
    if (inputElement) {
      inputElement.classList.remove('invalid');
    }
    
    // Disparar evento para React
    window.dispatchEvent(new CustomEvent('validationChanged'));
  }
}

  private hasError(fieldId: string): boolean {
    const errorElement = document.getElementById(`error-${fieldId}`);
    return errorElement ? !errorElement.classList.contains('hidden') : false;
  }

  private simulateSubmit(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  }

  private showSuccessMessage(): void {
    const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
    
    // Dispatch custom event for React component
    const event = new CustomEvent('showRegisterModal', { 
      detail: { email } 
    });
    window.dispatchEvent(event);
    
    if (this.form) {
      this.form.style.opacity = '0.5';
      this.form.style.pointerEvents = 'none';
    }
    
    this.startCountdown();
  }

  private startCountdown(): void {
    this.countdown = 5;
    if (this.countdownElement) {
      this.countdownElement.textContent = this.countdown.toString();
    }
    
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdownElement) {
        this.countdownElement.textContent = this.countdown.toString();
      }
      
      if (this.countdown <= 0) {
        if (this.countdownInterval) clearInterval(this.countdownInterval);
        this.redirectToAccount();
      }
    }, 1000);
  }

  private redirectToAccount(): void {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    
    // Dispatch custom event for React component
    const event = new CustomEvent('hideRegisterModal');
    window.dispatchEvent(event);
    
    this.resetFormState();
    
    // In a real app, redirect to dashboard
    // window.location.href = '/dashboard';
  }

  private resetForm(): void {
    if (this.form) {
      this.form.reset();
    }
    
    document.querySelectorAll('.error-message').forEach(el => {
      el.classList.add('hidden');
      el.classList.remove('flex');
    });
    
    document.querySelectorAll('.invalid, .valid').forEach(el => {
      el.classList.remove('invalid');
      el.classList.remove('valid');
    });
    
    const strengthBar = document.querySelector('.strength-bar') as HTMLElement;
    if (strengthBar) {
      strengthBar.style.width = '0%';
      strengthBar.style.backgroundColor = '';
    }
    
    const strengthText = document.querySelector('.strength-text') as HTMLElement;
    if (strengthText) {
      strengthText.textContent = 'Seguridad de la contraseña';
      strengthText.style.color = '';
    }
    
    document.querySelectorAll('.requirement-item').forEach(li => {
      li.classList.remove('valid');
      const icon = li.querySelector('.requirement-icon');
      if (icon) {
        icon.textContent = 'cancel';
        (icon as HTMLElement).style.color = '#ef4444';
      }
    });
    
    this.setupCaptchaQuestion();
    this.firstErrorField = null;
    
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    nombreInput?.focus();
    
    this.resetFormState();
  }

  private resetFormState(): void {
    this.isSubmitting = false;
    if (this.submitBtn) {
      (this.submitBtn as HTMLButtonElement).disabled = false;
      this.submitBtn.innerHTML = `
        <span class="material-symbols-outlined btn-icon">person_add</span>
        Crear cuenta
      `;
    }
    
    if (this.form) {
      this.form.style.opacity = '';
      this.form.style.pointerEvents = '';
    }
  }
}

// Add type declaration for window
declare global {
  interface Window {
    registerSystem: TecommersRegister;
  }
}

export default TecommersRegister;