import { QuestionService } from '../Components/Services/Masters/QuestionService';
import { AnswerService } from '../Components/Services/Masters/AnswerService';
import { FormService } from '../Components/Services/Masters/FormService';
import { ProcessService1 } from '../Components/Services/Masters/ProcessService1';
import { AssetCategoryService } from '../Components/Services/Masters/AssetCategory';
import { AssetGroupService } from '../Components/Services/Masters/AssetGroupService';
import { DeviceService } from '../Components/Services/Masters/DeviceService';
import { TransmissionLineService } from '../Components/Services/Masters/TransmissionLineService';
import { HubService } from '../Components/Services/Masters/HubService';
import { AssetService } from '../Components/Services/Masters/AssetService';
import { ProjectService } from '../Components/Services/Masters/ProjectService';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AccessService } from '../Components/Services/Masters/AccessService';
import { CircleService } from '../Components/Services/Masters/CircleService';
import { ClusterService } from '../Components/Services/Masters/ClusterService';
import { ColourService } from '../Components/Services/Masters/ColourService';
import { RegionService } from '../Components/Services/Masters/RegionService';
import { ZoneService } from '../Components/Services/Masters/ZoneService';
import { ModuleobjService } from '../Components/Services/Masters/ModuleService';
import { ScreenObjService } from '../Components/Services/Masters/ScreenService';
import { GlobalService } from '../Components/Services/GlobalServices/Global.service';
import { UserService } from '../Components/Services/Masters/UserService';
import { UserGroupService } from '../Components/Services/Masters/UserGroupService';
import { CityService } from '../Components/Services/Masters/CityService';
import { CountryService } from '../Components/Services/Masters/CountryService';
import { DistrictService } from '../Components/Services/Masters/DistrictService';
import { CityGroupService } from '../Components/Services/Masters/CityGroupService';
import { TehsilService } from '../Components/Services/Masters/TehsilService';
import { GradeSetService } from '../Components/Services/HRMS/GradeSetService';
import { GradeService } from '../Components/Services/HRMS/GradeService';
import { QualificationService } from '../Components/Services/HRMS/QualificationService';
import { QualificationLevelService } from '../Components/Services/HRMS/QualificationLevelService';
import { SpecializationService } from '../Components/Services/HRMS/SpecializationService';
//import { DepartmentService } from '../Components/Services/HRMS/DepartmentService';
import { JobService } from '../Components/Services/HRMS/JobService';
import { JobLevelService } from '../Components/Services/HRMS/JobLevelService';
//import { PositionService } from '../Components/Services/HRMS/PositionService';
//import { LocationService } from '../Components/Services/HRMS/LocationService';
import { QualificationTypeService } from '../Components/Services/HRMS/QualificationTypeService';


export const ConfirmPasswordValidator = (globalService: GlobalService, PassFild: string, ConfirmPassFild: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => globalService.ConfirmPasswor(PassFild, ConfirmPassFild)),
      map(res => {
        if (res == 'true') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const questionAsyncValidator = (queService: QuestionService, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => queService.checkQuestion(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const answerAsyncValidator = (ansService: AnswerService, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => ansService.checkAnswer(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const formAsyncValidator = (frmService: FormService, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => frmService.checkForm(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const processAsyncValidator = (processService: ProcessService1, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => processService.checkProcess(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const assetCategoryAsyncValidator = (assetCatService: AssetCategoryService, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => assetCatService.checkAssetCategory(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const assetGroupAsyncValidator = (assetGrpService: AssetGroupService, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => assetGrpService.checkAssetGroup(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const deviceAsyncValidator = (deviceService: DeviceService, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => deviceService.checkDevice(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const transmissionAsyncValidator = (transmissionService: TransmissionLineService, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => transmissionService.checkTransmissionLine(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const hubAsyncValidator = (hubService: HubService, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => hubService.checkHub(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const hubCodeAsyncValidator = (hubService: HubService, Hubcode: string,
  time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => hubService.checkHubByCode(input.value)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const assetAsyncValidator = (assetService: AssetService, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => assetService.checkAsset(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const projectAsyncValidator = (projectService: ProjectService, code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => projectService.checkProject(input.value, code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const zoneAsyncValidator = (zoneService: ZoneService, Id: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => zoneService.checkZone(input.value, Id)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const regionAsyncValidator = (regionService: RegionService,
  Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => regionService.checkRegion(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const colourAsyncValidator = (colourService: ColourService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => colourService.checkColour(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};
export const clusterAsyncValidator = (clusterService: ClusterService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => clusterService.checkCluster(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};
export const circleAsyncValidator = (circleService: CircleService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => circleService.checkCircle(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const AccessAsyncValidator = (accessService: AccessService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => accessService.checkAccess(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};
export const ModuleAsyncValidator = (moduleService: ModuleobjService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => moduleService.checkModuleobj(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};
export const ScreenAsyncValidator = (ScreenService: ScreenObjService, Code: string,
  time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => ScreenService.checkScreen(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const UserAsyncValidator = (userService: UserService, Code: string,
  time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => userService.checkUser(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};
export const UserLoginAsyncValidator = (userService: UserService,
  time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => userService.checkLoginId(input.value)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};
export const UserGroupAsyncValidator = (userGroupService: UserGroupService, Code: string,
  time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => userGroupService.checkUserGroup(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};
export const CityAsyncValidator = (cityService: CityService, Code: string,
  time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => cityService.checkCity(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};
export const CountryAsyncValidator = (countryService: CountryService, Code: string,
  time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => countryService.checkCountry(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};
export const DistrictAsyncValidator = (districtService: DistrictService, Code: string,
  time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => districtService.checkDistrict(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const CityGroupAsyncValidator = (cityGroupService: CityGroupService, Code: string,
  time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => cityGroupService.checkCityGroup(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const TehsilAsyncValidator = (tehsilService: TehsilService, Code: string,
  time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => tehsilService.checkTehsil(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const GradeSetAsyncValidator = (gradeSetService: GradeSetService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => gradeSetService.checkGradeSet(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const GradeAsyncValidator = (gradeService: GradeService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => gradeService.checkGrade(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

// export const QualificationAsyncValidator = (qualificationService: QualificationService, Code: string, time: number = 500) => {
//   return (input: FormControl) => {
//     return timer(time).pipe(
//       switchMap(() => qualificationService.checkQualification(input.value, Code)),
//       map(res => {
//         if (res.status == 'notexist') {
//           return null;
//         } else {
//           return { queExist: true };
//         }
//       })
//     );
//   };
// };

export const QualificationLevelAsyncValidator = (qualificationLevelService: QualificationLevelService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => qualificationLevelService.checkQualificationLevel(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const SpecializationAsyncValidator = (specializationService: SpecializationService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => specializationService.checkSpecialization(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

/*export const DepartmentAsyncValidator = (departmentService: DepartmentService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => departmentService.checkDepartment(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};*/


export const JobAsyncValidator = (jobService: JobService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => jobService.checkJob(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const JobLevelAsyncValidator = (jobLevelService: JobLevelService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => jobLevelService.checkJobLevel(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

/*export const PositionAsyncValidator = (positionService: PositionService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => positionService.checkPosition(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};

export const LocationAsyncValidator = (locationService: LocationService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => locationService.checkLocation(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};*/

export const QualificationTypeAsyncValidator = (qualificationTypeService: QualificationTypeService, Code: string, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => qualificationTypeService.checkQualificationType(input.value, Code)),
      map(res => {
        if (res.status == 'notexist') {
          return null;
        } else {
          return { queExist: true };
        }
      })
    );
  };
};







