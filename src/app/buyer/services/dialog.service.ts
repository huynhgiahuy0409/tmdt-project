import { Injectable } from "@angular/core";
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface ActionDialog {
    path: string,
    title: string
}
export interface DialogData {
    title: string,
    content: string,
    action?: ActionDialog[]
}
@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(public dialog: MatDialog, private router: Router) {
    }
    openDialog(
        enterAnimationDuration: string,
        exitAnimationDuration: string,
        data: DialogData
    ) {
        return this.dialog.open(DialogComponent, {
            width: 'auto',
            minWidth: "400px",
            enterAnimationDuration,
            exitAnimationDuration,
            data: data,
        });
        
    }
}