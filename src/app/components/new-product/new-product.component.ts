import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private productsService: ProductsService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.productForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.max(10)]),
        price: new FormControl(0.0, [Validators.required]),
        is_checked: new FormControl(false)
      }
    );
  }

  saveProduct() {
    let product = this.productForm.value;
    this.productsService.save(product).subscribe(
      value => this.router.navigateByUrl("/products")
    );
  }
}
