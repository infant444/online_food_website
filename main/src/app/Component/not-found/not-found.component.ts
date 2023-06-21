import { Component,OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @Input()
  con!:string;
  @Input()
  but!:string;
  @Input()
  rout!:string;
  constructor(private router:Router){}
ngOnInit(): void {
}
back(){
  this.router.navigateByUrl('/');
}
}
