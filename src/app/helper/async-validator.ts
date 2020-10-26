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
  console.log(Id);
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


