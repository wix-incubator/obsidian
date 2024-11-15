import { Inject, Injectable } from "react-obsidian";
import type { Clock } from "./Clock";
import { DependencyGraph } from "./DependencyGraph";

@Injectable(DependencyGraph)
export class Greeter {
  @Inject() private clock!: Clock;

  greet() {
    return this.clock.isDayTime() ? 'Good day' : 'Good evening';
  }
}
