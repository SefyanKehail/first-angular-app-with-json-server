import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  page: number = 1;
  size: number = 5;
  sizeFormControl = new FormControl('5');
  itemsCountInEachPage!: number[];
  constructor() {
    this.setSize();
  }

  getPagesCount(itemsCount: number, size: number){
    return itemsCount % size === 0 ? itemsCount / size : Math.floor(itemsCount / size) + 1;
  }

  setPage(page: number){
    this.page = page;
  }

  setSize(){
    this.sizeFormControl.valueChanges.subscribe(
      size => {
        this.size = parseInt(size!);
        // reset page to 1 since size is changed
        this.page = 1;
      }
    )
  }

  // this one is called in ngOnInit so no problem
  setItemsCountInCurrentPage(itemsCount: number, size: number){
    const pagesCount = this.getPagesCount(itemsCount, size);
    const itemsPerPage = Array.from({ length: pagesCount }, () => size);

    if (itemsCount % size !== 0) {
      itemsPerPage[itemsPerPage.length -1] =  itemsCount - (size * (pagesCount - 1))
    }

    this.itemsCountInEachPage = itemsPerPage;
  }
}
