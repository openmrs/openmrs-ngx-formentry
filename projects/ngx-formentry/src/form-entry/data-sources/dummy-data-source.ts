import { Option } from '../question-models/select-option';
import { DataSource } from '../question-models/interfaces/data-source';
import { Observable, BehaviorSubject, of } from 'rxjs';

export class DummyDataSource implements DataSource {
  options: Observable<Option[]>;
  option: Observable<Option>;
  returnErrorOnNext = false;

  constructor() {}

  resolveSelectedValue(value): Observable<Option> {
    let selectOptions = this.sampleData();

    selectOptions = selectOptions.map(function (obj) {
      const option = new Option({
        label: obj.label,
        value: obj.concept
      });
      return option;
    });

    selectOptions = selectOptions.filter((option) => option.value === value);

    const test: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    if (!this.returnErrorOnNext) {
      test.next(selectOptions[0]);
    } else {
      test.error(new Error('Error loading Options'));
    }

    return test.asObservable();
  }
  fileUpload(url) {
    return of({ image: '' });
  }
  fetchFile(url) {
    return of({ image: '' });
  }
  searchOptions(searchText): Observable<Option[]> {
    let selectOptions = this.sampleData();

    selectOptions = selectOptions.map(function (obj) {
      const option = new Option({
        label: obj.label,
        value: obj.concept
      });
      return option;
    });

    selectOptions = selectOptions.filter(
      (option) => option.label.indexOf(searchText) !== -1
    );

    const test: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    if (!this.returnErrorOnNext) {
      test.next(selectOptions);
    } else {
      test.error(new Error('Error loading Options'));
    }

    return test.asObservable();
  }

  sampleData(): any {
    return [
      {
        concept: 'a899e0ac-1350-11df-a1f1-0026b9348838',
        label: 'None'
      },
      {
        concept: 'a8ad1276-1350-11df-a1f1-0026b9348838',
        label: 'Breathlessness'
      },
      {
        concept: 'a892e4b4-1350-11df-a1f1-0026b9348838',
        label: 'Chest pain'
      },
      {
        concept: 'a8afc8b8-1350-11df-a1f1-0026b9348838',
        label: 'Cough = 2 weeks'
      },
      {
        concept: 'd7adae14-c386-49cc-8f7c-765d8ceec566',
        label: 'Fever for = 2 weeks'
      },
      {
        concept: '3f57aafc-7162-41da-a51b-6a804cb6f5e8',
        label: 'New exposure to household contact with TB'
      },
      {
        concept: 'a89807f0-1350-11df-a1f1-0026b9348838',
        label: 'Noticeable Weight loss'
      },
      {
        concept: 'e1862fef-68ed-4df4-90dd-a00152f719aa',
        label: 'Night sweats = 2 weeks'
      },
      {
        concept: 'a8ad462e-1350-11df-a1f1-0026b9348838',
        label: 'Abdomen'
      },
      {
        concept: 'f218c60e-4b54-475a-a4fa-facab9216da8',
        label: 'Groin'
      },
      {
        concept: 'a8a774b0-1350-11df-a1f1-0026b9348838',
        label: 'Joints'
      },
      {
        concept: '4639388c-ee31-4dcf-abb4-ad71253493bb',
        label: 'Neck Kw'
      }
    ];
  }
}
