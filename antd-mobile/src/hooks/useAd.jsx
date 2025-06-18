import { useContext } from "react";
import { AdContext } from "../context/AdContext";

// export function useAd() {
//   const context = useContext(AdContext);
//   if (!context) {
//     throw new Error('useAd must be used within an AdProvider');
//   }
//   return context;
// }

export function useAd() {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAd must be used within an AdProvider');
  }
  return context;
}