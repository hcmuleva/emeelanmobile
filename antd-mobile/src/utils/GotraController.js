import { useEffect, useState } from "react";
import { seervigotra } from "./seervigotra";
import { teligotra } from "./teligotra";
import { getSamaj } from "../services/api";

const samajMap = {
  TELI0001: teligotra,
  SEERVI0002: seervigotra,
};

export default function GotraController(samaj) {
  return samajMap[samaj] || [];
}