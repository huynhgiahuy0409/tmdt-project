import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { SpinnerService } from '../shared/services/spinner.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {
  isLoading$!: Observable<boolean>
  constructor(private spinnerService: SpinnerService) {
  }
  ngOnInit(): void {
    this.isLoading$ = this.spinnerService.isLoading$
  }
}
