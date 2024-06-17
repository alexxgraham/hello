import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { isBefore } from "date-fns";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { MessageBubble } from "~/components/conversation/body/messages";
import { ConversationTextArea } from "~/components/conversation/footer/textArea";
import { colorMaps } from "~/components/conversation/utils/colorMap";
import { ConvoError } from "~/components/conversation/utils/errors";
import { BorderBubbles } from "~/components/conversation/utils/items";
import { availableMessages } from "~/components/conversation/utils/mockmsg";
import { getUserById } from "~/models/user.server";
import { getUserId } from "~/session.server";
import { ColorName } from "~/types/convo/color";
import { cn } from "~/utils";

import { useKeyContext } from "./_convo";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const keyParam =
    params.key?.search(/[^A-Za-z0-9]/) && params.key.includes("0")
      ? params.key
      : params.key?.includes("-")
        ? params.key
        : params.key?.includes("(") && params.key?.includes(")")
          ? params.key
          : null;
  const keyParamIndex = keyParam?.match(/\d+/)?.[0];
  const keyParamName = `${keyParam?.match(/\w+/)?.[0].charAt(0).toUpperCase()}${keyParam?.match(/\w+/)?.[0].slice(1)}`;
  const key = {
    index: keyParamIndex,
    name: keyParamName,
    parameter: keyParam,
  };
  return { key, user: await getUserById((await getUserId(request)) || "") };
}

export default function ConvoKey() {
  const { key, user } = useLoaderData<typeof loader>();
  const {
    useColorChoice,
    setColorChoice,
    useFontSize,
    setFontSize,
    useFontStyle,
    setFontStyle,
    fontColorChoice,
  } = useKeyContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const scrollToBottom = () => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIsomorphicLayoutEffect(() => {
    scrollToBottom();
  }, []);

  const messagePrimary = useColorChoice;
  let messageSecondary: ColorName = `LIGHT_${useColorChoice}` as ColorName;
  if (messagePrimary === "DEFAULT") {
    messageSecondary = "YELLOW" as ColorName;
  }

  useEffect(() => {
    setLoading(false);
  }, []);
  if (!key.parameter) {
    return (
      <ConvoError
        error={{
          message: "No Messages To Display",
          interMsg: "Are you sure you have the correct URL address?",
          subMsg: "Please try another conversation participant.",
        }}
        size={useFontSize}
        style={useFontStyle}
        header={{
          color: useColorChoice,
          setColor: setColorChoice,
          scale: useFontSize,
          setScale: setFontSize,
          font: useFontStyle,
          setFont: setFontStyle,
        }}
        body={{
          reference: messagesEndRef,
          textColor: fontColorChoice,
        }}
      />
    );
  } else {
    return (
      <>
        <div
          ref={messagesEndRef}
          className={cn(
            fontColorChoice,
            "h-full flex flex-col px-4 mt-8 mb-16 overflow-y-scroll gap-7",
          )}
        >
          {loading ? (
            <div
              className={`flex justify-center absolute h-full w-full top-0 left-0 bg-ring pointer-events-none transition ease-in delay-150 duration-1000 ${loading ? "opacity-100" : `opacity-0`}`}
            >
              <small
                className={cn(
                  "italic mt-20",
                  colorMaps({ color: "DARK_GRAY", mapKind: "text" }),
                )}
              >
                Loading...
              </small>
            </div>
          ) : null}
          <BorderBubbles color={useColorChoice} />
          {availableMessages.messageTokens
            .sort((a, b) => (isBefore(a.timestamp, b.timestamp) ? -1 : 0))
            .map((msg) => (
              <MessageBubble
                key={msg.id}
                self={user?.displayName || user?.username || "Loading..."}
                nonself={
                  `${key.name.charAt(0).toUpperCase()}${key.name.slice(1)}` ||
                  "Loading..."
                }
                message={msg}
                scheme={{
                  primary: messagePrimary,
                  secondary: messageSecondary,
                }}
              />
            ))}
          <BorderBubbles
            color={
              useColorChoice === "DEFAULT"
                ? "YELLOW"
                : `LIGHT_${useColorChoice}`
            }
          />
        </div>
        <ConversationTextArea />
      </>
    );
  }
}
