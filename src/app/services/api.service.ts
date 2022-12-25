import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import sensors from 'src/app/jsons/sensors.json';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getAllSensors() {
    return sensors.components;
  }
}