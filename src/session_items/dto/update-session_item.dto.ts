import { PartialType } from '@nestjs/swagger';
import { CreateSessionItemDto } from './create-session_item.dto';

export class UpdateSessionItemDto extends PartialType(CreateSessionItemDto) {}
