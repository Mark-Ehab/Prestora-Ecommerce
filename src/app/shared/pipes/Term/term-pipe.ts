import { join } from 'node:path';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'term',
})
export class TermPipe implements PipeTransform {
  transform(text: string, termsNum: number): string {
    return text.split(' ', termsNum).join(' ');
  }
}
