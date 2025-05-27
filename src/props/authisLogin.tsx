// src/recoil/sidebarAtom.ts
import { atom } from "recoil";

export const authisLogin = atom({
  key: "authisLogin",
  default: "login", // true면 열린 상태
});
