import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }
  getDevicesByGroupName(){
    var lat = 10.873166;
    var lng = 106.785609;
    var devices = [];
    for (var i = 0; i <100; i++){
      devices.push(
        { 
          name: "PX" + i,
          lat: lat + Math.random()/6 - Math.random()/6,
          lng: lng + Math.random()/6 - Math.random()/6,
          rotationAngle: Math.random() * 180,
          status: "Active"
        }
      )
    }
    return devices;
  }
}
