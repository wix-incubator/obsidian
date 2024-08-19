// https://github.com/jsdom/jsdom/issues/3363#issuecomment-1221060809
// https://stackoverflow.com/questions/73607410/referenceerror-structuredclone-is-not-defined-using-jest-with-nodejs-typesc
global.structuredClone = val => {
  return JSON.parse(JSON.stringify(val))
}