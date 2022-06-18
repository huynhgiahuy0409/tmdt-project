import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class SpinnerService {
  isLoadingBSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isLoading$: Observable<boolean>= this.isLoadingBSub.asObservable()
}
