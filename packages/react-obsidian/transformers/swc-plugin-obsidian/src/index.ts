import * as swc from '@swc/core';
import {
  ModuleItem,
} from '@swc/types';
import {
  type Plugin,
  type PluginOption,
} from 'vite';
import Visitor from '@swc/core/visitor';
import unmagler from './unmagler';

export class ObsidianSWCPlugin extends Visitor {
  constructor() {
    super();
  }

  override visitModuleItems(nodes: ModuleItem[]): ModuleItem[] {
    for (const node of nodes) {
      if (node.type === "ClassDeclaration") {
        if (node.identifier.type === "Identifier") {
          unmagler.saveIdentifier('Inject', node.identifier);
        } else if (node.identifier.type === "TsParameterProperty") {
          unmagler.saveTSParameterProperty('Inject', node.identifier);
        }

        for (const classMember of node.body) {
          if (classMember.type === "ClassMethod") {
            console.log("ClassMethod", classMember)
            unmagler.saveClassMethod('Provides', classMember);
          } else if (classMember.type === "ClassProperty") {
            console.log("ClassProperty", classMember)
            unmagler.saveClassProperty('Inject', classMember);
            unmagler.saveClassProperty('LateInject', classMember);
          }
        }
      }
    }
    return nodes;
  }
}

export default function plugin(): PluginOption[] {
  let projectRoot = process.cwd();

  const viteObsidian: Plugin = {
    name: 'vite:obsidian',
    enforce: 'pre',
    async transform(code, id) {
      const [filepath] = id.split('?');
      const result = await swc.transform(code, {
        filename: id,
        sourceFileName: filepath,
        root: projectRoot,
        jsc: {
        parser: {
          syntax: "typescript",
          decorators: true
        }
      },
        plugin(program) {
          return new ObsidianSWCPlugin().visitProgram(program);
        },
      });

      if (result) {
        let code = result.code!
        return { code, map: result.map }
      }

      return;
    },
  }

  return [viteObsidian];
}
