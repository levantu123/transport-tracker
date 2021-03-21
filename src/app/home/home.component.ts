import { Component, OnInit } from '@angular/core';
import { icon, latLng, LatLngExpression, Marker, marker, MarkerOptions, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private deviceService: DeviceService) { }
  ngOnInit(): void {

    this.deviceService.getAllDevices().subscribe(data=>{
      this.deviceService.getById(data.id).subscribe(e=>{
        console.log(e);
      })
    });

    this.devices = this.deviceService.getDevicesByGroupName();
    this.devices.forEach(device => {
      var obser = new Observable<Marker>(observer => {
        setInterval(() => observer.next(marker([device.lat, device.lng], {
          icon: icon({
            className: "rotate-100",
            iconSize: [20, 24],
            iconUrl: 'assets/marker.png',
          })
        }).on('click', () => {
          console.log(device);
        })))
      });
      var mark: Marker = marker([device.lat, device.lng], {
        riseOffset: 12,
        
        icon: icon({
          className: "rotate-100",
          iconSize: [20, 24],
          iconUrl: 'assets/marker.png',
        })
      }).on('click', () => {
        console.log(mark.getIcon());
      });
      obser.subscribe(v => {
        mark = v;
      })
      this.marks.push(mark);
      //this.obsers.push(obser);
    })

  }
  devices: Array<any> = [];
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Monitoring' })
    ],
    zoom: 12,
    center: latLng(10.873166, 106.785609)
  };
  marks: Array<Marker> = []

}
