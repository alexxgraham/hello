import { Link } from "@remix-run/react";
import { getTimeZones, TimeZone } from "@vvo/tzdb";
import { useEffect, useState } from "react";

import { FontStyleOptions, SettingPopup } from "~/types/convo/settings";
import { cn } from "~/utils";

import { colorMaps } from "../../utils/colorMap";
import { CloseButton, ModalTitle } from "../../utils/items";
import { ArchiveOptions } from "../options/_archive";
import { TextOptions } from "../options/_text";
import { TimezoneOptions } from "../options/_timezone";

export const SettingsPanel = ({
  color,
  setColor,
  size,
  setSize,
  style,
  setStyle,
  open,
  setOpen,
}: SettingPopup) => {
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
  const [timeframe, setTimeframe] = useState("enabled");
  const autoTimezone = `AUTO | ${[new Date().toTimeString().slice(9).split(" ")[1].replace("(", ""), new Date().toTimeString().slice(9).split(" ")[2], new Date().toTimeString().slice(9).split(" ")[3].replace(")", "")].join("_")} ~ ${new Date().toTimeString().slice(9).split(" ")[0].slice(0, 6)}:${new Date().toTimeString().slice(9).split(" ")[0].slice(6, 8)}`;
  const [timezone, setTimezone] = useState(autoTimezone);
  const [_timezone, _setTimezone] = useState<number>(0);
  const [_style, _setStyle] = useState<number>(0);

  const apiTimezones = getTimeZones({ includeUtc: true })
    .sort((a, b) => (a.abbreviation < b.abbreviation ? -1 : 0))
    .map(
      (tzone: TimeZone) =>
        `${tzone.abbreviation} | ${tzone.alternativeName.split(" ").join("_")} ~ GMT${tzone.currentTimeFormat.split(" ")[0]}`,
    );
  const outputTimezones = Array.from(new Set(apiTimezones));
  const availableTimezones: string[] = ["AUTO", ...outputTimezones];
  const fontChoices: FontStyleOptions[] = ["IBM_VGA", "NOTO_MONO"];
  const toggleHistoricalTimeframe = (): void => {
    setTimeframe((prev) => {
      const updatedValue = prev === "enabled" ? "disabled" : "enabled";
      localStorage.setItem("convo_time-frame", updatedValue.toUpperCase());
      return updatedValue;
    });
  };
  const handleTimezoneChange = (): void => {
    const newIndex: number = (_timezone + 1) % (availableTimezones.length + 1);
    _setTimezone(newIndex);
    setTimezone(availableTimezones[newIndex]);
    localStorage.setItem("convo_time-zone", availableTimezones[newIndex]);
    if (newIndex === availableTimezones.length) {
      _setTimezone(0);
      setTimezone(autoTimezone);
      localStorage.setItem("convo_time-zone", autoTimezone);
    }
  };
  const handleFontCycle = (): void => {
    const newIndex: number = (_style + 1) % (fontChoices.length + 1);
    _setStyle(newIndex);
    setStyle(fontChoices[newIndex]);
    localStorage.setItem("convo_text-style", fontChoices[newIndex]);
    if (newIndex === fontChoices.length) {
      _setStyle(0);
      setStyle(fontChoices[0]);
      localStorage.setItem("convo_text-style", fontChoices[0]);
    }
  };
  useEffect(() => {
    const localTimezone = localStorage.getItem("convo_time-zone");
    if (localTimezone) setTimezone(localTimezone);
  }, [setTimezone]);
  useEffect(() => {
    const localTimeframe = localStorage.getItem("convo_time-frame");
    if (localTimeframe) setTimeframe(localTimeframe);
  }, [setTimeframe]);
  let hideClass = "hidden";
  if (open) hideClass = "";
  const mainOpenClass =
    "bg-[#000000dd] grid place-items-center absolute h-full w-full top-0 left-0 overflow-hidden";
  const modalOpenClass = "grid absolute top-20 h-full w-fit overflow-hidden";
  const largeArticleClass = "flex flex-col max-w-lg gap-1";
  const underlinePointerClass =
    "hover:underline cursor-pointer hover:text-muted hover:not-italic";
  const italicColorClass = cn("italic", colorMaps({ color, mapKind: "text" }));
  return (
    <div className={cn(!open ? hideClass : mainOpenClass)}>
      <div className={cn(!open ? hideClass : modalOpenClass)}>
        <div className="flex flex-col gap-3 h-1/2 w-full bg-secondary text-muted rounded-lg p-4">
          <article className="grid grid-cols-3 gap-2">
            <div />
            <ModalTitle title="Quick Settings" pad />
            <div className="flex justify-end">
              <CloseButton setOpen={setOpen} />
            </div>
          </article>
          <TextOptions
            color={color}
            size={size}
            style={style}
            setColor={setColor}
            setSize={setSize}
            largeArticleClass={largeArticleClass}
            italicColorClass={italicColorClass}
            underlinePointerClass={underlinePointerClass}
            handleFontCycle={handleFontCycle}
          />
          <TimezoneOptions
            timezone={timezone}
            largeArticleClass={largeArticleClass}
            italicColorClass={italicColorClass}
            underlinePointerClass={underlinePointerClass}
            handleTimezoneChange={handleTimezoneChange}
          />
          <ArchiveOptions
            timeframe={timeframe}
            largeArticleClass={largeArticleClass}
            italicColorClass={italicColorClass}
            underlinePointerClass={underlinePointerClass}
            toggleHistoricalTimeframe={toggleHistoricalTimeframe}
          />
          <Link
            to="/convo/settings"
            className={cn("text-center", underlinePointerClass)}
          >
            Open All Settings
          </Link>
        </div>
      </div>
    </div>
  );
};
