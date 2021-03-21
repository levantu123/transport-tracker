import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient, private zone: NgZone) { }
  getDevicesByGroupName() {
    var lat = 10.873166;
    var lng = 106.785609;
    var devices = [];
    for (var i = 0; i < 100; i++) {
      devices.push(
        {
          name: "PX" + i,
          lat: lat + Math.random() / 6 - Math.random() / 6,
          lng: lng + Math.random() / 6 - Math.random() / 6,
          rotationAngle: Math.random() * 180,
          status: "Active"
        }
      )
    }
    return devices;
  }
  getAllDevices(): Observable<any> {
    var devices: Array<any> = new Array();

    return Observable.create((observer: Subscriber<any>) => {
      const eventSource = new EventSource(`/vestiges`);

      eventSource.onmessage = (event) =>
        this.zone.run(() => {
          const json = JSON.parse(event.data);
          devices.push(JSON.parse(event.data));
          observer.next(json);
        });

      eventSource.onerror = (error) => observer.complete();

      return () => eventSource.close();
    });
  }

  getById(id:string): Observable<any> {
    var devices: Array<any> = new Array();

    return Observable.create((observer: Subscriber<any>) => {
      const eventSource = new EventSource(`/vestiges/${id}`);

      eventSource.onmessage = (event) =>
        this.zone.run(() => {
          const json = JSON.parse(event.data);
          devices.push(JSON.parse(event.data));
          observer.next(json);
        });

      eventSource.onerror = (error) => observer.complete();

      return () => eventSource.close();
    });
  }

}
