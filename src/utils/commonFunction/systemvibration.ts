import { Vibration } from "react-native";

export const handelVibrate=()=>{
    Vibration.vibrate([100, 50, 100]);
}