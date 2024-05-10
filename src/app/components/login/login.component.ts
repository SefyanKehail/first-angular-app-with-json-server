import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ErrorService} from "../../services/error.service";
import {LoadingService} from "../../services/loading.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService,
    public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        username: new FormControl(''),
        password: new FormControl('')
      }
    )
  }


  login() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).then(
      response => {
        if (response) {
          this.router.navigateByUrl("/home")
        } else {}
      }
    ).catch((errorMessage: string) => {
      this.errorService.throwError(errorMessage).subscribe();
    });
  }
}
