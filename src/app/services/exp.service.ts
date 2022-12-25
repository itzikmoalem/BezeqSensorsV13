import { Injectable } from '@angular/core';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class ExpService {

  constructor() { }

  working: number = 0;

  allSensors: Device[] = [];
 
}