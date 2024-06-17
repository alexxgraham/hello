import { generateFontClass } from "~/helpers/+convo";
import { ColorName } from "~/types/convo/color";
import { DispatchAction } from "~/types/convo/main";
import { FontSizeOptions, FontStyleOptions } from "~/types/convo/settings";
import { cn } from "~/utils";

import { ConversationHeader } from "../header/_convo-head";

import { colorMaps } from "./colorMap";
import { BorderBubbles } from "./items";

export const ConvoError = ({
  error,
  size,
  style,
  header,
  body,
}: {
  error: {
    message: string;
    interMsg: string;
    subMsg?: string;
  };
  size: FontSizeOptions;
  style: FontStyleOptions;
  header: {
    color: ColorName;
    setColor: DispatchAction<ColorName>;
    scale: FontSizeOptions;
    setScale: DispatchAction<FontSizeOptions>;
    font: FontStyleOptions;
    setFont: DispatchAction<FontStyleOptions>;
  };
  body: {
    reference: React.RefObject<HTMLDivElement>;
    textColor: string;
  };
}) => {
  return (
    <main
      className={cn(
        generateFontClass({ size, style }),
        "bg-primary text-primary-foreground h-full overflow-hidden flex flex-col",
      )}
    >
      <ConversationHeader
        color={header.color}
        setColor={header.setColor}
        size={header.scale}
        setSize={header.setScale}
        style={header.font}
        setStyle={header.setFont}
      />
      <div
        ref={body.reference}
        className={cn(
          body.textColor,
          "h-full w-full flex flex-col px-4 mt-8 mb-16",
        )}
      >
        <BorderBubbles color="LIGHT_RED" />
        <article className="grow flex flex-col justify-center items-center">
          <p className={colorMaps({ color: "LIGHT_RED", mapKind: "text" })}>
            Error: {error.message}
          </p>
          <small className="text-accent">{error.interMsg}</small>
          {error.subMsg ? (
            <small className="text-accent italic">{error.subMsg}</small>
          ) : null}
        </article>
        <BorderBubbles color="LIGHT_RED" />
      </div>
    </main>
  );
};
