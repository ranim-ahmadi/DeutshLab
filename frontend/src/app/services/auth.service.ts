// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
  level?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) { }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.API_URL}/register/`, data);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login/`, { email, password });
  }
}