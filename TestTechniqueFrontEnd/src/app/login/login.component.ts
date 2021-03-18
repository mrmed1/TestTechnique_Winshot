import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilisateurService} from '../Service/utilisateur.service';
import {Router} from '@angular/router';
import {Utilisateur} from '../Model/utilisateur';
import {NotificationService} from '../Service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  u: Utilisateur = new Utilisateur();

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private utilisateurservice: UtilisateurService, private router: Router,  private notification: NotificationService) { }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.form.valid) {
      const em = this.form.value;
      this.utilisateurservice.login(em.email, em.password).subscribe(data => {
        this.u = data;
        if (this.u.role === 's'){
          this.router.navigate(['/accueilsuper']);
        }else if (this.u.role === 'u'){
          this.router.navigate(['/accueilutilisateur', this.u.id]);
        }

      }, error => this.notification.warn('Email ou Mot de passe est incorrecte'));
    }
    else {
      this.validateAllFormFields(this.form);
    }
  }



  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('password');
  }

  toregister() {
    this.router.navigate(['inscription']);
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
