import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Raccourci pour accéder aux contrôles dans le template
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    // Simulation d'appel API (à remplacer par ton AuthService)
    setTimeout(() => {
      const { email, password } = this.loginForm.value;
      if (email === 'test@deutschlab.com' && password === '123456') {
        console.log('Connexion réussie !');
        // Rediriger vers le profil ou dashboard
      } else {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
      this.loading = false;
    }, 1000);
  }
}