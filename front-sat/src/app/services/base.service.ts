import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseSat } from '../models/base.model';

const baseUrl = 'http://localhost:8080/api/funcionarios';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<BaseSat[]> {
    return this.http.get<BaseSat[]>(baseUrl);
  }

  get(id: any): Observable<BaseSat> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(nome: any): Observable<BaseSat[]> {
    return this.http.get<BaseSat[]>(`${baseUrl}?nome=${nome}`);
  }
}