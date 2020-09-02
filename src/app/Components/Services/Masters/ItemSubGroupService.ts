import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../Module/environment';
import { ItemSubGroup } from '../../Module/Masters/ItemSubGroup.model';

@Injectable()
export class ItemSubGroupService {
    str: string;
    itemSubGroups: ItemSubGroup[];
    env = environment;
    constructor(private httpClient: HttpClient) {
        this.str = this.env.apiServiceIPPort;
        this.itemSubGroups = [{
            Group_Code: 'Groups_1',
            SubGroup_Name_ENg: 'toothpaste',
            SubGroup_Name_Uni: 'toothpaste',
            IsActive: true,
            SubGroup_Code: 'SubGroups_1'
        }, {
            Group_Code: 'Groups_2',
            SubGroup_Name_ENg: 'toothpaste',
            SubGroup_Name_Uni: 'toothpaste',
            IsActive: true,
            SubGroup_Code: 'SubGroups_2'
        },
        ];
    }
    ListItemSubGroup: ItemSubGroup[];
    getItemSubGroups(): ItemSubGroup[] {
        return this.itemSubGroups;
    }

    getItemSubGroup(groupsCode: string): ItemSubGroup[] {
        this.ListItemSubGroup = this.itemSubGroups.filter(obj => obj.SubGroup_Code.toString().indexOf(groupsCode) !== -1);
        return this.ListItemSubGroup;
    }
    ValidateItemSubGroupCode(groupsCode: string): boolean {
        this.ListItemSubGroup = this.itemSubGroups.filter(obj => obj.SubGroup_Code.toString().indexOf(groupsCode) === 1);
        if (this.ListItemSubGroup.length >= 0) {
            return true;
        }
        return false;
    }
    getMaxItemSubGroupId(): number {
        return this.itemSubGroups.length;
    }

    getRole(): void {
    }
    Save(Group: ItemSubGroup): ItemSubGroup {
        this.itemSubGroups.push(Group);
        return Group;

    }

    Update(Group: ItemSubGroup): string {
        const Index = this.itemSubGroups.findIndex(a => a.Group_Code === Group.Group_Code);
        this.itemSubGroups[Index] = Group;
        return '';
    }
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('client side error', errorResponse.error.message);
        }
        return throwError('d');
    }
}
