import {
  instance,
  mock,
  verify,
  when,
} from '@johanblumenberg/ts-mockito';
import { uniqueId } from 'lodash';
import NameCreator from './NameCreator';
import ObjectGraph from './ObjectGraph';

describe('ObjectGraph', () => {
  let nameCreator: NameCreator;
  let uut: ObjectGraph;

  beforeEach(() => {
    nameCreator = mock(NameCreator);
    uut = new class SomeGraph extends ObjectGraph {
      protected override get nameCreator(): NameCreator {
        return instance(nameCreator);
      }
    }();
  });

  it('Delegates name creation to nameCreator', () => {
    when(nameCreator.create()).thenReturn('name');
    expect(uut.name).toEqual('name');
  });

  it('Graph name is created once', () => {
    when(nameCreator.create()).thenReturn(uniqueId('name'));
    expect(uut.name).toEqual(uut.name);
    verify(nameCreator.create()).once();
  });

  it('Creates unique names when graphs have the same name', () => {
    const graphA = new class SomeGraph extends ObjectGraph {
      protected override get nameCreator(): NameCreator {
        return instance(nameCreator);
      }
    }();
    const graphB = new class SomeGraph extends ObjectGraph {
      protected override get nameCreator(): NameCreator {
        return instance(nameCreator);
      }
    }();
    when(nameCreator.create()).thenReturn('SomeGraph1', 'SomeGraph2');
    expect(graphA.name).not.toBe(graphB.name);
    verify(nameCreator.create()).twice();
  });
});
