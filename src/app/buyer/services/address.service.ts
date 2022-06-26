import { AddressResponse, WardResponse } from './../../_models/response';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DOMAIN } from "src/app/_models/constance";
import { DistrictResponse, ProvinceResponse } from "src/app/_models/response";
import { AddressRequest } from 'src/app/_models/request';

@Injectable({
    providedIn: 'root'
})
export class AddressService{
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        params: {},
      };
    constructor(private httpClient: HttpClient){
    }
    saveAddress(address: AddressRequest): Observable<AddressRequest>{
        const url = `${DOMAIN}/api/register`;
        return this.httpClient.post<AddressRequest>(url, address, this.httpOptions)
    }
    findAllProvinces(): Observable<ProvinceResponse[]>{
        const url = `${DOMAIN}/api/address/province/all`;
        return this.httpClient.get<ProvinceResponse[]>(url, this.httpOptions)
    }
    findAllDistrictByProvince(provinceId: number): Observable<DistrictResponse[]>{
        const url = `${DOMAIN}/api/address/district/allByProvince`;
        this.httpOptions.params = {
            provinceId: provinceId
        }
        return this.httpClient.get<DistrictResponse[]>(url, this.httpOptions)
    }
    findAllWardByProvinceAndDistrict(provinceId: number, districtId: number): Observable<WardResponse[]>{
        const url = `${DOMAIN}/api/address/ward/allByProvinceDistrict`;
        this.httpOptions.params = {
            provinceId: provinceId,
            districtId: districtId
        }
        return this.httpClient.get<WardResponse[]>(url, this.httpOptions)
    }
    addAddress(address: AddressRequest, userId: number): Observable<AddressResponse>{
        const url = `${DOMAIN}/api/address/add`;
        this.httpOptions.params = {
            userId: userId
        }
        return this.httpClient.post<AddressResponse>(url, address, this.httpOptions)
    }
    editAddress(address: AddressResponse, userId: number){
        const url = `${DOMAIN}/api/address/update`;
        this.httpOptions.params = {
            userId: userId
        }
        return this.httpClient.put<AddressResponse>(url, address , this.httpOptions)
    }
}