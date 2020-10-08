import { QuestionService } from '../Components/Services/Masters/QuestionService';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ZoneService } from '../Components/Services/Masters/ZoneService';
import { RegionService } from '../Components/Services/Masters/RegionService';
import { ColourService } from '../Components/Services/Masters/ColourService';
import { ClusterService } from '../Components/Services/Masters/ClusterService';
import { CircleService } from '../Components/Services/Masters/CircleService';
import { AccessService } from '../Components/Services/Masters/AccessService';


export const questionAsyncValidator = (queService: QuestionService, time: number = 500) => {
  return (input: FormControl) => {
    return timer(time).pipe(
      switchMap(() => queService.checkQuestion(input.value)),
      map(res => {
        if(res.status == 'notexist'){
          return null;
        } else {
            return { queExist: true };
        }
      })
    );
  };
};
export const zoneAsyncValidator = (zoneService: ZoneService, time: number = 500) => {
    return (input: FormControl) => {
      return timer(time).pipe(
        switchMap(() => zoneService.checkZone(input.value)),
        map(res => {
          if(res.status == 'notexist'){
            return null;
          } else {
              return { queExist: true };
          }
        })
      );
    };
  };
  export const regionAsyncValidator = (regionService: RegionService, time: number = 500) => {
      return (input: FormControl) => {
        return timer(time).pipe(
          switchMap(() => regionService.checkRegion(input.value)),
          map(res => {
            if(res.status == 'notexist'){
              return null;
            } else {
                return { queExist: true };
            }
          })
        );
      };
    };
    export const colourAsyncValidator = (colourService: ColourService, time: number = 500) => {
        return (input: FormControl) => {
          return timer(time).pipe(
            switchMap(() => colourService.checkColour(input.value)),
            map(res => {
              if(res.status == 'notexist'){
                return null;
              } else {
                  return { queExist: true };
              }
            })
          );
        };
      };
      export const clusterAsyncValidator = (clusterService: ClusterService, time: number = 500) => {
          return (input: FormControl) => {
            return timer(time).pipe(
              switchMap(() => clusterService.checkCluster(input.value)),
              map(res => {
                if(res.status == 'notexist'){
                  return null;
                } else {
                    return { queExist: true };
                }
              })
            );
          };
        };
        export const circleAsyncValidator = (circleService: CircleService, time: number = 500) => {
            return (input: FormControl) => {
              return timer(time).pipe(
                switchMap(() => circleService.checkCircle(input.value)),
                map(res => {
                  if(res.status == 'notexist'){
                    return null;
                  } else {
                      return { queExist: true };
                  }
                })
              );
            };
          };
          export const AccessAsyncValidator = (accessService: AccessService, time: number = 500) => {
              return (input: FormControl) => {
                return timer(time).pipe(
                  switchMap(() => accessService.checkAccess(input.value)),
                  map(res => {
                    if(res.status == 'notexist'){
                      return null;
                    } else {
                        return { queExist: true };
                    }
                  })
                );
              };
            };

  