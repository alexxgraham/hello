import { Outlet } from "@remix-run/react";
import { createContext, useContext, useEffect, useState } from "react";

import { ConversationHeader } from "~/components/conversation/header/_convo-head";
import { colorMaps } from "~/components/conversation/utils/colorMap";
import { generateFontClass } from "~/helpers/+convo";
import { ColorMapState, ColorName } from "~/types/convo/color";
import { DispatchAction } from "~/types/convo/main";
import {
  FontSizeOptions,
  FontSizeState,
  FontStyleOptions,
  FontStyleState,
} from "~/types/convo/settings";
import { cn } from "~/utils";

export interface KeyContextType {
  useColorChoice: ColorName;
  setColorChoice: DispatchAction<ColorName>;
  useFontSize: FontSizeOptions;
  setFontSize: DispatchAction<FontSizeOptions>;
  useFontStyle: FontStyleOptions;
  setFontStyle: DispatchAction<FontStyleOptions>;
  fontColorChoice: string;
}

const KeyContext = createContext<KeyContextType | undefined>(undefined);

export default function Convo() {
  const [useColorChoice, setColorChoice]: ColorMapState = useState(
    "DEFAULT" as ColorName,
  );
  const [useFontSize, setFontSize]: FontSizeState = useState(
    "EXTRA_LARGE" as FontSizeOptions,
  );
  const [useFontStyle, setFontStyle]: FontStyleState = useState(
    "IBM_VGA" as FontStyleOptions,
  );
  useEffect(() => {
    const localColorChoice = localStorage.getItem("convo_text-color");
    if (localColorChoice) setColorChoice(localColorChoice as ColorName);
  }, [setColorChoice]);
  useEffect(() => {
    const localSizeChoice = localStorage.getItem("convo_text-size");
    if (localSizeChoice) setFontSize(localSizeChoice as FontSizeOptions);
  }, [setFontSize]);
  useEffect(() => {
    const localFontChoice = localStorage.getItem("convo_text-style");
    if (localFontChoice) setFontStyle(localFontChoice as FontStyleOptions);
  }, [setFontStyle]);

  const fontColorChoice = colorMaps({
    color: useColorChoice,
    mapKind: "text",
  });

  const contextValue: KeyContextType = {
    useColorChoice,
    setColorChoice,
    useFontSize,
    setFontSize,
    useFontStyle,
    setFontStyle,
    fontColorChoice,
  };
  return (
    <KeyContext.Provider value={contextValue}>
      <main
        className={cn(
          generateFontClass({ size: useFontSize, style: useFontStyle }),
          "bg-primary text-primary-foreground h-full overflow-hidden flex flex-col",
        )}
      >
        <ConversationHeader
          color={useColorChoice}
          setColor={setColorChoice}
          size={useFontSize}
          setSize={setFontSize}
          style={useFontStyle}
          setStyle={setFontStyle}
          midsection
        />
        <Outlet />
      </main>
    </KeyContext.Provider>
  );
}

export const useKeyContext = () => {
  const context = useContext(KeyContext);
  if (!context) {
    throw new Error("useKeyContext must be used within a KeyProvider");
  }
  return context;
};
