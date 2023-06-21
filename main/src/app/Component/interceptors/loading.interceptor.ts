import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading/loading.service';
var pendingRequest=0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loding:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loding.showLoading();
    pendingRequest=pendingRequest+1;
    return next.handle(request).pipe(
      tap({
        next:(event)=>{
          if(event.type===HttpEventType.Response){
            this.handlhide();
          }
        },
        error:(_)=>
        {
          this.handlhide();
        }
      })
    );
  }
  handlhide(){
    pendingRequest=pendingRequest-1;
    if(pendingRequest==0)
    {
      this.loding.hideLoading();
    }
  }
}
