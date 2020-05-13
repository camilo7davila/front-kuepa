import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(private fB: FormBuilder,
              private userService: UserService,
              private router: Router) { 
    this.formBuilter()
  }

  ngOnInit(): void {
  }

  private formBuilter() {
    this.form = this.fB.group({
      name: ['',[Validators.required, Validators.minLength(4)]],
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  registerUser() {
    this.userService.registerUser(this.form.value).subscribe((data) => {
      alert('creado correctamente')
      this.form.reset()
      this.router.navigate(['/auth/login'])
    }, error => {
      alert('Ocurrio un error')
      console.log(error);
    })
  }

  get nameField() { return this.form.get('name') }
  get userNameField() { return this.form.get('userName') }
  get passwordField() { return this.form.get('password') }
}
