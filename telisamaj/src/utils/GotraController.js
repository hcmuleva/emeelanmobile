import { seervigotra } from "./seervigotra";
import { teligotra } from "./teligotra";

export default function GotraController() {
    const samajType = process.env.REACT_APP_SAMAJ

    console.log(samajType, "SAMAJ TYPE")

    switch (samajType){
        case "TELI":
            return teligotra
        case "SEERVI":
            return seervigotra
        default:
            return teligotra
    }

}
