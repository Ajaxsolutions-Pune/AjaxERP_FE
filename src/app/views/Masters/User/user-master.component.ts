import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DefaultLayoutComponent } from '../../../containers';
import { User } from '../../../Components/Module/User.model';
import { UserService } from '../../../Components/Services/User.Service';
import { LoginUser } from '../../../Components/Module/LoginUser';
@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {
  user: User;
  str: string;
  userList: User[];
  constructor(private route: ActivatedRoute,
    private defaultLayoutComponent: DefaultLayoutComponent,
    private userService: UserService, private router: Router) {
    this.userList = this.route.snapshot.data['UserList'];
  }
  ngOnInit() {
    this.route.paramMap.subscribe(parameterMap => { const id = +parameterMap.get('id'); this.getUser(id); });

  }
  save(userForm: NgForm): void {
    if (this.user.UserNo === null) {
      this.userService.Save(this.user).subscribe(
        () => {
          userForm.reset();
          this.defaultLayoutComponent.Massage('Insert Sucsessfuly',
            'Data saved successfully !', 'modal-info');
          this.router.navigate(['UserList']);
        }
      );
    } else {
      this.userService.UpdateUser(this.user).subscribe(data => this.str = data);
      userForm.reset();
      this.defaultLayoutComponent.Massage('Update Sucsessfuly',
        'Data saved successfully !', 'modal-info');
      this.router.navigate(['UserList']);
    }
  }

  private getUser(Id: number) {

    this.user = {
      UserNo: null,
      UserName: null,
      UserID: null,
      BranchNo: 1,
      Password: null,
      // RoleName: null,
      RoleId: -1,
      IsActive: null,
      CreUser: 'LoginUser.UserName',
      CreDate: null,
      ModUser: 'LoginUser.UserName',
      ModDate: null,
      EmpId: -1,
      status: null
    };
    if (Id === 0) {
      this.user = {
        UserNo: null,
        UserName: null,
        UserID: null,
        BranchNo: 1,
        Password: null,
        //   RoleName: null,
        RoleId: -1,
        IsActive: null,
        CreUser: 'LoginUser.UserName',
        CreDate: null,
        ModUser: 'LoginUser.UserName',
        ModDate: null,
        EmpId: -1,
        status: null
      };

    } else {
      this.user = this.userService.getUser(Id)[0];
    }
  }
}

