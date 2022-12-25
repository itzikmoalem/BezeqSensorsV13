import { Component, Input } from '@angular/core'; 
import { Device } from 'src/app/models/device.model';
import { ExpService } from 'src/app/services/exp.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sensor',
    templateUrl: './sensor.component.html',
    styleUrls: ['./sensor.component.scss']
})
export class sensorComponent {
 
    @Input() device!: Device;
    @Output() newItemEvent = new EventEmitter<number>();

    imageSrc!: string;
    bgColor : string = 'red';
    date!: string;
    lastDate!: string;

    constructor(public exp: ExpService){}
    
    ngOnInit() {
      //images of sensors load
      this.imageSrc = "assets/images/sensors/" + this.device.Picture + ".png";

      //insert dot by data
      this.bgColor = 'red';
      if (this.device.ComponentOk == 1) {
          this.bgColor = 'green';
      }

      //install date print
      let temp = this.device.InstallDate.split("T");
      temp = temp[0].split("-");
      this.date = temp[2] + "/" + temp[1] + "/" + temp[0];

      //last report date print
      temp = this.device.LastReportDate.split(" ");
      temp = temp[0].split("-");
      this.lastDate = temp[2] + "/" + temp[1] + "/" + temp[0];
    }

    // change button color & service data & number of working device output
    changeActive() {
      if (this.device.ComponentOk == 1) {
        this.bgColor = 'red';
        this.device.ComponentOk = 0;
        this.exp.working = this.exp.working - 1;
      }
      else {
        this.bgColor = 'green'
        this.device.ComponentOk = 1;
        this.exp.working = this.exp.working + 1;
      }
      this.newItemEvent.emit(this.exp.working);
    }
}