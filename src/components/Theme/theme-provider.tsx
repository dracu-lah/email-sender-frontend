```jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  PropsWithChildren,
} from "react";

/**
 * Represents the available theme options.
 */
type Theme = "dark" | "light" | "system";

/**
 * Props for the ThemeProvider component.
 */
type ThemeProviderProps = PropsWithChildren<{
  /**
   * The default theme to use if no theme is stored in local storage.
   * @default "system"
   */
  defaultTheme?: Theme;
  /**
   * The key used to store the theme in local storage.
   * @default "vite-ui-theme"
   */
  storageKey?: string;
}>;

/**
 * The state provided by the ThemeProvider.
 */
type ThemeProviderState = {
  /**
   * The current theme.
   */
  theme: Theme;
  /**
   * A function to set the current theme.
   * @param theme The theme to set.
   */
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Provides a theme context to its children.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * A hook that provides access to the theme context.
 *
 * @returns The theme context.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
```;
