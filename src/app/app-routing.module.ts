import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/category/category.module").then(
        (m) => m.CategoryModule
      ),
  },
  {
    path: "not-found",
    component: NotFoundComponent,
  },
  { path: "**", redirectTo: "not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
