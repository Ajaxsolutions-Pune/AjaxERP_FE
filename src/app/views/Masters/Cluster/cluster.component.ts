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

  ngOnInit() {
    this.form = this.formBuilder.group({
      ControlclusterCode: ['', []],
      ControlclusterNameENG: ['', [
        Validators.required]],
      ControlcircleCode: ['', [
        Validators.required]],
      ControlclusterNameUNI: ['', []],
      ControlisActive: ['', []],
    });
    this.form.controls['ControlclusterCode'].disable();
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
      isActive: null
    };
    this.route.paramMap.subscribe(parameterMap => {
      const str = parameterMap.get('id');
      this.getCluster(str);
    });
  }

  private getCluster(Cluster_Code: string) {
    this.bindObj = {
      clusterCode: null,
      clusterNameENG: null,
      clusterNameUNI: null,
      circleCode: null,
      isActive: null
    };
    if (Cluster_Code === null || Cluster_Code === '') {
      this.bindObj = {
        clusterCode: null,
        clusterNameENG: null,
        clusterNameUNI: null,
        circleCode: null,
        isActive: null
      };
      status = '';

    } else {
      this.clusterService.getCluster(Cluster_Code).subscribe(
        (par) => this.bindObj = this.clusterTransfarmer.ClusterTransfarmerEntity(par),
        (err: any) => console.log(err));
      status = 'Update';
    }
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
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
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
          }   else {
            this.defaultLayoutComponent.Massage('',
              'Somethig Wrong', 'modal-info');
          }
        }
      );
    }
  }

}
