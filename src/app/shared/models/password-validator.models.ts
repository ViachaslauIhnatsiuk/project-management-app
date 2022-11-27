enum ErrorMessagesEn {
  eightCharacters = "Your password isn't strong enough, it must contain at least eight characters",
  upperAndLowerCaseCharacters = "Your password isn't strong enough, it must contain both uppercase and lowercase letters",
  numberAndLetterCharacters = "Your password isn't strong enough, it must contain both letters and numbers",
  oneSpecialCharacter = "Your password isn't strong enough, it must contain at least one special character",
}

enum ErrorMessagesRu {
  eightCharacters = 'Ваш пароль недостаточно надежный, он должен содержать не менее восьми символов',
  upperAndLowerCaseCharacters = 'Ваш пароль недостаточно надежный, он должен содержать как прописные, так и строчные буквы',
  numberAndLetterCharacters = 'Ваш пароль недостаточно надежный, он должен содержать как буквы, так и цифры',
  oneSpecialCharacter = 'Ваш пароль недостаточно надежный, он должен содержать хотя бы один специальный символ',
}

export { ErrorMessagesEn, ErrorMessagesRu };
