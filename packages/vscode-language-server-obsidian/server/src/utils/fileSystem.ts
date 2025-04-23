import * as fs from 'fs';

export function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function writeFile(filePath: string, content: any) {
  const stringContent = typeof content === 'string' ? content : JSON.stringify(content);
  fs.writeFileSync(filePath, stringContent);
}