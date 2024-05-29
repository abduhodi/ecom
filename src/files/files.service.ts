import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';
// const fs = require('fs').promises;


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
      const filePath = path.resolve(__dirname, '../../', 'media');
      if (!fs.existsSync(file)) {
        fs.mkdir(filePath, { recursive: true }, (err) => {
          if (err) {
            throw new BadRequestException(err.message);
          }
        });
      }
      await fs.promises.writeFile(path.join(filePath, fileName), file.buffer);
      const url = process.env.API_HOST;
      const port = process.env.PORT;
      return `${url}:${port}/api/media/${fileName}`;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
