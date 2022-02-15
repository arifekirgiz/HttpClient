import { Component } from '@angular/core';
import { TodoModel } from './model/todo';
import { MyServiceService } from './service/my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
   TodoList : TodoModel[] = [];
  constructor(private service : MyServiceService){}
  ngOnInit(){

     this.service.getService().subscribe(x=>
      this.TodoList = x
      )
  }
  getTodoFilter(userId: string)

   {
    this.service.getFilter(userId).subscribe(x =>
      {
      this.TodoList = x;
      })
  }
  AddTodo(value : string){
    let dt : TodoModel= {
      userId:10 , 
      title :value,
      completed : true,
      id : 3
     }
     this.service.AddTodo(dt).subscribe(x=>{
       dt.id = x['id'] ;  //sistemın verdiği ıd kullan
       this.TodoList.splice(0,0,dt)

     }
     
      )
   }
  UpdateTodo(item : TodoModel , _title : string){
    item.title = _title
    this.service.UpdateTodo(item).subscribe();

  }
  DeleteTodo(item : TodoModel){
    this.service.DeleteTodo(item).subscribe(x =>{
      console.log("delete item",item)

      let index = this.TodoList.indexOf(item)
      console.log("delete index",index)
      this.TodoList.splice(index , 1);
    });

  }
  
}
