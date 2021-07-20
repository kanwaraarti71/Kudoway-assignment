import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import users from './user.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  usersList:{name:string, password:string}[]= users;
  error = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      
     let user = this.usersList.find(x => x.name === this.f.username.value);
     this.loading = false;
     if(user === undefined)
     {
      this.error = true;      
     }
     else
     {
      window.sessionStorage.setItem('username',user.name);
      window.sessionStorage.setItem('password',user.password);
      
      this.router.navigate(['polls']);
     }
  }

}
