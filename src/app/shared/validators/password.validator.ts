import { AbstractControl } from '@angular/forms';
import { TReturnValue } from 'src/app/shared/models/validator-return-value.models';
import { ErrorMessagesEn, ErrorMessagesRu } from 'src/app/shared/models/password-validator.models';

export const passwordValidator = (control: AbstractControl): TReturnValue => {
  const value = control.value;

  const checkForEightCharacters = /.{8,}/;
  const checkForUpperAndLowerCaseCharacters = /(?=.*[a-z])(?=.*[A-Z])/;
  const checkForNumberAndLetterCharacters = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
  const checkForOneSpecialCharacter = /(?=.*?[#?!@$%^&*-])/;

  const currentLanguage = window.localStorage.getItem('language') || 'En';

  switch (true) {
    case !checkForEightCharacters.test(value):
      return {
        passwordStrength:
          currentLanguage === 'En'
            ? ErrorMessagesEn.eightCharacters
            : ErrorMessagesRu.eightCharacters,
      };

    case !checkForUpperAndLowerCaseCharacters.test(value):
      return {
        passwordStrength:
          currentLanguage === 'En'
            ? ErrorMessagesEn.upperAndLowerCaseCharacters
            : ErrorMessagesRu.upperAndLowerCaseCharacters,
      };

    case !checkForNumberAndLetterCharacters.test(value):
      return {
        passwordStrength:
          currentLanguage === 'En'
            ? ErrorMessagesEn.numberAndLetterCharacters
            : ErrorMessagesRu.numberAndLetterCharacters,
      };

    case !checkForOneSpecialCharacter.test(value):
      return {
        passwordStrength:
          currentLanguage === 'En'
            ? ErrorMessagesEn.oneSpecialCharacter
            : ErrorMessagesRu.oneSpecialCharacter,
      };

    default:
      return null;
  }
};
