import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'mysecretpassword',
          database: 'tasks_data_base',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true
      }),
      TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
