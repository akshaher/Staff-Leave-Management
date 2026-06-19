import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { windowWhen } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    register(userData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/signup`, userData);
    }


    login(loginData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, loginData)
    }

    logout(): void {
        localStorage.clear();
        window.location.href ="/login"
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    refreshToken() {
        const refreshToken = this.getRefreshToken();
        console.log(refreshToken);
        
        return this.http.post(`${this.baseUrl}/auth/refresh`, {refreshToken})
    }


    getUserRole() {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        
        if (token) {
            const { role }: any = jwtDecode(token);
            console.log(role);
            
            return role;
        }
    }

    getUserName(){
        const token=localStorage.getItem('accessToken');

        if(token){
            const {fullName}:any =jwtDecode(token);
            console.log(fullName);
            
            return fullName;
        }
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }
}
