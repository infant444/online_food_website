import { Component,ElementRef,Input,OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, latLng, map, marker, tileLayer } from 'leaflet';
import { Order } from 'src/app/data/cart/order';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges{

  @Input()
  x=false;

@Input()
order!:Order;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  private readonly DEFAULT_LATLAG:LatLngTuple=[12.470161, 79.319878]


  @ViewChild('map',{static:true})
  mapRef!:ElementRef;

  map!:Map;
  currentMarker!:Marker;


  constructor(private locationservice:LocationService){

  }
  ngOnChanges(): void {
    if(!this.order)return;
    this.initializeMap();
    if(this.x && this.addressLatLng){
      this.showReadOnly();
    }
  }
  showReadOnly() {
    const m=this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng,this.MARKER_ZOOM_LEVEL);
    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }
  initializeMap(){
    if(this.map)
    return;
    this.map=map(this.mapRef.nativeElement,{
      attributionControl:false
    }).setView(this.DEFAULT_LATLAG,1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click',(e:LeafletMouseEvent)=>{
      this.setMarker(e.latlng);
    })
  }


  findMyLocation(){
    this.locationservice.getCurrentLocation().subscribe({
      next:(latlng)=>{
        this.map.setView(latlng,this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
        console.log(latlng);
      }
    });
  }

  setMarker(latlng:LatLngExpression){
    this.addressLatLng=latlng as LatLng;
    if(this.currentMarker)
    {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker=marker(latlng,{
      draggable:true,
      icon:this.MARKER_ICON

    }).addTo(this.map);

    this.currentMarker.on('dragend',()=>{
      this.addressLatLng=this.currentMarker.getLatLng();
    })
  }



  set addressLatLng(latlng:LatLng){

    if(!latlng.lat.toFixed)
    return;

    latlng.lat=parseFloat(latlng.lat.toFixed(8));
    latlng.lng=parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLag=latlng;
    console.log(this.order.addressLatLag);
  }

  get addressLatLng(){
    return this.order.addressLatLag!;
  }
}
