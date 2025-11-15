// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
      level: ['A1'] // Optionnel
    }, { validators: this.passwordMatchValidator });
  }

  get f() { return this.registerForm.controls; }

  passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const password2 = control.get('password2');
    return password && password2 && password.value !== password2.value
      ? { passwordMismatch: true }
      : null;
  };

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Inscription réussie ! Redirection...';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.email?.[0] || 'Erreur serveur';
        this.loading = false;
      }
    });
  }
}