import { Module } from '@nestjs/common';
import { SessionItemsService } from './session_items.service';
import { SessionItemsController } from './session_items.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionItem } from './model/session_item.model';
import { Session } from '../session/models/session.model';

@Module({
  imports: [SequelizeModule.forFeature([SessionItem,Session]),
  
],
  controllers: [SessionItemsController],
  providers: [SessionItemsService],
  exports: [SessionItemsService],
})
export class SessionItemsModule {}
