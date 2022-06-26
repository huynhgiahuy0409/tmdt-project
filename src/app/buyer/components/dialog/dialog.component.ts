import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private router: Router) { 
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  onClickAction(idx: number){
    let action = this.data.action
    let path = action[idx].path
    this.router.navigate([`/${path}`])
  }

  
}
