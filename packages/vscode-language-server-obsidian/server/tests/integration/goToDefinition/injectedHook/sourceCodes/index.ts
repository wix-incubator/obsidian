import { entryPointContent } from "./component";
import { entryGraphContent } from "./entryGraph";
import { entryViewModelContent } from "./entryViewModel";

export const entryPoint = {
  path: '/component.tsx',
  content: entryPointContent
}

export const entryGraph = {
  path: '/di/EntryGraph.ts',
  content: entryGraphContent
}

export const entryViewModel = {
  path: '/model/entryViewModel.ts',
  content: entryViewModelContent
};

