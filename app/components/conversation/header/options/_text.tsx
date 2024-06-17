import { ColorName } from "~/types/convo/color";
import { FontSizeOptions, SettingsTextOptions } from "~/types/convo/settings";
import { cn } from "~/utils";

const sizeOptions: { abbreviation: string; function: FontSizeOptions }[] = [
  { abbreviation: "XS", function: "EXTRA_SMALL" },
  { abbreviation: "SM", function: "SMALL" },
  { abbreviation: "MD", function: "MEDIUM" },
  { abbreviation: "LG", function: "LARGE" },
  { abbreviation: "XL", function: "EXTRA_LARGE" },
];

const colorOptions = ["DEFAULT", "RED", "BLUE", "GREEN", "MAGENTA", "CYAN"];

export const TextOptions = ({
  largeArticleClass,
  italicColorClass,
  underlinePointerClass,
  color,
  size,
  style,
  setColor,
  setSize,
  handleFontCycle,
}: SettingsTextOptions) => {
  const handleColorTheme = (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedColor: ColorName,
  ): void => {
    e.preventDefault();
    setColor(selectedColor);
    localStorage.setItem("convo_text-color", selectedColor);
  };
  const handleColorSize = (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedSize: FontSizeOptions,
  ): void => {
    e.preventDefault();
    setSize(selectedSize);
    localStorage.setItem("convo_text-size", selectedSize);
  };
  return (
    <article className={largeArticleClass}>
      <p className="text-accent">Text:</p>
      <section className="flex flex-wrap gap-x-1.5 px-4">
        <p className="text-accent">Font:</p>
        <span>
          [
          <button
            onClick={handleFontCycle}
            className={cn(italicColorClass, underlinePointerClass)}
          >
            {style}
          </button>
          ]
        </span>
      </section>
      <section className="flex flex-wrap gap-x-1.5 px-4">
        <p className="text-accent">Size:</p>
        {sizeOptions.map((option) => (
          <button
            key={option.abbreviation}
            onClick={(e) => handleColorSize(e, option.function)}
          >
            [
            <span
              className={
                size !== option.function
                  ? underlinePointerClass
                  : italicColorClass
              }
            >
              {option.abbreviation}
            </span>
            ]
          </button>
        ))}
      </section>
      <section className="flex flex-wrap gap-x-1.5 px-4">
        <p className="text-accent">Color:</p>
        {colorOptions.map((option, i) => (
          <button
            key={i}
            onClick={(e) => handleColorTheme(e, option as ColorName)}
          >
            [
            <span
              className={
                option === color ? italicColorClass : underlinePointerClass
              }
            >
              {option}
            </span>
            ]
          </button>
        ))}
      </section>
    </article>
  );
};
