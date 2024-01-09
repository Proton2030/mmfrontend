export const formatKeys = (key:string)=>{
    const formttedString = key.replace(/_/g," ");
    return capitalizeSentence(formttedString);
}

const capitalize = (str: string) => typeof str !== 'string' ? '' : str.charAt(0).toUpperCase() + str.slice(1);

const capitalizeSentence = (sentence: string) => sentence.split(' ').map(word => capitalize(word)).join(' ');