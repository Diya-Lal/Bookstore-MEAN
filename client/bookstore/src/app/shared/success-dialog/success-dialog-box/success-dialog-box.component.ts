import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router'


@Component({
  selector: 'app-success-dialog-box',
  templateUrl: './success-dialog-box.component.html',
  styleUrls: ['./success-dialog-box.component.scss']
})
export class SuccessDialogBoxComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<SuccessDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router
  ) { 
  }

  ngOnInit() {
    console.log(this.data)
  }

  public close(): void {
    this.dialogRef.close();
  }

  public viewCart() {
    this.close();
    this.router.navigate(['/cart']);
  }
}
