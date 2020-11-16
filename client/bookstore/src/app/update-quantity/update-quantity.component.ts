import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { BookstoreService } from '../shared/bookstore.service';

@Component({
  selector: 'app-update-quantity',
  templateUrl: './update-quantity.component.html',
  styleUrls: ['./update-quantity.component.css']
})
export class UpdateQuantityComponent implements OnInit {

  public bookToUpdate;
  public bookDetails;
  public quantity

  constructor(public dialogRef: MatDialogRef<UpdateQuantityComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private bookstoreServies: BookstoreService, ) {      
      this.bookToUpdate = data.book;
    }

  ngOnInit() {
    this.getBookDetailsById();
  }

  public getBookDetailsById(){
     this.bookDetails = this.bookstoreServies.getBookDetailsById(this.bookToUpdate.id). subscribe(
       (success) => {
          this.bookDetails = success;
       } , 
       (error) => {

       }

     )
  }

   public updatQuantityAndPrice() {
     const updateBook = this.bookToUpdate;
     updateBook.number = this.quantity
     updateBook.price = this.bookDetails[0].price * this.quantity;
      this.bookstoreServies.updateCart(updateBook,this.bookToUpdate.id).subscribe(
        (success) => {
          this.close();
          // this.updateBookQuantity();
        },
        (error) => {

        }
      )
  }

  // public updateBookQuantity(){
  //     const updateItem = {
  //       copies : this.bookDetails[0].copies - this.quantity
  //     }
  //     this.bookstoreServies.bookListQuantityUpdate(updateItem, this.bookToUpdate.id).subscribe (
  //       (success) => {

  //       },
  //       (error) => {

  //       }
  //     )
  // }

  close(): void {
    this.dialogRef.close();
  }

  // public continueToCart(){

  //   const copy = {
  //     'copiesAdded':true,
  //     'copies': this.quantity,
  //     'book' : this.book[0]
  //   }

  //   this.bookstoreServies.getFromCart().subscribe(
  //     (BooksFromCartSuccessResponse) => {
  //       this.cartBooks = BooksFromCartSuccessResponse;
  //       this.bookFoundInCart = this.cartBooks.filter(
  //         book => book.id === this.bookId
  //       );
  //       if(this.bookFoundInCart.length>0){
  //         this.updateCart();
  //       } else {
  //         this.addToCart();
  //       }
  //     },
  //     (BooksFromCartErrorResponse) => {
  //     }
  //   )
  //   this.dialogRef.close(copy);
  // }

  // public addToCart(){
  //   const book = this.book[0];
  //   book.price = book.price*this.quantity;
  //   this.bookstoreServies.addToCart(book,this.quantity).subscribe(
  //     (AddToCartSuccessResponse) => {
  //       if(AddToCartSuccessResponse){
  //         this.updateBookListQuantity();
  //       }
        
  //     },
  //     (BookListsErrorResponse) => {
       
  //     }
  //   )
  // }

  // public patchUpdateCart(){
  //   const updateItem = {
  //     number : this.bookFoundInCart[0].number + this.quantity
  //   }
  //   this.bookstoreServies.cartPatchUpdate(updateItem,this.book[0].id).subscribe(
  //     (UpdateCartSuccessResponse) => {
  //       const bookLists = UpdateCartSuccessResponse;
  //     },
  //     (UpdateCartErrorResponse) => {
       
  //     }
  //   )
  // }

  // public updateCart(){
  //   const updateItem = {
  //     id : this.bookFoundInCart[0].id,
  //     name : this.bookFoundInCart[0].name,
  //     price : this.bookFoundInCart[0].price + (this.book[0].price * this.quantity),
  //     img : this.bookFoundInCart[0].img,
  //     number : this.bookFoundInCart[0].number + this.quantity,
  //   }
  //   this.bookstoreServies.updateCart(updateItem,this.book[0].id).subscribe(
  //     (UpdateCartSuccessResponse) => {
  //      if(UpdateCartSuccessResponse) {
  //       this.updateBookListQuantity();
  //      };
  //     },
  //     (UpdateCartErrorResponse) => {
       
  //     }
  //   )
  // }

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



