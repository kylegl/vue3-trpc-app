/// <reference types="vitest" />
import path from 'path'
import { VitePluginNode } from 'vite-plugin-node'

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

export default defineConfig(({ command, mode }) => {
  const config: UserConfig = {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      Vue({
        reactivityTransform: true,
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/core',
        ],
        dts: true,
        dirs: [
          './src/composables',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
    // https://github.com/vitest-dev/vitest
    ],
    test: {
      environment: 'jsdom',
    },
  }

  if (command === 'serve' || mode === 'server') {
    config?.plugins?.push(
      ...VitePluginNode({
        // REFERENCE:  https://github.com/axe-me/vite-plugin-node/issues/47

        // Nodejs native Request adapter
        // tell the plugin where is your project entry
        appPath: './src/server/trpc/index.ts',
        exportName: 'viteNodeApp',
        tsCompiler: 'esbuild',
        adapter({ app, req, res, next }) {
          if (req.url?.startsWith('/trpc'))
            app(req, res)

          else
            next()
        },
        // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
        swcOptions: {},
      }),
    )
  }
  return config
})
