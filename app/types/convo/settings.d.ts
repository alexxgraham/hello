import { ColorName } from "./color";
import { DispatchAction, Popup } from "./main";

interface ArticlePointers {
  largeArticleClass: string;
  italicColorClass: string;
  underlinePointerClass: string;
}

export interface SettingPopup extends Popup {
  color: ColorName;
  setColor: DispatchAction<ColorName>;
  size: FontSizeOptions;
  setSize: DispatchAction<FontSizeOptions>;
  style: FontStyleOptions;
  setStyle: DispatchAction<FontStyleOptions>;
}

export type FontSizeOptions =
  | "EXTRA_SMALL"
  | "SMALL"
  | "MEDIUM"
  | "LARGE"
  | "EXTRA_LARGE";
export type FontSizeState = [FontSizeOptions, DispatchAction<FontSizeOptions>];

export type FontStyleOptions = "IBM_VGA" | "NOTO_MONO";
export type FontStyleState = [
  FontStyleOptions,
  DispatchAction<FontStyleOptions>,
];

export interface SettingsTextOptions extends ArticlePointers {
  color: ColorName;
  size: FontSizeOptions;
  style: FontStyleOptions;
  setColor: DispatchAction<ColorName>;
  setSize: DispatchAction<FontSizeOptions>;
  italicColorClass: string;
  handleFontCycle: () => void;
}

export interface SettingsArchiveOptions extends ArticlePointers {
  timeframe: string;
  toggleHistoricalTimeframe: () => void;
}

export interface SettingsTimezoneOptions extends ArticlePointers {
  timezone: string;
  handleTimezoneChange: () => void;
}
