// src/recoil/sidebarAtom.ts
import { atom } from "recoil";

export const sidebarOpenState = atom({
  key: "sidebarOpenState",
  default: false, // true면 열린 상태
});
