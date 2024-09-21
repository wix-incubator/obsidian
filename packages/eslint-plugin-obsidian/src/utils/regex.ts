export function stringToRegex(str: string) {
  const main = str.match(/\/(.+)\/.*/)![1];
  const options = str.match(/\/.+\/(.*)/)![1];
  return new RegExp(main, options);
}
