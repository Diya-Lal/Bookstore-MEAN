import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA,MatDialog} from '@angular/material/dialog';
import { BookstoreService } from '../../shared/bookstore.service'
import { SuccessDialogBoxComponent } from '../success-dialog/success-dialog-box/success-dialog-box.component'
import { Router } from '@angular/router'
@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css']
})
export class WarningDialogComponent implements OnInit {

  public bookLists;
  public bookCopyArray = [];

  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
    public dialog: MatDialog,
    private bookstoreService : BookstoreService,
    private router : Router,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { 
  }

  ngOnInit() {
    this.getBookLists();
  }

  public deleteFromCart() {
    this.bookstoreService.deleteFromCart(this.data.book).subscribe(
      (DeleteFromCartSuccess) =>
      {
        this.close();
      },
      (DeleteFromCartError)=> {

      }
    )
  }

  public buyFromCart() {   
    this.bookListQurantityUpdate();
    this.cartUpdate();
    this.close();
    this.router.navigate(['/purchase']);
  }    

  public bookListQurantityUpdate() {
    this.bookstoreService.bookListQuantityUpdate(this.bookCopyArray).subscribe(
      (success) => {
        console.log("BooksCartUPdateSuccess")
      },
      (error) => {

      }
    )
  }

  public cartUpdate() {
    this.bookstoreService.emptyCart().subscribe(
      (success) => {
        console.log("EmptyCartSuccess")
      },
      (error) => {

      }
    )

  }
  public getBookLists(){
    this.bookstoreService.getBookLists().subscribe(
      (BookListsSuccessResponse) => {
        this.bookLists = BookListsSuccessResponse;

        this.data.book.map((bookCart) => {
          let book = this.bookLists.find((bookList) => bookCart.id == bookList.id)
          if (book.copies) {
            this.bookCopyArray.push(
              {
                copies : book.copies - bookCart.number,
                id : book.id
              })
          }
        });
      // if(this.bookCopyArray.length>0) {
      //  this.updateBookListQuantity(this.bookCopyArray);
      // }
      },
      (BookListsErrorResponse) => {
        this.bookLists = BookListsErrorResponse
      }
    )
  }
        
    public updateBookListQuantity(booksArray){
    this.bookstoreService.bookListQuantityUpdate(booksArray).subscribe(
      (success) => {
        this.close();
        const dialogRef = this.dialog.open(SuccessDialogBoxComponent, {
          width: '250px',
          data: {
            source : 'from-cart'
          }
        }).afterClosed().subscribe(
          (booksInCart) => 
          {
           // this.getBooksFromCart();
          });
      },
      (error) => {

      }
    )
  }

  public close(): void {
    this.dialogRef.close();
  }


}
