import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooklistsComponent } from './booklists/booklists.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddToCartDialogComponent } from './add-to-cart-dialog/add-to-cart-dialog.component';
import {MatDialogModule,MatFormFieldModule} from '@angular/material';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { SuccessDialogBoxComponent } from './shared/success-dialog/success-dialog-box/success-dialog-box.component';
import { CartComponent } from './cart/cart.component';
import { UpdateQuantityComponent } from './update-quantity/update-quantity.component';
import { WarningDialogComponent } from './shared/warning-dialog/warning-dialog.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BooklistsComponent,
    AddToCartDialogComponent,
    SuccessDialogBoxComponent,
    CartComponent,
    UpdateQuantityComponent,
    WarningDialogComponent,
    PurchaseComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule, 
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AddToCartDialogComponent,SuccessDialogBoxComponent,UpdateQuantityComponent,WarningDialogComponent]
})

export class AppModule { }
