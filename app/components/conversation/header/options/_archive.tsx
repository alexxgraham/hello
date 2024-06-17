import { useEffect, useState } from "react";

import { SettingsArchiveOptions } from "~/types/convo/settings";
import { cn } from "~/utils";

const timespanOptions = [
  "forever",
  "24_hours",
  "3_days",
  "1_week",
  "1_month",
  "3_months",
  "6_months",
  "1_year",
  "",
];

export const ArchiveOptions = ({
  timeframe,
  largeArticleClass,
  italicColorClass,
  underlinePointerClass,
  toggleHistoricalTimeframe,
}: SettingsArchiveOptions) => {
  const [timespan, setTimespan] = useState(timespanOptions[0]);
  const [_timespan, _setTimespan] = useState<number>(0);
  const timespanAdjustment = (): void => {
    const newIndex: number = (_timespan + 1) % (timespanOptions.length + 1);
    _setTimespan(newIndex);
    setTimespan(timespanOptions[newIndex]);
    localStorage.setItem(
      "convo_time-span",
      timespanOptions[newIndex].toUpperCase(),
    );
    if (newIndex === timespanOptions.length - 1) {
      _setTimespan(0);
      setTimespan(timespanOptions[0]);
      localStorage.setItem("convo_time-span", timespanOptions[0].toUpperCase());
    }
  };

  useEffect(() => {
    const localTimespan = localStorage.getItem("convo_time-span");
    if (localTimespan && localTimespan !== ("FOREVER" || ""))
      setTimespan(localTimespan);
  }, []);

  return (
    <article className={largeArticleClass}>
      <p className="text-accent">Archive:</p>
      <section className="px-4 flex flex-col gap-1">
        <span>
          [
          <button
            onClick={toggleHistoricalTimeframe}
            className={cn(
              italicColorClass,
              underlinePointerClass,
              timeframe === "disabled",
              "hover:text-muted",
            )}
          >
            {timeframe.toUpperCase()}
          </button>
          ]
        </span>
        <span className="flex gap-x-1.5">
          <p className="text-accent">Duration:</p>
          <div className="flex">
            ([
            <button
              onClick={timespanAdjustment}
              className={cn(italicColorClass, underlinePointerClass)}
            >
              {timespan.toUpperCase()}
            </button>
            ])
          </div>
        </span>
      </section>
    </article>
  );
};
