import { ObjectGraph } from '../ObjectGraph';
import { GraphResolveChain } from './GraphResolveChain';
import { Middleware } from './Middleware';

export abstract class GraphMiddleware extends Middleware<ObjectGraph, GraphResolveChain> { }
