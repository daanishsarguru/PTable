import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServerCallerService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:82/AngularBackend/Controller';
  }

  getData = (tableName, callBackFunction, obj) => {
    this.http.get(this.url + '?param=' + tableName).subscribe(
      (response: Response) => {
        const data = response;
        console.log(data);
        callBackFunction(data);
      },
      (error) => console.log(error)
    );
  }
}
