import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(keyword: string = '') {
    return this.httpClient.get<Product[]>(`${environment.host}/products?name_like=${keyword}`)
  }

  // response header contains total pages (X-Total-Count)
  getPaginatedProducts(keyword: string, page: number, size: number) {
    return this.httpClient.get<Product[]>(
      `${environment.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,
      {observe: 'response'})
  }

  toggleChecked(product: Product) {
    return this.httpClient.patch<Product>(
      `${environment.host}/products/${product.id}`,
      {is_checked: !product.is_checked}
    )
  }

  delete(product: Product) {
    return this.httpClient.delete<any>(`${environment.host}/products/${product.id}`)
  }

  save(product: Product) {
    return this.httpClient.post<Product>(`${environment.host}/products`, product)
  }

  update(product: Product) {
    return this.httpClient.patch<Product>(`${environment.host}/products/${product.id}`, product)
  }

  getById(productId: number) {
    return this.httpClient.get<Product>(`${environment.host}/products/${productId}`)
  }
}
