import { AbstractControl } from '@angular/forms';
import { TReturnValue } from 'src/app/shared/models/validator-return-value.models';
import { ErrorMessages } from 'src/app/shared/models/password-validator.models';

export const passwordValidator = (control: AbstractControl): TReturnValue => {
  const value = control.value;

  const checkForEightCharacters = /.{8,}/;
  const checkForUpperAndLowerCaseCharacters = /(?=.*[a-z])(?=.*[A-Z])/;
  const checkForNumberAndLetterCharacters = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
  const checkForOneSpecialCharacter = /(?=.*?[#?!@$%^&*-])/;

  switch (true) {
    case !checkForEightCharacters.test(value):
      return {
        passwordStrength: ErrorMessages.eightCharacters,
      };

    case !checkForUpperAndLowerCaseCharacters.test(value):
      return {
        passwordStrength: ErrorMessages.upperAndLowerCaseCharacters,
      };

    case !checkForNumberAndLetterCharacters.test(value):
      return {
        passwordStrength: ErrorMessages.numberAndLetterCharacters,
      };

    case !checkForOneSpecialCharacter.test(value):
      return {
        passwordStrength: ErrorMessages.oneSpecialCharacter,
      };

    default:
      return null;
  }
};
