import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {LoadingService} from "../../services/loading.service";
import {AppStateService} from "../../services/app-state.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  activeTab!: string;

  constructor(
    private router: Router,
    public loadingService :LoadingService,
    public appStateService: AppStateService,
    public authService: AuthService) {
  }

  ngOnInit(): void {
    this.appStateService.currentRoute$.subscribe(
      currentRoute => {
        this.activeTab = currentRoute
        console.log(this.activeTab);
      }
    );
  }

  goToHome() {
    this.activeTab = "home";
    this.router.navigateByUrl("/home");
  }

  goToProducts() {
    this.activeTab = "products";
    this.router.navigateByUrl("/products");
  }

  goToNewProduct() {
    this.activeTab = "new-product";
    this.router.navigateByUrl("/new-product");
  }
}
