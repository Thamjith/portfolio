import { defineConfig } from 'vite';
import { resolve } from 'node:path';

/** `/links` → `/links/` so nested MPA entry is served instead of SPA fallback. */
function linksPageMiddleware() {
  const rewrite = (req, _res, next) => {
    const url = req.url ?? '';
    const [pathname, search = ''] = url.split('?');
    if (pathname === '/links') {
      req.url = `/links/${search ? `?${search}` : ''}`;
    }
    next();
  };

  return {
    name: 'links-page-middleware',
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [linksPageMiddleware()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        links: resolve(__dirname, 'links/index.html'),
      },
    },
  },
});
