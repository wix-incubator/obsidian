const esbuild = require('esbuild');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

async function main() {
  const commonConfig = {
    bundle: true,
    format: 'cjs',
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: 'node',
    mainFields: ['module', 'main'], // https://github.com/evanw/esbuild/issues/1619#issuecomment-925030648
    logLevel: 'warning',
    plugins: [esbuildProblemMatcherPlugin]
  };

  const clientCtx = await esbuild.context({
    ...commonConfig,
    entryPoints: ['client/src/extension.ts'],
    outfile: 'client/dist/extension.js',
    external: ['vscode']
  });

  const serverCtx = await esbuild.context({
    ...commonConfig,
    entryPoints: ['server/src/server.ts'],
    outfile: 'server/dist/server.js',
    external: ['vscode']
  });

  if (watch) {
    await Promise.all([
      clientCtx.watch(),
      serverCtx.watch()
    ]);
  } else {
    await Promise.all([
      clientCtx.rebuild(),
      serverCtx.rebuild()
    ]);
    await Promise.all([
      clientCtx.dispose(),
      serverCtx.dispose()
    ]);
  }
}

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
  name: 'esbuild-problem-matcher',

  setup(build) {
    build.onStart(() => {
      console.log('[watch] build started');
    });
    build.onEnd(result => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`);
        if (location == null) return;
        console.error(`    ${location.file}:${location.line}:${location.column}:`);
      });
      console.log('[watch] build finished');
    });
  }
};

main().catch(e => {
  console.error(e);
  process.exit(1);
});
