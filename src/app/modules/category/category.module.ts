import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryService } from "./category.service";
import { CategoryListComponent } from "./category-list/category-list.component";
import { AddEditCategoryComponent } from "./add-edit-category/add-edit-category.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SearchPipe } from "src/app/pipes/search.pipe";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [CategoryListComponent, AddEditCategoryComponent, SearchPipe],
  providers: [CategoryService],
  exports:[SearchPipe],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    CategoryRoutingModule,
    SharedModule
  ],
})
export class CategoryModule {}
