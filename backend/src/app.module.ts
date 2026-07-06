import { Controller, Get, Module, Header } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Controller()
class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  getRoot(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OJT Todo API</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #e2e8f0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            text-align: center;
            padding: 3rem;
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 1rem;
            backdrop-filter: blur(10px);
            max-width: 520px;
            width: 100%;
          }
          .badge {
            display: inline-block;
            background: #22c55e;
            color: #fff;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            margin-bottom: 1rem;
          }
          h1 { font-size: 2rem; margin-bottom: 0.5rem; }
          p { color: #94a3b8; margin-bottom: 1.5rem; }
          h3 { color: #94a3b8; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; margin: 1rem 0 0.5rem; text-align: left; }
          .endpoints { text-align: left; }
          .endpoint {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0.75rem;
            background: rgba(15, 23, 42, 0.6);
            border-radius: 0.5rem;
            margin-bottom: 0.35rem;
            font-family: 'Consolas', 'Courier New', monospace;
            font-size: 0.8rem;
          }
          .method {
            color: #fff;
            padding: 0.15rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.65rem;
            font-weight: 700;
            flex-shrink: 0;
            min-width: 52px;
            text-align: center;
          }
          .post { background: #22c55e; }
          .get { background: #3b82f6; }
          .put { background: #f59e0b; }
          .patch { background: #8b5cf6; }
          .delete { background: #ef4444; }
          .lock { font-size: 0.65rem; margin-left: auto; opacity: 0.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <span class="badge">● RUNNING</span>
          <h1>OJT Todo API</h1>
          <p>NestJS + Prisma + PostgreSQL</p>
          <div class="endpoints">
            <h3>Auth</h3>
            <div class="endpoint"><span class="method post">POST</span> /auth/register</div>
            <div class="endpoint"><span class="method post">POST</span> /auth/login</div>
            <div class="endpoint"><span class="method get">GET</span> /auth/me <span class="lock">🔒</span></div>
            <div class="endpoint"><span class="method put">PUT</span> /auth/me <span class="lock">🔒</span></div>
            <div class="endpoint"><span class="method patch">PATCH</span> /auth/change-password <span class="lock">🔒</span></div>
            <h3>Todos</h3>
            <div class="endpoint"><span class="method get">GET</span> /todos <span class="lock">🔒</span></div>
            <div class="endpoint"><span class="method get">GET</span> /todos/stats <span class="lock">🔒</span></div>
            <div class="endpoint"><span class="method get">GET</span> /todos/:id <span class="lock">🔒</span></div>
            <div class="endpoint"><span class="method post">POST</span> /todos <span class="lock">🔒</span></div>
            <div class="endpoint"><span class="method put">PUT</span> /todos/:id <span class="lock">🔒</span></div>
            <div class="endpoint"><span class="method delete">DELETE</span> /todos/:id <span class="lock">🔒</span></div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
