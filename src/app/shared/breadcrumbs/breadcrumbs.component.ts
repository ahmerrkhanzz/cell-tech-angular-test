import { Component, Input, OnChanges, OnInit, SimpleChange } from "@angular/core";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"],
})
export class BreadcrumbsComponent implements OnInit, OnChanges {
  public _links: any[] = [];

  @Input() set links(value: any) {
    console.log(value);
    
  }
  public breadcrumbs: any[] = [];
  constructor() {}
  ngOnInit(): void {
    console.log(this.links);
  }

  ngOnChanges(changes: any) {
    console.log(changes);
  }

  categoryBreadcrumbHandler(label: string) {
    console.log(label);
  }
}
