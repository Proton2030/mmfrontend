import { IField } from "../types/FieldTypes.types";

export interface ICenterFormProps{
    fieldList:IField[],
    object:any,
    handleChangeText: (field: string, type:string, text: string) => void
}