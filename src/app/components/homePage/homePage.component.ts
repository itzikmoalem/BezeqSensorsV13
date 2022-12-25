import { Component, ElementRef, ViewChild } from '@angular/core'; 
import { ExpService } from 'src/app/services/exp.service';
import { Device } from 'src/app/models/device.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-homePage',
    templateUrl: './homePage.component.html',
    styleUrls: ['./homePage.component.scss']
})
export class homePageComponent {
   
    constructor(public exp: ExpService, public api: ApiService){}

    allDevices: Device[] = [];
    breakpoint!: number;
    amountOfDevices: number = 0;
    workingDevices: number = 0;
    hebrewNamesList:string[] = [];

    // for using pipe
    @ViewChild('searchItem') searchItem!:ElementRef;
    search: string ="";

    ngOnInit() {

        //api request for json file
        this.allDevices =  this.api.getAllSensors();
        this.exp.allSensors = this.allDevices;
        console.log(this.allDevices);

        //count how much sensors are actives
        this.allDevices.forEach(i => {
          if (i.ComponentOk == 1) {
            this.exp.working += 1;
          }
          this.hebrewNamesList.push(i.WebSiteDeviceName);
        });

        this.workingDevices = this.exp.working;
        this.amountOfDevices = this.allDevices.length;

        // responsive open page
        this.myResize(window.innerWidth);
     }

     // clicked on add new sensor
     addNewSensor(){
        this.allDevices.push(this.allDevices[this.allDevices.length-2]);
        this.exp.allSensors = this.allDevices;
        this.amountOfDevices += 1;
     }

     // for output (data from child)
     addItem(newItem: number) {
      this.workingDevices = newItem;
     }

     // responsive grid
     onResize(event:any) {
      this.myResize(event.target.innerWidth);
    }

    // search sensor (pipe)
    searchSensor() {
      this.search = this.searchItem.nativeElement.value;
    }

    //responsive screen table method
    myResize(px: any) {
      this.breakpoint = (px <= 790) ? 1 : 4;

      if (px > 1190 && px <= 1650) {
        this.breakpoint = 3;
      }
      else if (px > 790 && px <= 1190) {
        this.breakpoint = 2;
      }
    }
}