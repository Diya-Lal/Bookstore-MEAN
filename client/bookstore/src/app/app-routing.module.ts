import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooklistsComponent } from './booklists/booklists.component';
import { CartComponent } from './cart/cart.component';
import { PurchaseComponent} from './purchase/purchase.component';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path:'books', component:BooklistsComponent },
  { path:'my-cart/:book/:id',component:BooklistsComponent },
  { path: 'cart', component: CartComponent  },
  { path: 'purchase', component: PurchaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
