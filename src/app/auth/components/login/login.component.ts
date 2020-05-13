import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  loginUser() {
    this.userService.loginUser(this.form.value).subscribe(data => {
      localStorage.setItem("token", data.message.token)
      alert('Logueo exitoso');
      this.router.navigate(['/home'])
    }, error => {
      alert(error.error.error)
      console.log(error);
    })
  }

  get userNameField() { return this.form.get('userName') }
  get passwordField() { return this.form.get('password') }
}
