import { useEffect, useState } from "react";

import { ColorName } from "~/types/convo/color";
import { DispatchAction } from "~/types/convo/main";
import { FontSizeOptions, FontStyleOptions } from "~/types/convo/settings";

import { ListIcon } from "./icons/list";
import { GearIcon } from "./icons/settings";
import { ConversationPanel } from "./modals/conversations";
import { SettingsPanel } from "./modals/settings";

const panelClassName =
  "outline-none hover:cursor-pointer shrink-0 bg-secondary w-12 h-12 rounded-xl grid place-content-center";

export const Conversations = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "m" && e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);
  return (
    <>
      {open ? <ConversationPanel open setOpen={setOpen} /> : null}
      <button onClick={() => setOpen(true)} className={panelClassName}>
        <ListIcon />
      </button>
    </>
  );
};

export const Settings = ({
  color,
  setColor,
  size,
  setSize,
  style,
  setStyle,
}: {
  color: ColorName;
  setColor: DispatchAction<ColorName>;
  size: FontSizeOptions;
  setSize: DispatchAction<FontSizeOptions>;
  style: FontStyleOptions;
  setStyle: DispatchAction<FontStyleOptions>;
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && e.ctrlKey) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);
  return (
    <>
      {open ? (
        <SettingsPanel
          color={color}
          setColor={setColor}
          size={size}
          setSize={setSize}
          style={style}
          setStyle={setStyle}
          open
          setOpen={setOpen}
        />
      ) : null}
      <button onClick={() => setOpen(true)} className={panelClassName}>
        <GearIcon />
      </button>
    </>
  );
};
