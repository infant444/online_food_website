import { Component,OnInit,Input} from '@angular/core';

@Component({
  selector: 'input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css']
})
export class InputContainerComponent implements OnInit{
  constructor(){}
  @Input()
  bgcolor='white';
  @Input()
  lable!:string;
  ngOnInit(): void {

  }
}
