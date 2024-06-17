import { User } from "@prisma/client";
import { format, isBefore } from "date-fns";

import { ColorName } from "~/types/convo/color";
import { Message } from "~/types/convo/main";
import { cn } from "~/utils";

import { colorMaps } from "../utils/colorMap";

export const MessageBubble = ({
  self,
  nonself,
  message,
  scheme,
}: {
  self: User["username"];
  nonself: User["username"];
  message: Message;
  scheme: { primary: ColorName; secondary: ColorName };
}) => {
  const heightSet = 18;
  let paddingClass = "pl-3";
  let sideClass = "flex-row";
  let textSideClass = "text-start";
  let textColorClass = colorMaps({
    color: scheme.secondary,
    mapKind: "text",
  });
  const hoverMessageClass = "w-full px-3 py-2";
  const dateOffset = new Date();
  dateOffset.setDate(dateOffset.getDate() - 1);
  const relativeTime = isBefore(message.timestamp, dateOffset)
    ? format(message.timestamp, "HH:mm")
    : format(message.timestamp, "HH:mm:ss");
  if (message.outgoing) {
    paddingClass = "pr-3";
    sideClass = "flex-row-reverse";
    textSideClass = "text-end";
    textColorClass = colorMaps({
      color: scheme.primary,
      mapKind: "text",
    });
  }
  return (
    <article
      className={cn(sideClass, `h-${heightSet}`, "group flex gap-4 w-full")}
    >
      <section
        className={cn(
          textSideClass,
          "group-hover:bg-secondary hover:bg-secondary rounded-md shrink-0 w-1/2",
        )}
      >
        <small
          className={cn(
            colorMaps({ color: "LIGHT_GRAY", mapKind: "text" }),
            paddingClass,
          )}
        >
          {message.author === "self" ? self : nonself} {"\u2212"} {relativeTime}
        </small>
        <p className={cn(textColorClass, hoverMessageClass)}>
          {message.content}
        </p>
      </section>
      <MessageBreak height={heightSet} scheme={scheme} />
    </article>
  );
};

export const MessageBreak = ({
  height,
  scheme,
}: {
  height: number;
  scheme: { primary: ColorName; secondary: ColorName };
}) => {
  const heightClass = `h-${height}`;
  const threadClass = cn(
    "hover:underline cursor-pointer hover:not-italic italic",
    colorMaps({
      color: scheme.primary,
      mapKind: "text",
    }),
    `hover:${colorMaps({
      color: scheme.secondary,
      mapKind: "text",
    })}`,
  );
  return (
    <section
      className={cn(
        heightClass,
        "hidden group-hover:grid place-items-center rounded-md bg-secondary w-1/2",
      )}
    >
      <div className="block">
        <span className="text-muted">[</span>
        <button className={threadClass}>Open Thread</button>
        <span className="text-muted">]</span>
      </div>
    </section>
  );
};
