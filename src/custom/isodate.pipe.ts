import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
/**
 * Parses a parameter and validates is an ISO date string.
 */
export class ParseISODatePipe implements PipeTransform<string, Date> {
  transform(value: string): Date {
    if (!value || !value?.length) return null;

    // Try to parse the value as an ISO date string.
    const date = new Date(value);
    if (isNaN(date.getTime()))
      throw new BadRequestException(`Invalid ISO date string: ${value}`);

    return date;
  }
}
