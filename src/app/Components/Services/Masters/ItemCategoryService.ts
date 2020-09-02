import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { Country } from '../../Module/Masters/Country.model';
import { Brand } from '../../Module/Masters/Brand.model';
import { City } from '../../Module/City';
import { District } from '../../Module/Masters/District';
import { TaxCategory } from '../../Module/Masters/TaxCategory';
import { CastCategory } from '../../Module/Masters/CastCategory';
import { ItemCategory } from '../../Module/Masters/ItemCategory';

@Injectable()
export class ItemCategoryService {
    str: string;
    ItemCategorys: ItemCategory[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.ItemCategorys = [{
            Id: 1,
            oUCode: 'aaa',
            itemCategoryCode: '11',
            itemCategoryNameEng: 'abc1',
            itemCategoryNameUni: 'abc3',
            isActive: true,
        }, {
            Id: 2,
            oUCode: 'aaa',
            itemCategoryCode: '12',
            itemCategoryNameEng: 'abc2',
            itemCategoryNameUni: 'abc3',
            isActive: true,
        },
        ];
    }
    ListItemCategory: ItemCategory[];
    getItemCategorys(): ItemCategory[] {
        return this.ItemCategorys;
    }

    getItemCategory(itemCategoryCode: number): ItemCategory[] {
        this.ListItemCategory = this.ItemCategorys.
            filter(ItemCategorys => ItemCategorys.itemCategoryCode.toString().indexOf(itemCategoryCode.toString()) !== -1);
        return this.ItemCategorys;
    }
    getMaxItemCategoryId(): number {
        return this.ItemCategorys.length;
    }
    Save(itemcategory: ItemCategory): ItemCategory {
        this.ItemCategorys.push(itemcategory);
        return itemcategory;

    }

    Update(itemcategory: ItemCategory): string {
        const Index = this.ItemCategorys.findIndex(a => a.itemCategoryCode === itemcategory.itemCategoryCode);
        this.ItemCategorys[Index] = itemcategory;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
