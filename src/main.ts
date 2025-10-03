import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const result = {
        field: errors[0].property,
        message: errors && errors[0].constraints && errors[0].constraints[Object.keys(errors[0].constraints)[0]]
      }
      return new BadRequestException(result);
    }
  }));

  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
