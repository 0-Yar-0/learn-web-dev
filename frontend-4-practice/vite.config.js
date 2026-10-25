import { defineConfig, loadEnv } from 'vite';
import { bookingApiPlugin } from './server/server.js';

export default defineConfig(({mode}) => {
  const env={...loadEnv(mode,process.cwd(),'KONTUR_'),...process.env};
  const delay=Number(env.KONTUR_API_DELAY ?? 600);
  return {
    base:'./',
    esbuild:{jsx:'automatic'},
    server:{host:'127.0.0.1',port:3000},
    plugins:[bookingApiPlugin({delayMs:Number.isFinite(delay)?delay:600,fail:env.KONTUR_API_FAIL||''})],
  };
});
