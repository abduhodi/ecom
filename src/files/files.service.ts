import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    const file_types = ['jpg', 'jpeg', 'png'];
    if (file_types.includes(file.mimetype.split('/')[1])) {
    } else {
      throw new BadRequestException('File with such type not allowed');
    }
    try {
      const fileName = uuid.v4() + `.${file.mimetype.split('/')[1]}`;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(file)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Faylni yozishda xatolik',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
