import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CategoriesComponent } from '../manager/inventory/categories/categories.component'
import { InventoryHomeComponent } from '../manager/inventory/inventory-home/inventory-home.component'
import { InventoryComponent } from '../manager/inventory/inventory.component'
import { ProductsComponent } from '../manager/inventory/products/products.component'
import { StockEntryComponent } from '../manager/inventory/stock-entry/stock-entry.component'

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      { path: '', redirectTo: '/inventory/home', pathMatch: 'full' },
      { path: 'home', component: InventoryHomeComponent },
      { path: 'stock-entry', component: StockEntryComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
