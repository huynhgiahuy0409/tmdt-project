import { tap } from 'rxjs/operators';
import { AddressService } from './../address.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProvinceResponse } from 'src/app/_models/response';
@Injectable()
export class ProvinceResolve implements Resolve<ProvinceResponse[]>{
    constructor(private addressService: AddressService){
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProvinceResponse[] | Observable<ProvinceResponse[]> | Promise<ProvinceResponse[]> {
        return this.addressService.findAllProvinces().pipe(tap(v => console.log(v)))
    }

}