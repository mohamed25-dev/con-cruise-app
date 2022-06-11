import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CustomersPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('ids can not be empty');
    }

    const arrayValue = value.split(',').map((id) => +id);
    if (arrayValue.length <= 0) {
      throw new BadRequestException('ids can not be empty');
    }

    return arrayValue;
  }
}
