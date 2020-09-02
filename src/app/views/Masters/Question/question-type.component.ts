import { Component, OnInit } from '@angular/core';
import { QaType, QaTypeEntity } from '../../../Components/Module/Masters/QA_Type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QaTypeTransfarmer } from '../../../Components/Transformer/Masters/QaType-Transfarmer';
import { DefaultLayoutComponent } from '../../../containers';
import { QaTypeService } from '../../../Components/Services/Masters/QaTypeService';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.scss']
})
export class QuestionTypeComponent implements OnInit {
  bindObj: QaType;
  bindObjEntity: QaTypeEntity;
  str: string;
  constructor(private route: ActivatedRoute,
    private qaTypeTransfarmer: QaTypeTransfarmer,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private qaTypeService: QaTypeService, private router: Router) {
  }
  ngOnInit() {
    status = '';
    this.bindObj = {
      isActive: null,
      qaTypeCode: null,
      qaTypeDesc: null,
    };
    this.route.paramMap.subscribe(parameterMap => { const str = parameterMap.get('id'); this.getqaType(str); });
  }
  save(qaTypeForm: NgForm): void {
    if (status !== 'Update') {
      this.bindObj.qaTypeCode = null;
      console.log('hii');
      console.log(this.bindObj);
      this.qaTypeService.Save(this.qaTypeTransfarmer.QaTypeTransfarmer(this.bindObj)).subscribe(
        (par) => {
          console.log(par);
        }
      );
    } else {
      this.qaTypeService.Update(this.qaTypeTransfarmer.QaTypeTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par.status === 'Success') {
            qaTypeForm.reset();
            this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
              'Data saved successfully !', 'modal-info');
            this.router.navigate(['AnswerList']);
          }
        }
      );
    }
  }

  private getqaType(qaType_Code: string) {
    this.bindObj = {
      isActive: null,
      qaTypeCode: null,
      qaTypeDesc: null,
    };
    if (qaType_Code === null || qaType_Code === '') {
      this.bindObj = {
        isActive: null,
        qaTypeCode: null,
        qaTypeDesc: null,
      };
      status = '';

    } else {
      this.qaTypeService.getQaType(qaType_Code).subscribe(
        (par) => {
          this.bindObjEntity = par;
          this.bindObj = this.qaTypeTransfarmer.QaTypeTransfarmerEntity(this.bindObjEntity);
        },
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
}
