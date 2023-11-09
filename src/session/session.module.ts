import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from './models/session.model';
import { SessionItem } from '../session_items/model/session_item.model';

@Module({
  imports: [SequelizeModule.forFeature([Session])],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
