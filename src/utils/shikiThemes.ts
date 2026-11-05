import githubLight from "@shikijs/themes/github-light-default";
import type { ThemeRegistration, ThemeRegistrationRaw } from "shiki";
import tokyonightMoon from "./themes/tokyonight-moon.json";

const moonTerminal = {
  Black: "#1b1d2b",
  Red: "#ff757f",
  Green: "#c3e88d",
  Yellow: "#ffc777",
  Blue: "#82aaff",
  Magenta: "#c099ff",
  Cyan: "#86e1fc",
  White: "#828bb8",
  BrightBlack: "#444a73",
  BrightRed: "#ff8d94",
  BrightGreen: "#c7fb6d",
  BrightYellow: "#ffd8ab",
  BrightBlue: "#9ab8ff",
  BrightMagenta: "#caabff",
  BrightCyan: "#b2ebff",
  BrightWhite: "#c8d3f5",
};

export const lightTheme: ThemeRegistration = {
  ...(githubLight as ThemeRegistration),
  bg: "#f6f8fa",
};

export const darkTheme: ThemeRegistrationRaw = {
  ...(tokyonightMoon as ThemeRegistrationRaw),
  fg: "#c8d3f5",
  bg: "#1e2030",
  colors: Object.fromEntries(
    Object.entries(moonTerminal).map(([name, color]) => [`terminal.ansi${name}`, color])
  ),
};
