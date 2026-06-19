import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private baseUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    updateLocation(payload: any) {
        return this.http.post(
            `${this.baseUrl}/location/update`,
            payload
        );

    }

    getUsersLocation() {
        return this.http.get(
            `${this.baseUrl}/users/locations`
        );

    }

}