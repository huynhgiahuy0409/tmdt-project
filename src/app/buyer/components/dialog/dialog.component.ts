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

  onClickAction(){
    for (let index = 0; index < this.data.action.length; index++) {
      if(this.data.action[index].type === 'register-success'){
        this.dialogRef.close({event: 'login'})
      }else if(this.data.action[index].type === 'login-success'){
        this.dialogRef.close({event: 'home'})
      }else if(this.data.action[index].type === 'payment'){
        this.dialogRef.close({routePath: 'payment'})
      }else if(this.data.action[index].type === 'cart'){
        this.dialogRef.close({routePath: 'cart'})
      }
    }
  }

  
}
