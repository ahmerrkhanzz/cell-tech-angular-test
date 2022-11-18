import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationModalComponent } from "src/app/shared/confirmation-modal/confirmation-modal.component";
import { AddEditCategoryComponent } from "../add-edit-category/add-edit-category.component";
import { Category } from "../category";
import { CategoryService } from "../category.service";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  public isSubmitted: boolean = false;
  public loginForm: FormGroup | any;

  public categories: Category[] = [];
  public selectAll: boolean = false;
  public searchCategory: string = "";
  public breadcrumbs: any[] = [];

  constructor(
    private _router: Router,
    private _categoryService: CategoryService,
    private modalService: NgbModal,
    private _route: ActivatedRoute
  ) {
    this._route.queryParams.subscribe((params: any) => {
      if (
        params &&
        Object.keys(params).length === 0 &&
        Object.getPrototypeOf(params) === Object.prototype
      ) {
        this.getCategories();
      } else {
        this.getCategories(params.id);
      }
    });
  }

  ngOnInit(): void {
    // this.getCategories();
  }

  getCategories(categoryId?: string) {
    this._categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
        this.categories.forEach((e: any) => {
          e.isChecked = false;
        });

        if (categoryId) {
          const filteredCategories = this.getItemRow(categoryId);
          this.categories = filteredCategories.children;
        }
      },
      error: (e) => console.log("error"),
      complete: () => {},
    });
  }

  getItemRow(id: any) {
    return this.findNodeWithId(id, this.categories);
  }
  findNodeWithId(id: any, rootArr: any): any {
    for (let el of rootArr) {
      if (el.id === id) {
        return el;
      }
      if (el.children) {
        const idFoundInChildren = this.findNodeWithId(id, el.children);
        if (idFoundInChildren !== null) {
          return idFoundInChildren;
        }
      }
    }
    return null;
  }

  public selectedCategories: Category[] = [];
  deleteCategoryHandler(categoryId?: string) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.categoryId = categoryId
      ? categoryId
      : "selected";
    modalRef.result.then((result: any) => {
      if (result) {
        if (categoryId) {
          this.categories = this.categories.filter(
            (e: any) => e.id !== categoryId
          );
        } else {
          this.selectedCategories = this.categories.filter(
            (e: any) => e.isChecked
          );
          this.categories = this.categories.filter(
            (val) => !this.selectedCategories.includes(val)
          );
        }
      }
    });
  }

  selectCategoryHandler() {
    this.selectedCategories = this.categories.filter((e: any) => e.isChecked);
  }

  checkUncheckAll() {
    const x = this.categories.filter((e: any) => e.isChecked);
    if (x.length && this.selectAll) {
      this.categories.forEach((e: any) => {
        e.isChecked = true;
      });
    } else {
      this.categories.forEach((e: any) => {
        e.isChecked = !e.isChecked;
      });
    }
  }

  addEditCategory(type: string, category?: Category) {
    const modalRef = this.modalService.open(AddEditCategoryComponent);
    modalRef.componentInstance.title = type;
    modalRef.componentInstance.category = category;
    modalRef.result.then((result: any) => {
      if (result) {
        const isExistedCategory = this.categories.filter(
          (e: any) => e.id === result.id
        );
        if (isExistedCategory.length) {
          const idx = this.categories.indexOf(result);
          this.categories[idx] = result;
        } else {
          this.categories.unshift(result);
        }
      }
    });
  }

  categoryHandler(category?: Category) {
    if (category?.children) {
      this._router.navigate(["."], {
        relativeTo: this._route,
        queryParams: { id: category.id },
      });
      this.categories = category.children;
      this.breadcrumbs.push({
        label: category.id,
      });
    }
  }

  categoryBreadcrumbHandler(label: string) {
    this.getCategories(label);
    this.breadcrumbs = this.breadcrumbs.filter((e: any) => e.label === label);
  }
}
