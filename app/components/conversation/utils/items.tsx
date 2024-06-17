/* eslint-disable jsx-a11y/no-autofocus */
import { Dispatch, SetStateAction } from "react";

import { ColorName } from "~/types/convo/color";
import { TextInputField } from "~/types/convo/main";
import { cn } from "~/utils";

import { colorMaps } from "./colorMap";
export const CloseButton = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setOpen(false)}
      className="outline-none hover:text-destructive"
    >
      X
    </button>
  );
};

export const TextInput = ({
  placeholder,
  autoFocus = false,
  specialClass,
}: TextInputField) => {
  return (
    <input
      autoFocus={autoFocus}
      className={cn(
        specialClass,
        "outline-none cursor-text bg-transparent w-full placeholder:italic placeholder:text-[#AAAAAA] caret-[#AAAAAA] text-white text-base",
      )}
      type="text"
      placeholder={placeholder}
    />
  );
};

export const ModalTitle = ({
  title,
  pad,
}: {
  title: string;
  pad?: boolean;
}) => {
  const titleClass = cn(
    pad ? "px-10 underline underline-offset-8" : "underline underline-offset-8",
  );
  return <p className={titleClass}>{title}</p>;
};

export const BorderBubbles = ({ color }: { color: string }) => {
  const colorGradientToRightClass = cn(
    "rounded-md hover:bg-gradient-to-r to-secondary",
    colorMaps({ color: color as ColorName, mapKind: "gradient" }),
  );
  const colorGradientToLeftClass = cn(
    "rounded-md hover:bg-gradient-to-l to-secondary",
    colorMaps({ color: color as ColorName, mapKind: "gradient" }),
  );
  return (
    <div className="grid grid-cols-2 gap-4 h-10 w-full shrink-0">
      <span className={colorGradientToRightClass}></span>
      <span className={colorGradientToLeftClass}></span>
    </div>
  );
};
