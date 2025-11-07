let errorSpy: jest.SpyInstance;

export function suppressConsoleErrors() {
  errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
}

export function restoreConsoleErrors() {
  errorSpy?.mockRestore();
}
