import { DIRECT_LINK_IMAGE, DOMAIN } from './../../_models/constance';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { Cart } from "src/app/_models/models";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { PendingItemRequest } from 'src/app/_models/request';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface ActionDialog {
    type: string,
    title: string
}
export interface DialogData {
    title: string,
    content: string,
    action: ActionDialog[]
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
    ): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: 'auto',
            enterAnimationDuration,
            exitAnimationDuration,
            data: data,
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result.routePath === 'payment') {
                this.router.navigate(['/payment'])
            }else if (result.routePath === 'cart') {
                this.router.navigate(['/cart'])
            }
        });
    }
}