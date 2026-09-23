import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = environment.apiUrl;

     currentUserBS= new Subject<string | null>()    
    name$=this.currentUserBS.asObservable();

    constructor(private http: HttpClient) { }

    updateName(name:string){
        this.currentUserBS.next(name);
    }

    register(userData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/signup`, userData).pipe(
            catchError((err) => {
                console.error('Register error', err);
                return throwError(() => err.error?.message || err);
            })
        );
    }


    login(loginData: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, loginData).pipe(
            catchError((err) => {
                console.error('Login error', err);
                return throwError(() => err.error?.message);
            })
        );
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
        
        return this.http.post(`${this.baseUrl}/auth/refresh`, {refreshToken}).pipe(
            catchError((err) => {
                console.error('Refresh token error', err);
                return throwError(() => err.error?.message || err);
            })
        );
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
