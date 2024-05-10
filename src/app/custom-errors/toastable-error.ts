import {HttpErrorResponse} from "@angular/common/http";

export class ToastableError extends HttpErrorResponse {
  constructor(error: any) {
    super(error);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ToastableError.prototype);
  }
}
