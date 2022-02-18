import { BadRequestException, NestInterceptor, Type } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';

export const SingleImageUploadInterceptor = (
  maxFileSize: number,
): Type<NestInterceptor<any, any>> => {
  return FileInterceptor('image', {
    storage: diskStorage({
      destination: './public',
      filename: (_, file, callback) => {
        const ext = file.originalname.split('.')[1];
        callback(null, `${v4()}.${ext}`);
      },
    }),
    fileFilter: function (_, file, cb) {
      const { mimetype } = file;

      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(mimetype)) {
        return cb(
          new BadRequestException('Only jpg/jpeg/png file allowed!'),
          false,
        );
      }

      return cb(null, true);
    },
    limits: {
      fileSize: maxFileSize,
    },
  });
};
