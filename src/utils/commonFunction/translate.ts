import { EnglishNumber } from '../../constants/englishNumbers/EnglishNumbers';

export const TranslateToBengali = (number: string) => {
  const englishNumber = number.toString(); //convert the number into a string
  const bengaliNumber = englishNumber
    .split('') //split each numbers & make an array of numbers
    .map((digit) => EnglishNumber[digit] || digit)
    .join('');
  return bengaliNumber;
};
