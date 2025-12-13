import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ingredient {
    id: string;
    name: string;
    aliases: string[];
    riskLevel: string;
    description: string;
}

export interface Warning {
    ingredient: string;
    matchedAlias: string;
    riskLevel: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:8080/api';

    constructor(private http: HttpClient) { }

    getPreferences(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(`${this.apiUrl}/preferences`);
    }

    addPreference(name: string): Observable<Ingredient> {
        return this.http.post<Ingredient>(`${this.apiUrl}/preferences`, { name });
    }

    removePreference(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/preferences/${id}`);
    }

    analyze(text: string): Observable<Warning[]> {
        return this.http.post<Warning[]>(`${this.apiUrl}/analyze`, { text });
    }
}
