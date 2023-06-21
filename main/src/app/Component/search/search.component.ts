import { Component,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm:string='';
  constructor(private activaterout:ActivatedRoute,private router:Router){
    this.activaterout.params.subscribe((params)=>
    {
      if(this.searchTerm)
      {
        this.searchTerm=params.searchterm;
      }
    })
  }
  search(term:string){
    if(term)
    this.router.navigateByUrl('/search/'+term);
    else{
      alert("Enter term to search");

    }


  }
  ngOnInit(): void {

  }
}
