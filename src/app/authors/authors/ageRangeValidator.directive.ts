import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ageRangeValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const ageFrom = control.get('ageFromCtrl');
  const ageTo = control.get('ageToCtrl');

  return ageFrom.value >= ageTo.value  ? { ageRange: true } : null;
};
