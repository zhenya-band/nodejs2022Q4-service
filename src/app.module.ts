import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { Artist } from './artist/artist.entity';
import { AlbumModule } from './album/album.module';
import { Album } from './album/album.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nodejs-service',
      entities: [User, Artist, Album],
      synchronize: true,
    }),
    UsersModule,
    ArtistModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
