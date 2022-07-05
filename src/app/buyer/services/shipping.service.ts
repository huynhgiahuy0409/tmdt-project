import { Injectable } from '@angular/core';
export interface ShippingCost {
    cost: number;
    time: string;
}
@Injectable({
    providedIn: 'root',
})
export class ShippingService {
    constructor() { }
    getShipCost(
        from: string,
        fromDomain: 'Bắc' | 'Trung' | 'Nam',
        to: string,
        toDomain: 'Bắc' | 'Trung' | 'Nam',
        weight: number,
        type: 'standard' | 'fast'
    ): ShippingCost {
        let result: ShippingCost = {
            cost: 0,
            time : ''
        };
        if ((from === 'SG' && to === 'SG') || (from === 'HN' && to === 'HN')) {
            let baseCost = 30000;
            if (weight / 0.5 > 2) {
                let moreWeightCost = (weight / 0.5 - 1) * 2500;
                baseCost += moreWeightCost;
            }
            result = { cost: baseCost, time: '24 giờ' };
        } else if (
            (from === 'SG' && to !== 'SG') ||
            (from === 'HN' && to !== 'HN')
        ) {
            if (type === 'standard') {
                let baseCost = 32000;
                if (weight / 0.5 > 2) {
                    let moreWeightCost = (weight / 0.5 - 1) * 5000;
                    baseCost += moreWeightCost;
                }
                result = { cost: baseCost, time: '3-5 ngày' };
            } else if (type === 'fast') {
                let baseCost = 45000;
                if (weight / 0.5 > 2) {
                    let moreWeightCost = (weight / 0.5 - 1) * 10000;
                    baseCost += moreWeightCost;
                }
                result = { cost: baseCost, time: '48 giờ' };
            }
        } else if (fromDomain == toDomain) {
            let baseCost = 30000;
            if (weight / 0.5 > 2) {
                let moreWeightCost = (weight / 0.5 - 1) * 2500;
                baseCost += moreWeightCost;
            }
            result = { cost: baseCost, time: '24-48 giờ' };
        } else if (fromDomain != toDomain) {
            if (type === 'standard') {
                let baseCost = 32000;
                if (weight / 0.5 > 2) {
                    let moreWeightCost = (weight / 0.5 - 1) * 5000;
                    baseCost += moreWeightCost;
                }
                result = { cost: baseCost, time: '3-5 ngày' };
            } else if (type === 'fast') {
                let baseCost = 45000;
                if (weight / 0.5 > 2) {
                    let moreWeightCost = (weight / 0.5 - 1) * 10000;
                    baseCost += moreWeightCost;
                }
                result = { cost: baseCost, time: '24-48 giờ' };
            }
        }
        return result;
    }
}
