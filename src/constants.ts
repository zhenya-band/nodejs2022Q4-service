import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { Album } from './album/album.entity';
import { Artist } from './artist/artist.entity';
import { Favs } from './favs/favs.entity';
import { Track } from './track/track.entity';
import { User } from './users/user.entity';

dotenv.config();

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export const DB_CONNECTION_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User, Artist, Album, Track, Favs],
  synchronize: true,
};
