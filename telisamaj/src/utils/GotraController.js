import { useEffect, useState } from "react";
import { seervigotra } from "./seervigotra";
import { teligotra } from "./teligotra";
import { getSamaj } from "../services/api";

const samajMap = {
  TELI0001: teligotra,
  SEERVI0002: seervigotra,
};

export default function GotraController(samaj) {
    // console.log(samaj)

    // const [samajGotra, setSamajGotra] = useState([])
    //    func fetchSamaj = async()=>{
    //         const res = await getSamaj()
    //         console.log(res)
    //         // setSamajGotra(res)
    //     }

    // useEffect(()=>{
 
    //     fetchSamaj()
    // },[])

    // console.log(samajGotra)

  return samajMap[samaj] || [];
}