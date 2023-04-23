import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { InventoryComponent } from '../manager/inventory/inventory.component'
import { MaterialModule } from '../material.module'
import { InventoryRoutingModule } from './inventory-routing.module';
import { StockEntryComponent } from '../manager/inventory/stock-entry/stock-entry.component';
import { ProductsComponent } from '../manager/inventory/products/products.component';
import { CategoriesComponent } from '../manager/inventory/categories/categories.component';
import { InventoryHomeComponent } from '../manager/inventory/inventory-home/inventory-home.component'

@NgModule({
  declarations: [InventoryComponent, StockEntryComponent, ProductsComponent, CategoriesComponent, InventoryHomeComponent],
  imports: [CommonModule, InventoryRoutingModule, MaterialModule],
})
export class InventoryModule {}
