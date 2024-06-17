import { SettingsTimezoneOptions } from "~/types/convo/settings";
import { cn } from "~/utils";

export const TimezoneOptions = ({
  timezone,
  largeArticleClass,
  italicColorClass,
  underlinePointerClass,
  handleTimezoneChange,
}: SettingsTimezoneOptions) => {
  return (
    <article className={largeArticleClass}>
      <p className="text-accent">Timezone:</p>
      <section className="flex flex-col gap-1 px-4">
        <button onClick={handleTimezoneChange} className="w-fit">
          [
          <span className={cn(italicColorClass, underlinePointerClass)}>
            {timezone.split(" |")[0]}
          </span>
          ]
        </button>
        <p>{timezone.split("| ")[1]?.split(/ ~/)[0]}</p>
        <p>{timezone.split(/~ /)[1]}</p>
      </section>
    </article>
  );
};
