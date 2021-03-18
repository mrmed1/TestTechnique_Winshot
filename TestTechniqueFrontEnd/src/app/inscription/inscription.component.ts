import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilisateurService} from '../Service/utilisateur.service';
import {Router} from '@angular/router';
import {Utilisateur} from '../Model/utilisateur';
import {NotificationService} from '../Service/notification.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  u: Utilisateur = new Utilisateur();
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [ Validators.required, Validators.email]),
    motdepasse: new FormControl('', Validators.required),
  });

  constructor(private utilisateurservice: UtilisateurService, private router: Router, private notification: NotificationService) { }

  ngOnInit(): void {
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



  tologin() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.u.prenom = this.prenom.value;
      this.u.nom = this.nom.value;
      this.u.email = this.email.value;
      this.u.motdepasse = this.motdepasse.value;
      this.utilisateurservice.createUtilisateur(this.u).subscribe(
        data => {
          console.log(data);

          this.notification.success('Ajout effectué avec succées');
        }, error => console.log(error));
      this.form.reset();
    }else
    {
      this.validateAllFormFields(this.form);
    }

  }


  validateAllFormFields(formGroup: FormGroup)
  {Object.keys(formGroup.controls).forEach(field =>
  {const control = formGroup.get(field);
   if (control instanceof FormControl)
    {control.markAsTouched({ onlySelf: true }); }
    else if (control instanceof FormGroup)
    {this.validateAllFormFields(control); }});
  }
}
