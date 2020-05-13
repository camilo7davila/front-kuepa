import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  token: string;
  decode: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    this.decode = this.userService.parseJwt(this.token)
    console.log('esto tenemos en token', this.decode);
  }

  logout() {
    const user = {
      id: this.decode._id
    }
    this.userService.logoutUser(user).subscribe(() => {
      localStorage.removeItem("token")
      this.router.navigate(['/auth'])
    })
  }

}
