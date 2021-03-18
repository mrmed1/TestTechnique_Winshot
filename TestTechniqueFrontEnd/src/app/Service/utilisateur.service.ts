import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utilisateur} from '../Model/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  urlpath: string;
  constructor(private http: HttpClient) {
    this.urlpath = 'http://localhost:8080/Utilisateur';
  }

  getAllUtilisateurs() {

    return this.http.get<Utilisateur[]>(this.urlpath);

  }
  getUtilisateurById(id: number)
  {
    return this.http.get<Utilisateur>(this.urlpath + '/' + id);
  }
  createUtilisateur(u: Utilisateur){

    return this.http.post(this.urlpath, u);
  }
  updateUtilisateur(u: Utilisateur)
  {
    return this.http.put(this.urlpath, u);
  }
  deleteUtilisateur(u: Utilisateur)
  {

    return this.http.put(this.urlpath + '/delete', u);
  }

  login(email: string, pwd: string)
  {
    return this.http.get<Utilisateur>(this.urlpath + '/SignIn/' + email + '/' + pwd);
  }
 /* login(email: string, pwd: string)
  {
    return this.http.get<Utilisateur>(this.urlpath + '/' + email + '/' + pwd);
  }*/
  getNormalUtilisateur()
  {
    return this.http.get<Utilisateur[]>(this.urlpath + '/normal');
  }

  uploadFile(formData: FormData): Observable<any>
  {

    return this.http.post(this.urlpath + '/add' , formData);
  }
}
