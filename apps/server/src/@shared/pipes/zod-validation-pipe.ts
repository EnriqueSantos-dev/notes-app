import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    const parsedValue = this.schema.safeParse(value);
    if (!parsedValue.success)
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        details: parsedValue.error.flatten().fieldErrors,
      });

    return parsedValue.data;
  }
}
