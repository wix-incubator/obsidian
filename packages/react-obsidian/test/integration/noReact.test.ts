/**
 * Integration test to verify Obsidian works without React.
 */
describe('Obsidian without React (Jest)', () => {
  beforeEach(() => {
    // Clear module cache before each test
    jest.resetModules();

    // Mock React to throw an error as if it's not installed
    jest.mock('react', () => {
      throw new Error("Cannot find module 'react'");
    });
  });

  afterEach(() => {
    jest.unmock('react');
  });

  it('exports core DI functionality without React', () => {
    jest.isolateModules(() => {
      // Import in isolation to get a fresh instance without React
      const {
        Obsidian,
        ObjectGraph,
        Observable,
        graph,
        injectable,
        inject,
        singleton,
        mockGraphs,
      } = require('../../src/index');

      // Core exports should work
      expect(Obsidian).toBeDefined();
      expect(typeof Obsidian.registerGraph).toBe('function');
      expect(typeof Obsidian.obtain).toBe('function');

      expect(ObjectGraph).toBeDefined();
      expect(Observable).toBeDefined();

      expect(typeof graph).toBe('function');
      expect(typeof injectable).toBe('function');
      expect(typeof inject).toBe('function');
      expect(typeof singleton).toBe('function');

      expect(typeof mockGraphs).toBe('function');
    });
  });

  it('Observable works without React', () => {
    jest.isolateModules(() => {
      const { Observable } = require('../../src/index');

      const obs = new Observable(42);
      expect(obs.value).toBe(42);

      let notifiedValue: number | undefined;
      const unsubscribe = obs.subscribe((value: number) => {
        notifiedValue = value;
      });

      obs.value = 100;
      expect(notifiedValue).toBe(100);

      unsubscribe();
    });
  });

  it('can create and use dependency graphs without React', () => {
    jest.isolateModules(() => {
      const { Obsidian, ObjectGraph } = require('../../src/index');

      class TestService {
        getValue() {
          return 'test-value';
        }
      }

      class TestGraph extends ObjectGraph {
        testService = new TestService();
      }

      Obsidian.registerGraph('test-no-react', () => TestGraph);
      const serviceLocator = Obsidian.obtain('test-no-react');

      expect(serviceLocator).toBeDefined();
      expect(serviceLocator.testService).toBeDefined();
    });
  });

  it('mockGraphs is available without React', () => {
    jest.isolateModules(() => {
      const { ObjectGraph, mockGraphs } = require('../../src/index');

      class MockedGraph extends ObjectGraph {}

      // Should be able to call mockGraphs without errors
      expect(() => {
        mockGraphs({ TestGraph: MockedGraph });
      }).not.toThrow();
    });
  });

  it('React-dependent features throw helpful errors without React', () => {
    jest.isolateModules(() => {
      const {
        injectComponent,
        injectHook,
        injectHookWithArguments,
        useObserver,
        useObservers,
      } = require('../../src/index');

      // All React-dependent features should throw clear errors
      expect(() => injectComponent(() => null, 'test'))
        .toThrow('injectComponent requires React to be installed');

      expect(() => injectHook(() => ({}), 'test'))
        .toThrow('injectHook requires React to be installed');

      expect(() => injectHookWithArguments(() => ({}), 'test'))
        .toThrow('injectHookWithArguments requires React to be installed');

      expect(() => {
        const { Observable } = require('../../src/index');
        useObserver(new Observable(1));
      }).toThrow('useObserver requires React to be installed');

      expect(() => useObservers({}))
        .toThrow('useObservers requires React to be installed');
    });
  });

  it('testKit is undefined without React', () => {
    jest.isolateModules(() => {
      const { testKit } = require('../../src/index');
      expect(() => testKit({})).toThrow('testKit requires React to be installed');
    });
  });

  it('mockModel is undefined without React', () => {
    jest.isolateModules(() => {
      const { mockModel } = require('../../src/index');
      expect(() => mockModel({})).toThrow('mockModel requires React to be installed');
    });
  });
});
