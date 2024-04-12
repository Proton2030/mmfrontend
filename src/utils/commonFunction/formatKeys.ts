export const formatKeys = (key: string, language: 'ENGLISH' | 'BENGALI') => {
  const formttedString = key.replace(/_/g, ' ');
  const word = language === 'ENGLISH' ? capitalizeSentence(formttedString) : keyEnglishToBngali(key);
  return word;
};

const capitalize = (str: string) => (typeof str !== 'string' ? '' : str.charAt(0).toUpperCase() + str.slice(1));

const capitalizeSentence = (sentence: string) =>
  sentence
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');

const keyEnglishToBngali = (key: string) => {
  switch (key) {
    case 'full_name':
      return 'নাম';
    case 'gender':
      return 'লিঙ্গ';
    case 'age':
      return 'বয়স';
    case 'marital_status':
      return 'বৈবাহিক অবস্থা';
    case 'district':
      return 'জেলা';
    case 'height':
      return 'উচ্চতা';
    case 'weight':
      return 'ওজন';
    case 'body_color':
      return 'শরীরের রঙ';
    case 'occupation':
      return 'পেশা';
    case 'work_place':
      return 'কর্মস্থল';
    case 'monthly_income':
      return 'মাসিক আয়';
    case 'education':
      return 'শিক্ষা';
    case 'islamic_education':
      return 'ইসলামিক শিক্ষা';
    case 'salah':
      return 'সালাত';
    case 'sawum':
      return 'সাওম';
    case 'fathers_name':
      return 'পিতার নাম';
    case 'fathers_occupation':
      return 'পিতার পেশা';
    case 'mothers_name':
      return 'মায়ের নাম';
    case 'mothers_occupation':
      return 'মায়ের পেশা';
    case 'no_of_brothers':
      return 'ভাইদের সংখ্যা';
    case 'no_of_sisters':
      return 'বোনের সংখ্যা';
    case 'financial_condition':
      return 'আর্থিক অবস্থা';
  }
};
