export class Window {
  constructor (private theWindow: typeof window) { }

  public get currentColorScheme(): 'dark' | 'light' {
    return this.isDarkMode ? 'dark' : 'light';
  }

  public get isDarkMode(): boolean {
    return this.theWindow.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  public registerPreferredColorSchemeChangeListener(
    onColorSchemeChange: (colorScheme: 'dark' | 'light') => void,
  ) {
    this.theWindow
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener((e) => {
        onColorSchemeChange(e.matches ? 'dark' : 'light');
      });
  }
}
