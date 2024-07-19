import type { Context } from '../../dto/context';

export class InjectComponentHandler {
  constructor(private _context: Context) {
  }

  handle(node: unknown) {
    console.log(node);
  }
}