import { Controller, Get, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Controller()
class AppController {
  @Get()
  getRoot() {
    return {
      message: 'OJT Todo API is running',
      endpoints: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
      },
    };
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
