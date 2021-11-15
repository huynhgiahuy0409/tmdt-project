import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomizeValidators {
  static forbiddenUsername(users: string[] = []): ValidatorFn {
    return (c: AbstractControl) => {
      return (users.includes(c.value))
        ? {
            invalidUsername: true,
          }
        : null;
    };
  }
  static matchedPassword(): ValidatorFn{
    return (c: AbstractControl) => {
      const v = c.value
      return (v.password === v.confirmPassword) ? null : {
        passwordNotMatch: true
      }
    }
  }
}
