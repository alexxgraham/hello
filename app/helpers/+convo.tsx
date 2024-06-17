import { FontSizeOptions, FontStyleOptions } from "~/types/convo/settings";

export const generateFontClass = ({
  size,
  style,
}: {
  size: FontSizeOptions;
  style: FontStyleOptions;
}) => {
  if (size === "EXTRA_SMALL") {
    switch (style) {
      case "IBM_VGA":
        return "text-xs ibm-text";
      case "NOTO_MONO":
        return "text-xs noto-mono-text";
    }
  }
  if (size === "SMALL") {
    switch (style) {
      case "IBM_VGA":
        return "text-sm ibm-text";
      case "NOTO_MONO":
        return "text-sm noto-mono-text";
    }
  }
  if (size === "MEDIUM") {
    switch (style) {
      case "IBM_VGA":
        return "text-md ibm-text";
      case "NOTO_MONO":
        return "text-md noto-mono-text";
    }
  }
  if (size === "LARGE") {
    switch (style) {
      case "IBM_VGA":
        return "text-lg ibm-text";
      case "NOTO_MONO":
        return "text-lg noto-mono-text";
    }
  }
  if (size === "EXTRA_LARGE") {
    switch (style) {
      case "IBM_VGA":
        return "text-xl ibm-text";
      case "NOTO_MONO":
        return "text-xl noto-mono-text";
    }
  }
};
