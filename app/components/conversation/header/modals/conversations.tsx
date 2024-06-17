import { Link } from "@remix-run/react";
import { formatRelative } from "date-fns";
import { useEffect } from "react";

import { ColorName } from "~/types/convo/color";
import { Popup } from "~/types/convo/main";
import { cn } from "~/utils";

import { colorMaps } from "../../utils/colorMap";
import { CloseButton, ModalTitle } from "../../utils/items";
import { availableConversations } from "../../utils/mockmsg";

export const ConversationPanel = ({ open, setOpen }: Popup) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);
  let hideClass = "hidden";
  if (open) {
    hideClass = "";
  }
  const localTextColor = localStorage.getItem("convo_text-color") as ColorName;
  const linkClass = cn(
    "hover:underline cursor-pointer hover:not-italic italic",
    `hover:${colorMaps({
      color:
        (localTextColor === "DEFAULT"
          ? "YELLOW"
          : (`LIGHT_${localTextColor}` as ColorName)) || "LIGHT_GRAY",
      mapKind: "text",
    })}`,
    colorMaps({
      color: localTextColor || "DEFAULT",
      mapKind: "text",
    }),
  );
  return (
    <div
      className={cn(
        !open
          ? hideClass
          : "bg-[#000000a0] absolute flex h-full w-full top-0 left-0",
      )}
    >
      <div className="h-full w-full md:w-2/5 bg-secondary text-muted p-4 pb-16">
        <article className="flex justify-between scale-95">
          <ModalTitle title="Conversations" />
          <CloseButton setOpen={setOpen} />
        </article>
        <article className="h-full w-[107.5%] flex flex-col gap-1.5 px-4 my-4 overflow-scroll scale-95 relative right-4">
          {availableConversations.map((conversation, i) => (
            <section
              key={i}
              className="flex flex-col gap-1 bg-primary rounded-md px-3 py-2"
            >
              <span className="flex gap-x-1.5 flex-wrap">
                [
                <Link
                  to={`/convo/${conversation.nickname ? conversation.nickname?.toLowerCase() : conversation.name.toLowerCase()}-0`}
                  className={linkClass}
                >
                  {conversation.nickname || conversation.name}
                </Link>
                ]
                <small>
                  {formatRelative(
                    conversation.timestamp,
                    new Date(),
                  ).toUpperCase()}
                </small>
              </span>
              <small className="italic">{conversation.preview}</small>
            </section>
          ))}
          <section className="bg-primary rounded-md px-3 py-2 flex justify-center">
            [
            <Link to="/convo/archive" className={cn(linkClass)}>
              Archive
            </Link>
            ]
          </section>
        </article>
      </div>
    </div>
  );
};
