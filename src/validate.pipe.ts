import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Number.isNaN(parseInt(value))) {
      throw new BadRequestException(
        `Validation failed: parameter "${metadata.data}" error!`,
      );
    }

    return typeof value === 'number' ? value : parseInt(value);
  }
}
