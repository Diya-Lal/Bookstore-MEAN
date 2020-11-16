import { Component, OnInit } from '@angular/core';
import {BookstoreService} from '../shared/bookstore.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddToCartDialogComponent } from '../add-to-cart-dialog/add-to-cart-dialog.component';
import {SuccessDialogBoxComponent} from '../shared/success-dialog/success-dialog-box/success-dialog-box.component';
  import { from } from 'rxjs';
  @Component({
    selector: 'app-booklists',
    templateUrl: './booklists.component.html',
    styleUrls: ['./booklists.component.scss']
  })
  export class BooklistsComponent implements OnInit {

  public bookLists;
  public copies={};

  constructor(private bookstoreServies : BookstoreService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getBookLists();
  }

  public getBookLists(){
    this.bookstoreServies.getBookLists().subscribe(
      (BookListsSuccessResponse) => {
        this.bookLists = BookListsSuccessResponse
      },
      (BookListsErrorResponse) => {
        this.bookLists = BookListsErrorResponse
      }
    )
  }

  public onAddToCart(id){
    const dialogRef = this.dialog.open(AddToCartDialogComponent, {
      width: '374px',
      height: '271px',
      data: {
        booklist:this.bookLists,
        bookId:id,
      }
    }).afterClosed().subscribe(
      (quantity) => 
      {
        this.callSuccessDialog(quantity);
        this.copies=quantity
      });
  }
 
  public callSuccessDialog(book){
    const dialogRef = this.dialog.open(SuccessDialogBoxComponent, {
      width: '400px',
      height: '195px',
      data: {
        bookItem:book,
        source:'from-booklist'
      }
    })
  }

}

