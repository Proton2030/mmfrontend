import { IField } from "../types/FieldTypes.types";

export interface ICenterFormProps{
    fieldList:IField[],
    handleChangeText: (field: string, type:string, text: string) => void
}