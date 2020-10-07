import { QuestionService } from '../Components/Services/Masters/QuestionService';
import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';


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

  