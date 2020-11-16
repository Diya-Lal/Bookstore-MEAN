import { Component, OnInit } from '@angular/core';
import {BookstoreService} from '../shared/bookstore.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateQuantityComponent } from '../update-quantity/update-quantity.component';
import { WarningDialogComponent } from '../shared/warning-dialog/warning-dialog.component'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public booksCart
  public cartSum;
  public cartPrice

  constructor(private bookstoreService : BookstoreService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getBooksFromCart();
  }

  public getBooksFromCart(){

    this.bookstoreService.getFromCart().subscribe(
      (BooksInCartSuccess) => {  
        if(BooksInCartSuccess) {     
        this.booksCart = BooksInCartSuccess
        // this.cartPrice = this.booksCart.map((book)=>book.price)
        // this.cartSum = this.cartPrice.reduce((sum,current) => sum+current, 0)
        this.cartSum  =   this.booksCart
                          .map ((book) => book.price)
                          .reduce((sum,current) => sum+current, 0)
      } 
      },
      (BooksInCartError) => {
        
      }
    )
  }

  public onUpdateQuantity(book){
    const dialogRef = this.dialog.open(UpdateQuantityComponent, {
      width: '250px',
      data: {
        book:book
      }
    }).afterClosed().subscribe(
      (booksInCart) => 
      {
        this.getBooksFromCart();
      });
  }

  public onBookDelete(book) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '374px',
      height: '225px',
      data: {
        book:book,
        action:'delete'
      }
    }).afterClosed().subscribe(
      (booksInCart) =>
      this.getBooksFromCart()
    )
  }

  public onBookPurchase() {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '374px',
      height: '271px',
      data: {
        book:this.booksCart,
        price:this.cartSum,
        action:'buy'
      }
    }).afterClosed().subscribe(
      (booksInCart) =>
      this.getBooksFromCart()
    )
  }
  
}
