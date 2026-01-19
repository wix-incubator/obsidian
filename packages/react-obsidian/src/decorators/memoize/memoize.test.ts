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

    it('should cache results separately for each unique argument combination', () => {
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
      expect(calc.multiply(4, 5)).toBe(20);
      expect(calc.multiply(2, 3)).toBe(6); // cached
      expect(calc.multiply(4, 5)).toBe(20); // cached

      expect(callCount).toBe(2);
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
        count(n: number): number {
          callCount++;
          return this.base + n;
        }
      }

      const counter1 = new Counter(10);
      const counter2 = new Counter(20);

      expect(counter1.count(5)).toBe(15);
      expect(counter2.count(5)).toBe(25);
      expect(counter1.count(5)).toBe(15); // cached for counter1
      expect(counter2.count(5)).toBe(25); // cached for counter2

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

  describe('argument handling', () => {
    it('should handle object arguments', () => {
      let callCount = 0;

      class Processor {
        @memoize()
        process(data: { value: number }): number {
          callCount++;
          return data.value * 2;
        }
      }

      const processor = new Processor();
      expect(processor.process({ value: 5 })).toBe(10);
      expect(processor.process({ value: 5 })).toBe(10); // same object shape = cached
      expect(processor.process({ value: 10 })).toBe(20); // different value = recompute

      expect(callCount).toBe(2);
    });

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
