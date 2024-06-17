import { DispatchAction } from "./main";

export interface ColorMap {
  color: ColorName;
  mapKind: "text" | "gradient";
}

export type ColorMapState = [ColorName, DispatchAction<ColorName>];

export type ColorName =
  | "BLUE"
  | "GREEN"
  | "CYAN"
  | "RED"
  | "MAGENTA"
  | "LIGHT_GRAY"
  //
  | "DARK_GRAY"
  | "LIGHT_BLUE"
  | "LIGHT_GREEN"
  | "LIGHT_CYAN"
  | "LIGHT_RED"
  | "LIGHT_MAGENTA"
  | "YELLOW"
  | "DEFAULT";
