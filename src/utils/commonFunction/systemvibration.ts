import { Vibration } from "react-native";

export const handelVibrate=()=>{
    Vibration.vibrate([200, 100, 200]);
}