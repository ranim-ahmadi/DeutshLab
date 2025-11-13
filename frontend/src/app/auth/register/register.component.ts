import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        first_name: ['', [Validators.required, Validators.minLength(2)]],
        last_name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]]
      },
      {
        validators: this.passwordMatchValidator // Validateur global
      }
    );
  }

  // Raccourci pour accéder aux contrôles
  get f() {
    return this.registerForm.controls;
  }

  // Validateur personnalisé : mot de passe = confirmation
  passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const password2 = control.get('password2');

    if (password && password2 && password.value !== password2.value) {
      control.get('password2')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      const errors = control.get('password2')?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          control.get('password2')?.setErrors(null);
        } else {
          control.get('password2')?.setErrors(errors);
        }
      }
      return null;
    }
  };

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    // Simulation d'inscription
    setTimeout(() => {
      const data = this.registerForm.value;
      console.log('Inscription soumise', data);

      // Simule succès
      this.successMessage = 'Inscription réussie ! Redirection...';
      this.loading = false;

      // Optionnel : rediriger après 2 secondes
      // setTimeout(() => this.router.navigate(['/login']), 2000);
    }, 1000);
  }
}