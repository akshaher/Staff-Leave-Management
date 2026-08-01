import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'splitName',
    standalone: true
})
export class SplitNamePipe implements PipeTransform{
    transform(fullName: string, ...args: any[]): string {
        if (fullName) {
            return fullName.split(' ')[0];
        }
        return '';
    }
}