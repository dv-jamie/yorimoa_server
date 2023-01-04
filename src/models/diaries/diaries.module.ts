import { Module,  } from '@nestjs/common';
import { DiariesService } from './diaries.service';
import { DiariesController } from './diaries.controller';
import { diariesProviders } from './diaries.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';
import { ImagesModule } from '../images/images.module';
import { ThemesModule } from '../themes/themes.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ImagesModule,
    ThemesModule,
  ],
  controllers: [DiariesController],
  providers: [
    ...diariesProviders,
    DiariesService
  ]
})
export class DiariesModule {}
