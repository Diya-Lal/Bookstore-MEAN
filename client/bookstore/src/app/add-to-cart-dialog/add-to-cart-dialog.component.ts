import { Component, OnInit, Inject, Output } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { BookstoreService } from '../shared/bookstore.service';

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.scss']
})
export class AddToCartDialogComponent implements OnInit {

  public bookLists;
  public bookId;
  public book;
  public quantity;
  public cartBooks;
  public number;
  public bookFoundInCart;
  public source;
  public booksQuantity;

  constructor(
        public dialogRef: MatDialogRef<AddToCartDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private bookstoreServies: BookstoreService, 
    ) 
    {
      this.bookLists = data.booklist;
      this.bookId = data.bookId;
      this.source = data.source;
    }
    

  ngOnInit() {
    this.getBookById();
    this.getBookFromCartById();
  }

  public getBookById(){
     this.book = this.bookLists.filter(
      book => book.id === this.bookId
    );
  }

  public getBookFromCartById() {
    this.bookstoreServies.getBookFromCartById(this.book[0].id).subscribe(
      (success) => 
      {
        if(success[0]){
        const cartQuantity = success[0].number;
        this.bookFoundInCart = this.book[0].copies-cartQuantity;
        } else {
          this.bookFoundInCart = this.book[0].copies;
        }
      },
      (error) =>
      {}
    )
  }

  close(): void {
    this.dialogRef.close();
  }

  public continueToCart(){

    const copy = {
      'copiesAdded':true,
      'copies': this.quantity,
      'book' : this.book[0]
    }

    this.bookstoreServies.getFromCart().subscribe(
      (BooksFromCartSuccessResponse) => {
        this.cartBooks = BooksFromCartSuccessResponse;
        this.bookFoundInCart = this.cartBooks.filter(
          book => book.id === this.bookId
        );
        if(this.bookFoundInCart.length>0){
          this.updateCart();
        } else {
          this.addToCart();
        }
      },
      (BooksFromCartErrorResponse) => {
      }
    )
    this.dialogRef.close(copy);
  }

  public addToCart(){
    const book = this.book[0];
    book.price = book.price*this.quantity;
    this.bookstoreServies.addToCart(book,this.quantity).subscribe(
      (AddToCartSuccessResponse) => {
        if(AddToCartSuccessResponse){
          //this.updateBookListQuantity();
        }
        
      },
      (BookListsErrorResponse) => {
       
      }
    )
  }

  public patchUpdateCart(){
    const updateItem = {
      number : this.bookFoundInCart[0].number + this.quantity
    }
    this.bookstoreServies.cartPatchUpdate(updateItem,this.book[0].id).subscribe(
      (UpdateCartSuccessResponse) => {
        const bookLists = UpdateCartSuccessResponse;
      },
      (UpdateCartErrorResponse) => {
       
      }
    )
  }

  public updateCart(){
    const updateItem = {
      id : this.bookFoundInCart[0].id,
      name : this.bookFoundInCart[0].name,
      price : this.bookFoundInCart[0].price + (this.book[0].price * this.quantity),
      img : this.bookFoundInCart[0].img,
      number : this.bookFoundInCart[0].number + this.quantity,
    }
    this.bookstoreServies.updateCart(updateItem,this.book[0].id).subscribe(
      (UpdateCartSuccessResponse) => {
       if(UpdateCartSuccessResponse) {
       // this.updateBookListQuantity(); Quantity updated from cart
       };
      },
      (UpdateCartErrorResponse) => {
       
      }
    )
  }

  // public updateBookListQuantity(){
  //   const bookListQuantity = {
  //     copies : this.book[0].copies - this.quantity 
  //   }
  //   this.bookstoreServies.bookListQuantityUpdate(bookListQuantity,this.book[0].id).subscribe(
  //     (success) => {

  //     },
  //     (error) => {

  //     }
  //   )
  // }
}
