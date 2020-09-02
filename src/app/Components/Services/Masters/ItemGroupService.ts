import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { ItemGroup } from '../../Module/Masters/ItemGroup.model';

@Injectable()
export class ItemGroupService {
    str: string;
    itemGroups: ItemGroup[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.itemGroups = [{
            Group_Code: 'Groups_1',
            Group_Name_ENg: 'toothpaste',
            Group_Name_Uni: 'toothpaste',
            IsActive: true
        }, {
            Group_Code: 'Groups_2',
            Group_Name_ENg: 'Car',
            Group_Name_Uni: 'Car',
            IsActive: true
        },
        ];
    }
    ListItemGroup: ItemGroup[];
    getItemGroups(): ItemGroup[] {
        return this.itemGroups;
    }

    getItemGroup(groupsCode: string): ItemGroup[] {
        this.ListItemGroup = this.itemGroups.filter(obj => obj.Group_Code.toString().indexOf(groupsCode) !== -1);
        return this.ListItemGroup;
    }
    ValidateItemGroupCode(groupsCode: string): boolean {
        this.ListItemGroup = this.itemGroups.filter(obj => obj.Group_Code.toString().indexOf(groupsCode) === 1);
        if (this.ListItemGroup.length >= 0) {
            return true;
        }
        return false;
    }
    getMaxItemGroupId(): number {
        return this.itemGroups.length;
    }

    getRole(): void {
    }
    Save(Group: ItemGroup): ItemGroup {
        this.itemGroups.push(Group);
        return Group;

    }

    Update(Group: ItemGroup): string {
        const Index = this.itemGroups.findIndex(a => a.Group_Code === Group.Group_Code);
        this.itemGroups[Index] = Group;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
