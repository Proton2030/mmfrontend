export interface IField{
    id:string,
    type: "TEXT" | "NUMBER" | "PASSWORD" | "SELECT" | "RADIO",
    label:string,
    placeHolder:string,
    options?:string[]
}