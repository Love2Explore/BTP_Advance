import { Component ,OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-vechile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vechile.component.html',
  styleUrl: './vechile.component.css'
})
export class VechileComponent implements OnInit{
  Vechiles:any = []
  message:string = ''
  constructor(private _httpclient:HttpClient){
    this._httpclient.get("./odata/v4/vechile-catalog/VechileInformation")
    .subscribe(res=>{
      this.Vechiles = res;
      console.log(this.Vechiles)
    })
  }
  ngOnInit(): void {
    
  }
  deletedTodo(t:any){
    console.log(t)
  }
}
