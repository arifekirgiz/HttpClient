import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoModel } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  url="https://jsonplaceholder.typicode.com/";

  constructor( private http :HttpClient) { }
  getService(): Observable<TodoModel[]>{
    
     return this.http.get<TodoModel[]>(this.url + 'todos')
  }
  getFilter(userId:string){
     
     const params = new HttpParams().set('userId' ,userId)
     return this.http.get<TodoModel[]>(this.url + 'todos/', {params})
  }
  AddTodo(todoModel : TodoModel) : Observable<TodoModel>{ //new data POST

    return this.http.post<TodoModel>(this.url + 'todos/' , JSON.stringify(todoModel));

  }
  UpdateTodo(todoModel : TodoModel): Observable<TodoModel> {
    
    return this.http.put<TodoModel>(this.url + 'todos/'+ todoModel.id , JSON.stringify(todoModel)) ; 

  }
  DeleteTodo(todoModel : TodoModel) : Observable<TodoModel>{
    return this.http.delete<TodoModel>(this.url + 'todos/'+ todoModel.id)

  }
}
