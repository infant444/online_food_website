import { Component ,Input,OnInit} from '@angular/core';

@Component({
  selector: 'app-title1',
  templateUrl: './title1.component.html',
  styleUrls: ['./title1.component.css']
})
export class Title1Component implements OnInit {
  constructor(){}
  @Input()
  title!:string;
  @Input()
  margin!: '1rem 0 1rem .2rem';
  @Input()
  fontSize!:'2rem';
ngOnInit(): void {

}
}
