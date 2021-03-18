import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../Model/utilisateur';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilisateurService} from '../Service/utilisateur.service';
import {NotificationService} from '../Service/notification.service';

@Component({
  selector: 'app-accueil-utilisateur',
  templateUrl: './accueil-utilisateur.component.html',
  styleUrls: ['./accueil-utilisateur.component.css']
})
export class AccueilUtilisateurComponent implements OnInit {
  u: Utilisateur = new Utilisateur();
  id1: number;
  form = this.fb.group({
    id: [null],
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [ Validators.required, Validators.email]),
    motdepasse: new FormControl('', Validators.required),
  });
  // tslint:disable-next-line:max-line-length
  constructor( private router: Router, private notification: NotificationService, private fb: FormBuilder, private route: ActivatedRoute, private utilisateservice: UtilisateurService) {}

  ngOnInit(): void {
    this.id1 = this.route.snapshot.params.id;
    console.log(this.id1);
    this.utilisateservice.getUtilisateurById(this.id1)
      .subscribe(data => {
         console.log(data);
         this.id.setValue(data.id);
         this.email.setValue(data.email);
         this.prenom.setValue(data.prenom);
         this.nom.setValue(data.nom);
         this.motdepasse.setValue(data.motdepasse);

      }, error => console.log(error));
  }




  get id(){
    return this.form.get('id');
  }
  get email(){
    return this.form.get('email');
  }
  get motdepasse(){
    return this.form.get('motdepasse');
  }

  get nom(){
    return this.form.get('nom');
  }
  get prenom(){
    return this.form.get('prenom');
  }

  retour() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
  this.u.id = this.id.value;
  this.u.nom = this.nom.value;
  this.u.prenom = this.prenom.value;
  this.u.email = this.email.value;
  this.u.motdepasse = this.motdepasse.value;
  this.utilisateservice.updateUtilisateur(this.u)
      .subscribe(data => {
          console.log(data);
          this.notification.success('Ajout effectué avec succées');

      }
      , error => console.log(error));
  }

}
