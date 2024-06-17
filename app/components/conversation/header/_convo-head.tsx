import { Terminal } from "@ag108/command-terminal";

import { ColorName } from "~/types/convo/color";
import { DispatchAction } from "~/types/convo/main";
import { FontSizeOptions, FontStyleOptions } from "~/types/convo/settings";

import { Conversations, Settings } from "./_convo-buttons";

export const ConversationHeader = ({
  color,
  setColor,
  size,
  setSize,
  style,
  setStyle,
  midsection,
}: {
  color: ColorName;
  setColor: DispatchAction<ColorName>;
  size: FontSizeOptions;
  setSize: DispatchAction<FontSizeOptions>;
  style: FontStyleOptions;
  setStyle: DispatchAction<FontStyleOptions>;
  midsection?: boolean;
}) => {
  const headerClass = "h-20 flex justify-between px-4 items-center shrink-0";
  return (
    <header className={headerClass}>
      <Conversations />
      {midsection ? <Terminal /> : null}
      <Settings
        color={color}
        size={size}
        style={style}
        setColor={setColor}
        setSize={setSize}
        setStyle={setStyle}
      />
    </header>
  );
};
// f59e0b
// 39ff14
// 22d3ee
//gray color
// 969696
