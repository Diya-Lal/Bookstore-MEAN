import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookstoreService {

  constructor(private http: HttpClient) { }

  public getBookLists(){
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
      return this.http.get("http://localhost:3000/books",{headers:headers})
      
  }

  // public bookListQuantityUpdate(updateItem,bookId) {
  //   const url = `http://localhost:3000/books/${bookId}`
  //   return this.http.patch(url, updateItem)
  // } 

  public bookListQuantityUpdate(updateItem) {
    const url = `http://localhost:3000/books`
    return this.http.patch(url, updateItem)
  } 

  public getBookDetailsById(bookId) {
    const url = `http://localhost:3000/books/${bookId}`
    return this.http.get(url);
  }

  public getBookFromCartById(bookId){
    const url = `http://localhost:3000/cart/${bookId}`
    return this.http.get(url);
}

  public addToCart(book,quantity){
    const cartBook = {
      id : book.id,
      name : book.name,
      price : book.price,
      img : book.img,
      number : quantity
    }
    return this.http.post("http://localhost:3000/cart",cartBook);
}
public updateCart(book,quantity){
  const url = `http://localhost:3000/cart/${book.id}`
  return this.http.put(url,book);
}

public getFromCart() {
  return this.http.get("http://localhost:3000/cart")
}

public cartPatchUpdate(updateItem,bookId) {
  const url = `http://localhost:3000/cart/${bookId}`
  return this.http.patch(url, updateItem)
} 

public deleteFromCart(book) {
  const url = `http://localhost:3000/cart/${book.id}`
  return this.http.delete(url,book);
}

public emptyCart() {
  const url = `http://localhost:3000/cart`;
  return this.http.delete(url);
}

}
