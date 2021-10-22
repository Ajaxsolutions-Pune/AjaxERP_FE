import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Commodity } from '../../../Components/Module/Report/Commodity.model';
import { CommodityServiceService } from '../../../Components/Services/Masters/commodity-service.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {
  employees: Commodity[];
  empList: Commodity;
  // dataSource = this.employees;
  displayedColumns: string[] = ['empId', 'empName', 'email', 'gender', 'village', 'actions'];
  dataSource = new MatTableDataSource<Commodity>();
  // convertedJson!: string;
  constructor(private _commodityervice: CommodityServiceService) {

  }
  ngOnInit(): void {

  }
  onFileChange(event: any) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        this.employees = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(this.employees);

        // this.convertedJson = JSON.stringify(this.employees, undefined, 4);
        this.dataSource.data = this.employees;

        // console.log(this.dataSource.data);
        // this.data=this.employees as Employee[]
      })
      console.log(workbook);
    }

  }

}
