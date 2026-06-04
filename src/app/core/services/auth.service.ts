import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = 'http://localhost:5000/api';

    constructor(private http: HttpClient) { }

    register(userData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/signup`, userData);
    }


    login(loginData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, loginData)
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
    }

    getToken():string|null{
        return localStorage.getItem('token');
    }

      getRole():string|null{
        return localStorage.getItem('role');
    }

    isLoggedIn() :boolean {
        return !!localStorage.getItem('token');
    }
}