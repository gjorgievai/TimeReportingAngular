import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Timereport} from "../models/timereport";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http:HttpClient) { }
  createTime(date:Date,hours:number,employeeId:number,projectId:number):Observable<Object> {
    return this.http.post("http://localhost:8080/timereports",{
      "date":date,
      "hours":hours,
      "employee":{
        "id":employeeId
      },
      "project":{
        "id":projectId
      },
    },{
      'responseType':'text'
    });
  }
  getTimereports():Observable<Object>{
    return this.http.get("http://localhost:8080/timereports",{
      'responseType':'text'
    });
  }
  findTimereportById(id:number){
    return this.http.get("http://localhost:8080/timereports/"+id,{
      'responseType':'json'
    })
  }

  deleteById(id: number) {
    this.http.delete('http://localhost:8080/timereports/'+id).subscribe();
  }
  editTimereport(timereport:Timereport){
    this.http.put('http://localhost:8080/timereports',{
      "id":timereport.id,
      "date":timereport.date,
      "hours":timereport.hours,
      "employee":{
        "id":timereport.employeeId
      },
      "project":{
        "id":timereport.projectId
      },
    },{
      'responseType':'text'
    }).subscribe();
  }
  getTimereportsByDate(startDate:Date,endDate:Date,employeeId:Number):Observable<Object>{
    var start = moment(startDate.toISOString()).format('YYYY-MM-DD');
    var end = moment(endDate.toISOString()).format('YYYY-MM-DD');
    console.log(start + " " +end );
    return this.http.get("http://localhost:8080/timereports/filterByDate?startDate="+start.toString()+"&endDate="+end.toString()+"&employeeId="+employeeId,{'responseType':'text'});
  }

}
