export class UserEntity_ { 
    id: string;
    entityGroupCode: string;
    entityCode: string;
    entityName: string;
    isActive: string;
    isActiveText: string;

}


//fillMasterDrp(MasterCode: string): Observable<MasterDrp[]> {
//    return this.httpClient.get<MasterDrp[]>(this.str + '/MastersList/' + MasterCode, this.env.httpOptions);
//}