import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfirmationModalComponent } from "./confirmation-modal/confirmation-modal.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";

@NgModule({
  declarations: [ConfirmationModalComponent, BreadcrumbsComponent],
  imports: [CommonModule],
  exports: [ConfirmationModalComponent, BreadcrumbsComponent],
})
export class SharedModule {}
