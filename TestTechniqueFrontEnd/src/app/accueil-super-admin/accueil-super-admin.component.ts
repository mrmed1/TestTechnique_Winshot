import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from '../Service/utilisateur.service';
import {Utilisateur} from '../Model/utilisateur';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accueil-super-admin',
  templateUrl: './accueil-super-admin.component.html',
  styleUrls: ['./accueil-super-admin.component.css']
})
export class AccueilSuperAdminComponent implements OnInit {
  formData: FormData = new FormData();
  readytoupload = false;
  u: Utilisateur = new Utilisateur();
  utilisateurs: Utilisateur[];
  private selectedFiles: any;
  constructor(private service: UtilisateurService, private router: Router ) { }

  ngOnInit(): void {
  this.service.getNormalUtilisateur().subscribe(
    data =>  this.utilisateurs = data
  );
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.formData.append('file', file);
      this.readytoupload = true;
    }
  }
    uploadFile() {
      if (this.readytoupload){
        this.service.uploadFile(this.formData).subscribe(data => {
          setTimeout(
            // tslint:disable-next-line:only-arrow-functions
            function(){
              location.reload();
            }, 500);
        });
      }
  }

  deleteUtilisateur(id) {
    this.service.getUtilisateurById(id).subscribe(
      data => {
       this.u = data;
       this.service.deleteUtilisateur(this.u).subscribe(
          res => console.log(res)
        );
       setTimeout(
          // tslint:disable-next-line:only-arrow-functions
          function(){
            location.reload();
          }, 500);
      }
    );

  }

  retour() {
    this.router.navigate(['/login']);

  }
}
