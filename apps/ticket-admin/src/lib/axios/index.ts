import { clientAxios } from "./clientAxios";
import { serverAxios } from "./serverAxios";

const isServer = typeof window === "undefined";

export const instance = isServer ? serverAxios : clientAxios;
