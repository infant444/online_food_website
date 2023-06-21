import { Component,OnInit,Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{

  constructor(private router:Router){}

  ngOnInit(): void {
  }
  food(){
    this.router.navigateByUrl('/info');
  }
  user(){
    this.router.navigateByUrl('/user');
  }
  order(){
    this.router.navigateByUrl('/admin/order');
  }
  feedback(){
    this.router.navigateByUrl('user/admin/feedback');
  }

}
