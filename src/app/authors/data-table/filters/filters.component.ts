import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import * as AuthorsActions from '../../../authors/store/authors.actions';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() onFilterChanged = new EventEmitter<FormGroup>();
  filterForm: FormGroup;
  genders = ['male', 'female'];
  genderDefault = 'Male';
  ageFrom = 0;
  ageFromMin = 0;
  ageFromMax = 120;
  ageToMin = 0;
  ageToMax = 120;

  ageTo: number;
  @ViewChild('ageFromRef', { static: false })
  ageFromEl: ElementRef;
  @ViewChild('ageToRef', { static: false })
  ageToEl: ElementRef;

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  constructor(private store: Store<fromApp.AppState>) {}

  genderList = ['male', 'female'];

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      age_from: new FormControl(null),
      age_to: new FormControl(null),
      name: new FormControl(''),
      gender: new FormControl(''),
      author_data: new FormControl(''),
    });
    this.onChanges();
  }

  onChangeAgeFrom(event: MatSliderChange) {
    this.filterForm.patchValue({
      age_from: event.value,
    });
    this.ageFrom = event.value;
    this.ageToEl['_min'] = this.ageFrom;
    this.ageToMin = this.ageFrom;
    this.store.dispatch(
      new AuthorsActions.ApplyFilter({
        key: 'age_from',
        value: event.value,
      })
    );
  }

  onChangeAgeTo(event: MatSliderChange) {
    this.filterForm.patchValue({
      age_to: event.value,
    });
    this.ageTo = event.value;
    this.ageFromEl['_max'] = this.ageTo;
    this.ageFromMax = this.ageTo;
    this.store.dispatch(
      new AuthorsActions.ApplyFilter({
        key: 'age_to',
        value: event.value,
      })
    );
  }

  onChanges(): void {
    this.filterForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((val) => {
        this.store.dispatch(new AuthorsActions.ApplyFilter(val));
      });
  }
}
