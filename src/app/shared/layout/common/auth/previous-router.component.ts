import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreviousRouterService {
  public setPreviousUrl(url: string) {
    sessionStorage.setItem('previousUrl', url);
  }

  public getPreviousUrl() {
    const previousUrl = sessionStorage.getItem('previousUrl');
    return previousUrl;
  }

  public deletePreviousUrlKey() {
    sessionStorage.removeItem('previousUrl');
  }
}
