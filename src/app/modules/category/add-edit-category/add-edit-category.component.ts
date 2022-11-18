import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Category } from "../category";

@Component({
  selector: "app-add-edit-category",
  templateUrl: "./add-edit-category.component.html",
  styleUrls: ["./add-edit-category.component.scss"],
})
export class AddEditCategoryComponent implements OnInit {
  @Input() title: string = "add";
  @Input() category?: Category;
  public categoryForm: FormGroup | any;

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      categoryId: new FormControl(""),
      parentCategoryId: new FormControl(null),
      name: new FormControl("", [Validators.required]),
      status: new FormControl(false),
    });
    if (this.category) {
      this.categoryForm.patchValue({
        name: this.category.title_EN,
        status: this.category.status === "active" ? true : false,
        categoryId: this.category.id,
        parentCategoryId: this.category.parentId
          ? this.category.parentId
          : null,
      });
    }
  }

  submitHandler() {
    if (this.category) {
      this.category.title_EN = this.categoryForm.value.name;
      this.category.title_FR = this.categoryForm.value.name;
      (this.category.status = this.categoryForm.value.status
        ? "active"
        : "inactive"),
        this.activeModal.close(this.category);
    } else {
      const category: Category = {
        id: "PCAT-" + Math.floor(10 + Math.random() * 900),
        title_FR: this.categoryForm.value.name,
        title_EN: this.categoryForm.value.name,
        status: this.categoryForm.value.status ? "active" : "inactive",
        parentId: "",
        isChecked: false,
        children: null,
      };
      this.activeModal.close(category);
    }
  }
}
