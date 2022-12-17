import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const port: number = +process.env.PORT || 3003

  await app.listen(3003);
  console.info(`\nApplication is running on: \n ${await app.getUrl()}/graphql`);
}
bootstrap();
