import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: "search" })
export class SearchPipe implements PipeTransform {
  transform(value: any, q?: any, colName: any = "title_EN"): any {
    if (!value) return null;
    if (!q) return value;
    q = q.toLowerCase();
    return value.filter((item: any) => {
      return item[colName].toLowerCase().includes(q);
    });
  }
}
