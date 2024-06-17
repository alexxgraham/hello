import { ColorMap } from "~/types/convo/color";
import { Colors } from "~/types/convo/enum";

export const colorMaps = ({ color, mapKind }: ColorMap): string => {
  let classPrefix = "";
  let classSuffix = "";
  switch (mapKind) {
    case "text":
      classPrefix = "text-";
      break;
    case "gradient":
      classPrefix = "from-";
      classSuffix = "50";
      break;
  }
  return `${classPrefix}[${Colors[color]}${classSuffix}]`;
};
