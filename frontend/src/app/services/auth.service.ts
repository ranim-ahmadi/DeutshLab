import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly API_BASE_URL = 'http://localhost:8000';
  private readonly apiUrl = `${this.API_BASE_URL}/api/users`;
  constructor() { }
}


