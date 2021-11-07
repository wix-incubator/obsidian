import * as obsidian from './index';

describe('Sanity', () => {
  it('Exports all functions', () => {
    expect(obsidian.Graph).toBeDefined();
    expect(obsidian.injectHook).toBeDefined();
    expect(obsidian.Obsidian.obtain).toBeDefined();
  });
});
