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
      if (node.type === 'ClassDeclaration') {
        if (node.identifier.type === 'Identifier') {
          unmagler.saveIdentifier('Inject', node.identifier);
          unmagler.saveIdentifier('inject', node.identifier);
        } else if (node.identifier.type === 'TsParameterProperty') {
          unmagler.saveTSParameterProperty('Inject', node.identifier);
          unmagler.saveTSParameterProperty('inject', node.identifier);
        }

        for (const classMember of node.body) {
          if (classMember.type === 'ClassMethod') {
            unmagler.saveClassMethod('Provides', classMember);
            unmagler.saveClassMethod('provides', classMember);
          } else if (classMember.type === 'ClassProperty') {
            unmagler.saveClassProperty('Inject', classMember);
            unmagler.saveClassProperty('inject', classMember);
            unmagler.saveClassProperty('LateInject', classMember);
            unmagler.saveClassProperty('lateInject', classMember);
          }
        }
      }
    }
    return nodes;
  }
}

export default function plugin(): PluginOption[] {
  const projectRoot = process.cwd();

  const viteObsidian: Plugin = {
    name: 'vite:obsidian',
    enforce: 'pre',
    async transform(code, id) {
      // target ts and tsx files only
      const fileRegex = /\.(ts|tsx)$/;
      if (!fileRegex.test(id)) {
        return;
      }
      const [filepath] = id.split('?');
      const result = await swc.transform(code, {
        filename: id,
        sourceFileName: filepath,
        root: projectRoot,
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true,
          },
        },
        plugin(program) {
          return new ObsidianSWCPlugin().visitProgram(program);
        },
      });

      if (result) {
        const code = result.code;
        return { code, map: result.map };
      }

      return;
    },
  };

  return [viteObsidian];
}
