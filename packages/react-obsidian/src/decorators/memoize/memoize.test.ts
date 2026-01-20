import { memoize } from './Memoize';

describe('memoize decorator', () => {
  describe('caching behavior', () => {
    it('should return cached value when called with same arguments', () => {
      let callCount = 0;

      class Calculator {
        @memoize()
        add(a: number, b: number): number {
          callCount++;
          return a + b;
        }
      }

      const calc = new Calculator();
      const result1 = calc.add(1, 2);
      const result2 = calc.add(1, 2);

      expect(result1).toBe(3);
      expect(result2).toBe(3);
      expect(callCount).toBe(1);
    });

    it('should recompute when called with different arguments', () => {
      let callCount = 0;

      class Calculator {
        @memoize()
        add(a: number, b: number): number {
          callCount++;
          return a + b;
        }
      }

      const calc = new Calculator();
      const result1 = calc.add(1, 2);
      const result2 = calc.add(1, 3);

      expect(result1).toBe(3);
      expect(result2).toBe(4);
      expect(callCount).toBe(2);
    });

    it('should only cache the last result (single-value cache)', () => {
      let callCount = 0;

      class Calculator {
        @memoize()
        multiply(a: number, b: number): number {
          callCount++;
          return a * b;
        }
      }

      const calc = new Calculator();

      expect(calc.multiply(2, 3)).toBe(6);
      expect(callCount).toBe(1);

      expect(calc.multiply(4, 5)).toBe(20); // different args, recompute
      expect(callCount).toBe(2);

      expect(calc.multiply(2, 3)).toBe(6); // previous args evicted, recompute
      expect(callCount).toBe(3);

      expect(calc.multiply(2, 3)).toBe(6); // same as last, cached
      expect(callCount).toBe(3);
    });

    it('should work with no parameters', () => {
      let callCount = 0;

      class IdGenerator {
        private id = 0;

        @memoize()
        generateId(): number {
          callCount++;
          return ++this.id;
        }
      }

      const generator = new IdGenerator();
      const id1 = generator.generateId();
      const id2 = generator.generateId();

      expect(id1).toBe(1);
      expect(id2).toBe(1); // cached, same value
      expect(callCount).toBe(1);
    });
  });

  describe('per-instance caching', () => {
    it('should maintain separate caches for different instances', () => {
      let callCount = 0;

      class Counter {
        constructor(private base: number) {}

        @memoize()
        add(n: number): number {
          callCount++;
          return this.base + n;
        }
      }

      const counter1 = new Counter(10);
      const counter2 = new Counter(20);

      expect(counter1.add(5)).toBe(15);
      expect(counter2.add(5)).toBe(25);
      expect(counter1.add(5)).toBe(15); // cached for counter1
      expect(counter2.add(5)).toBe(25); // cached for counter2

      expect(callCount).toBe(2);
    });
  });

  describe('return types', () => {
    it('should work with object return values', () => {
      let callCount = 0;

      class ObjectFactory {
        @memoize()
        create(id: string): { id: string; timestamp: number } {
          callCount++;
          return { id, timestamp: Date.now() };
        }
      }

      const factory = new ObjectFactory();
      const obj1 = factory.create('test');
      const obj2 = factory.create('test');

      expect(obj1).toBe(obj2); // same reference
      expect(callCount).toBe(1);
    });

    it('should work with array return values', () => {
      let callCount = 0;

      class ArrayFactory {
        @memoize()
        createArray(size: number): number[] {
          callCount++;
          return Array.from({ length: size }, (_, i) => i);
        }
      }

      const factory = new ArrayFactory();
      const arr1 = factory.createArray(3);
      const arr2 = factory.createArray(3);

      expect(arr1).toBe(arr2); // same reference
      expect(arr1).toEqual([0, 1, 2]);
      expect(callCount).toBe(1);
    });

    it('should work with string return values', () => {
      let callCount = 0;

      class Greeter {
        @memoize()
        greet(name: string): string {
          callCount++;
          return `Hello, ${name}!`;
        }
      }

      const greeter = new Greeter();
      expect(greeter.greet('World')).toBe('Hello, World!');
      expect(greeter.greet('World')).toBe('Hello, World!');
      expect(callCount).toBe(1);
    });
  });

  describe('Object.is comparison', () => {
    it('should use reference equality for objects (not deep equality)', () => {
      let callCount = 0;

      class Processor {
        @memoize()
        process(data: { value: number }): number {
          callCount++;
          return data.value * 2;
        }
      }

      const processor = new Processor();
      const obj = { value: 5 };

      expect(processor.process(obj)).toBe(10);
      expect(processor.process(obj)).toBe(10); // same reference, cached
      expect(callCount).toBe(1);

      expect(processor.process({ value: 5 })).toBe(10); // different reference, recompute
      expect(callCount).toBe(2);
    });

    it('should handle NaN correctly (NaN === NaN with Object.is)', () => {
      let callCount = 0;

      class Calculator {
        @memoize()
        compute(value: number): string {
          callCount++;
          return `result: ${value}`;
        }
      }

      const calc = new Calculator();
      expect(calc.compute(NaN)).toBe('result: NaN');
      expect(calc.compute(NaN)).toBe('result: NaN'); // Object.is(NaN, NaN) is true
      expect(callCount).toBe(1);
    });

    it('should distinguish between 0 and -0', () => {
      let callCount = 0;

      class Calculator {
        @memoize()
        compute(value: number): string {
          callCount++;
          return Object.is(value, -0) ? 'negative zero' : 'zero or other';
        }
      }

      const calc = new Calculator();
      expect(calc.compute(0)).toBe('zero or other');
      expect(calc.compute(-0)).toBe('negative zero'); // Object.is(0, -0) is false
      expect(callCount).toBe(2);
    });
  });

  describe('custom isEqual function', () => {
    it('should use custom isEqual when provided', () => {
      let callCount = 0;

      class UserService {
        @memoize({
          isEqual: (newArgs, lastArgs) => newArgs[0].id === lastArgs[0].id,
        })
        getDisplayName(user: { id: number; name: string }): string {
          callCount++;
          return user.name.toUpperCase();
        }
      }

      const service = new UserService();

      expect(service.getDisplayName({ id: 1, name: 'Alice' })).toBe('ALICE');
      expect(callCount).toBe(1);

      // Same id, different name - should use cache due to custom isEqual
      expect(service.getDisplayName({ id: 1, name: 'Alice Updated' })).toBe('ALICE');
      expect(callCount).toBe(1);

      // Different id - should recompute
      expect(service.getDisplayName({ id: 2, name: 'Bob' })).toBe('BOB');
      expect(callCount).toBe(2);
    });

    it('should support deep equality comparison via custom isEqual', () => {
      let callCount = 0;

      const deepEqual = (a: unknown, b: unknown): boolean =>
        JSON.stringify(a) === JSON.stringify(b);

      class DataProcessor {
        @memoize({
          isEqual: (newArgs, lastArgs) => deepEqual(newArgs, lastArgs),
        })
        process(data: { values: number[] }): number {
          callCount++;
          return data.values.reduce((sum, v) => sum + v, 0);
        }
      }

      const processor = new DataProcessor();

      expect(processor.process({ values: [1, 2, 3] })).toBe(6);
      expect(callCount).toBe(1);

      // Different object, same deep value - cached with deep equality
      expect(processor.process({ values: [1, 2, 3] })).toBe(6);
      expect(callCount).toBe(1);

      // Different values - recompute
      expect(processor.process({ values: [1, 2, 4] })).toBe(7);
      expect(callCount).toBe(2);
    });
  });

  describe('argument handling', () => {
    it('should handle multiple parameters of different types', () => {
      let callCount = 0;

      class Formatter {
        @memoize()
        format(prefix: string, value: number, suffix: string): string {
          callCount++;
          return `${prefix}${value}${suffix}`;
        }
      }

      const formatter = new Formatter();
      expect(formatter.format('$', 100, '.00')).toBe('$100.00');
      expect(formatter.format('$', 100, '.00')).toBe('$100.00'); // cached
      expect(formatter.format('€', 100, '.00')).toBe('€100.00'); // different prefix

      expect(callCount).toBe(2);
    });
  });
});
