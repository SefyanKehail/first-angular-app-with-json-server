import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product";
import {PaginationService} from "../../services/pagination.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppStateService} from "../../services/app-state.service";
import {filter, map, tap} from "rxjs";
import {ErrorService} from "../../services/error.service";
import {ErrorEnum} from "../../enums/error";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends PaginationService implements OnInit {
  products!: Product[];
  keyword: string = "";
  itemsCount!: number;
  pagesCount!: number;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private appStateService: AppStateService,
    private errorService: ErrorService,
    public authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getProducts()

  }

  // gets items count from response,
  // sets size and pages count,
  // updates products list
  private handlePagination(response: HttpResponse<Product[]>) {
    this.itemsCount = +response.headers.get('X-Total-Count')!;
    this.pagesCount = this.getPagesCount(this.itemsCount, this.size);
    this.products = response.body!;


    this.setItemsCountInCurrentPage(this.itemsCount, this.size);
  }


  getProducts() {
    this.productsService.getPaginatedProducts(this.keyword, this.page, this.size).subscribe(
      response => this.handlePagination(response)
    )

    this.refreshAppState();
  }

  deleteProduct(product: Product) {

    // additional layer of protection for roles

    if (this.authService.isAdmin()) {
      if (confirm("Are you sure you want to delete this product?")) {
        this.productsService.delete(product).subscribe(
          () => this.refreshAppState()
        );
        let index = this.products.indexOf(product);
        this.products.splice(index, 1);

        // items count is fo tracking items count on each page so basically if we delete the whole thing we go to the previous page
        if (this.itemsCountInEachPage[this.page - 1] === 1) {
          this.itemsCountInEachPage[this.page - 1]--;

          // rerouting with taking in mind some of the cases like being in the first page with remaining data on the other pages/ or no data remaining
          if (this.itemsCountInEachPage.length > 1 && this.page !== 1) {
            this.setPage(this.page - 1);
          }

          // refresh products list with new page
          this.getProducts();
        } else {
          this.itemsCountInEachPage[this.page - 1]--;
        }

      }
    }


  }

  toggleChecked(product: Product) {
    // additional role protection layer, couldn't just rely on ngIf to hide
    if (this.authService.isAdmin()) {
      this.productsService.toggleChecked(product).subscribe(
        patchedProduct => {
          product.is_checked = patchedProduct.is_checked
          this.refreshAppState();
        }
      );
    }
  }

  editProduct(product: Product) {
    this.router.navigateByUrl(`edit-product/${product.id}`)
  }

  refreshAppState() {
    this.productsService.getAll(this.keyword).pipe(
      tap(products => this.appStateService.setProductState({totalProducts: products.length})),
      map(products => products.filter(product => product.is_checked))
    ).subscribe(
      products => this.appStateService.setProductState({totalChecked: products.length})
    )
  }
}
