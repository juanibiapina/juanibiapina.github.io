import minLight from "@shikijs/themes/min-light";
import nightOwl from "@shikijs/themes/night-owl";
import type { ThemeRegistration } from "shiki";

type Palette = Record<
  | "Black" | "Red" | "Green" | "Yellow" | "Blue" | "Magenta" | "Cyan" | "White"
  | "BrightBlack" | "BrightRed" | "BrightGreen" | "BrightYellow"
  | "BrightBlue" | "BrightMagenta" | "BrightCyan" | "BrightWhite",
  string
>;

const lightPalette: Palette = {
  Black: "#24292f",
  Red: "#cf222e",
  Green: "#116329",
  Yellow: "#4d2d00",
  Blue: "#0969da",
  Magenta: "#8250df",
  Cyan: "#1b7c83",
  White: "#6e7781",
  BrightBlack: "#57606a",
  BrightRed: "#a40e26",
  BrightGreen: "#1a7f37",
  BrightYellow: "#633c01",
  BrightBlue: "#0550ae",
  BrightMagenta: "#6639ba",
  BrightCyan: "#136061",
  BrightWhite: "#8c959f",
};

const darkPalette: Palette = {
  Black: "#484f58",
  Red: "#ff7b72",
  Green: "#7ee787",
  Yellow: "#e3b341",
  Blue: "#79c0ff",
  Magenta: "#d2a8ff",
  Cyan: "#56d4dd",
  White: "#b1bac4",
  BrightBlack: "#8b949e",
  BrightRed: "#ffa198",
  BrightGreen: "#56d364",
  BrightYellow: "#f8e3a1",
  BrightBlue: "#a5d6ff",
  BrightMagenta: "#d2a8ff",
  BrightCyan: "#b3f0ff",
  BrightWhite: "#ffffff",
};

const withTerminalPalette = (
  theme: ThemeRegistration,
  palette: Palette
): ThemeRegistration => ({
  ...theme,
  colors: {
    ...theme.colors,
    ...Object.fromEntries(
      Object.entries(palette).map(([name, color]) => [`terminal.ansi${name}`, color])
    ),
  },
});

export const lightTheme = withTerminalPalette(minLight as ThemeRegistration, lightPalette);
export const darkTheme = withTerminalPalette(nightOwl as ThemeRegistration, darkPalette);
