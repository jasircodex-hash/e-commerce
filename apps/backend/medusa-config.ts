import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    redisUrl: process.env.REDIS_URL,
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      ssl: false,
      connectionTimeoutMillis: 10000,
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || 'supersecret_jwt',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret_cookie',
    },
  },
  admin: {
    serve: true,
    path: '/app',
    vite: (config) => {
      return {
        server: {
          host: '0.0.0.0',
          allowedHosts: ['localhost', '.localhost', '127.0.0.1', 'host.docker.internal'],
        },
      }
    },
  },
})
