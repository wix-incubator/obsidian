export interface Result {
  readonly isError: boolean;
  getMessage: () => string;
}
