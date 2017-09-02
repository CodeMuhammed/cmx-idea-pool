import { Injectable } from '@angular/core';

@Injectable()
export class PreloaderService {
  private loading = false;
  showLoading() {
      this.loading = true;
  }

  hideLoading() {
      this.loading = false;
  }

  isLoading() {
      return this.loading;
  }
}