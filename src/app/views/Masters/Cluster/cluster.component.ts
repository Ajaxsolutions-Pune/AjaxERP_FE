import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cluster } from '../../../Components/Module/Masters/Cluster.model';
import { FormComponentBase } from '../AngularDemo/infrastructure/form-component-base';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CrossFieldErrorMatcher } from '../AngularDemo/infrastructure/cross-field-error-matcher';
import { CircleService } from '../../../Components/Services/Masters/CircleService';
import { CircleTransfarmer } from '../../../Components/Transformer/Masters/Circle-Transfarmer';
import { ClusterService } from '../../../Components/Services/Masters/ClusterService';
import { ClusterTransfarmer } from '../../../Components/Transformer/Masters/Cluster-Transfarmer';
import { Circle } from '../../../Components/Module/Masters/Circle.model';
import { DefaultLayoutComponent } from '../../../containers';
import { GlobalService } from '../../../Components/Services/GlobalServices/Global.service';
import { clusterAsyncValidator } from '../../../helper/async-validator';
@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss']
})
export class ClusterComponent extends FormComponentBase implements OnInit, AfterViewInit {

  form!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  @Input() CircleInput: Cluster;
  bindObj: Cluster;
  circledrp: Circle[];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private circleService: CircleService,
    private circleTransfarmer: CircleTransfarmer,
    private clusterService: ClusterService,
    private globalService: GlobalService,
    private clusterTransfarmer: ClusterTransfarmer,
    private formBuilder: FormBuilder) {
    super();
    this.validationMessages = {
      ControlclusterCode: {
        required: 'Cluster Code is required.',
      },
      ControlclusterNameENG: {
        required: 'Cluster Name ENG is required.',
      },
      ControlcircleCode: {
        required: 'Circle is required.',
      }
    };
    this.formErrors = {
      ControlisActive: '',
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 250);
    this.startControlMonitoring(this.form);
  }

  isClusterExist(): boolean {
    return this.form.get('ControlclusterNameENG').hasError('queExist');
  }
  ngOnInit() {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      window.location.href = 'login';
    }
    this.circleService.fillCircleDrp().subscribe(
      (par) => {
        this.circledrp = this.circleTransfarmer.CircleTransfarmers(par);
      },
      (err: any) => console.log(err));
    this.bindObj = {
      clusterCode: null,
      clusterNameENG: null,
      clusterNameUNI: null,
      circleCode: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getCluster(str);
      this.form = this.formBuilder.group({
        ControlclusterCode: ['', []],
        ControlclusterNameENG: ['', [Validators.required],
          [clusterAsyncValidator(this.clusterService, str)]],
        ControlcircleCode: ['', [
          Validators.required]],
        ControlclusterNameUNI: ['', []],
        ControlisActive: ['', []],
      });
      this.form.controls['ControlclusterCode'].disable();
    });
  }

  private getCluster(Cluster_Code: string) {
    this.bindObj = {
      clusterCode: null,
      clusterNameENG: null,
      clusterNameUNI: null,
      circleCode: null,
      isActive: 'true',
      createdBy: localStorage.getItem('username'),
      createdDate: this.globalService.GerCurrntDateStamp(),
      modifiedBy: localStorage.getItem('username'),
      modifiedDate: this.globalService.GerCurrntDateStamp(),
    };
    if (Cluster_Code === null || Cluster_Code === '') {
      this.bindObj = {
        clusterCode: null,
        clusterNameENG: null,
        clusterNameUNI: null,
        circleCode: null,
        isActive: 'true',
        createdBy: localStorage.getItem('username'),
        createdDate: this.globalService.GerCurrntDateStamp(),
        modifiedBy: localStorage.getItem('username'),
        modifiedDate: this.globalService.GerCurrntDateStamp(),
      };
      status = '';

    } else {
      this.clusterService.getCluster(Cluster_Code).subscribe(
        (par) => this.bindObj = this.clusterTransfarmer.ClusterTransfarmerEntity(par),
        (err: any) => console.log(err));
      status = 'Update';
    }
  }
  special_char_val(event) {
    let k;
    k = event.charCode;
    return this.globalService.SpecialCharValidator(k);

  }
  save(clusterForm: NgForm): void {
    if (status !== 'Update') {
      this.bindObj.clusterCode = null;
      this.clusterService.Save(this.clusterTransfarmer.ClusterTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            clusterForm.reset();
            this.router.navigate(['ClusterList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );

    } else {
      this.clusterService.Update(this.clusterTransfarmer.ClusterTransfarmer(this.bindObj)).subscribe(
        (par) => {
          if (par !== null) {
            this.defaultLayoutComponent.Massage('',
              'Data saved successfully !', 'modal-info');
            clusterForm.reset();
            this.router.navigate(['ClusterList']);
          } else {
            this.defaultLayoutComponent.Massage('',
              'Technical Error Please connect to Ajax Support team', 'modal-info');
          }
        }
      );
    }
  }

}
