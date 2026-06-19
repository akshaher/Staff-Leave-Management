import { Component, HostListener, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  staffChartOptions: Highcharts.Options |null = null;
  leaveChartOptions: Highcharts.Options|null =null;
  monthlyChartOptions: Highcharts.Options|null = null;

  users:any[]| null= null;

  map!: L.Map;
  latitude!: number;
  longitude!: number

  constructor(private dashboardService: DashboardService,
    private http: HttpClient,
    private locationService:LocationService
  ) {}

@HostListener('window:resize')
onResize() {
  if (this.map) {
    this.map.invalidateSize();
  }
}


  ngOnInit(): void {

    this.loadUsers();

    setInterval(()=>{
        this.loadUsers()}, 10000)

    this.loadStaffChart();
    this.loadLeaveChart();
    this.loadMonthlyChart();
    // this.getCurrentLocation();
  }

  // ---------------- BAR CHART ----------------
  loadStaffChart() {
    this.dashboardService.getStaffByDepartment()
      .subscribe(data => {

        console.log(data);
        
        this.staffChartOptions = {
          chart: { type: 'column' },

          title: { text: 'Staff by Designation' },

          xAxis: {
            categories: data.map(x => x._id)
          },

          yAxis: {
            tickInterval: 1,
            title: { text: 'Count' }
          },

          series: [
            {
              type: 'column',
              name: 'Designation',
              data: data.map(x => x.count)
            }
          ],
          tooltip:{
            headerFormat :'<b>{point.key}</b><br/>',
            pointFormat:'Total Staff : <b>{point.y}</b>'
          }
        };

      });
  }

  // ---------------- PIE CHART ----------------
  loadLeaveChart() {
    this.dashboardService.getLeaveStatus()
      .subscribe(data => {

        this.leaveChartOptions = {
          chart: { type: 'pie' },

          title: { text: 'Leave Status' },

          series: [
            {
              type: 'pie',
              data: data.map(x => ({
                name: x._id,
                y: x.count
              }))
            }
          ]
        };

      });
  }

  // ---------------- LINE CHART ----------------
loadMonthlyChart() {
  this.dashboardService.getMonthlyLeaves()
    .subscribe(data => {

      console.log(data);

      const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];

      const monthlyMap = new Array(12).fill(0);

      data.forEach(x => {
        const index = x._id.month - 1;
        monthlyMap[index] = x.count;
      });

      this.monthlyChartOptions = {
        chart: {
          type: 'area'
        },

        title: {
          text: 'Monthly Leave Requests'
        },

        xAxis: {
          categories: monthNames
        },

        yAxis: {
          title: {
            text: 'Number of Leaves'
          }
        },

        tooltip: {
          formatter: function () {
            return `
              <b>${this.x}</b><br/>
              Leaves: <b>${this.y}</b>
            `;
          }
        },

        series: [
          {
            type: 'area',
            name: 'Leaves',
            data: monthlyMap
          }
        ]
      };

    });
}


getAddress(lat:number, lng:number){
return this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
}

// getCurrentLocation(){
//     if(!navigator.geolocation){
//         alert("Geolocation is not Supported.")
//         return;
//     }


//     navigator.geolocation.getCurrentPosition(
//     (position)=>{
//      this.latitude =position.coords.latitude;
//      this.longitude=position.coords.longitude;


//      this.getAddress(this.latitude, this.longitude).subscribe((response:any)=>{
//      const areaName=response.display_name

//      console.log(areaName);
     
//     })
//      this.loadMap();
//     },
//     (error)=>{
//         console.error(error)
//     })
// }

// loadMap(){
//  this.map = L.map('map').setView(
//     [this.latitude, this.longitude],15
//  )

//  L.tileLayer(
//      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//      {
//         maxZoom: 19
//      }
//  ).addTo(this.map)

//  L.marker([this.latitude, this.longitude]).addTo(this.map).bindPopup('You are here').openPopup();

//  const icon = L.icon({
//   iconUrl:
//     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

//   shadowUrl:
//     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

//   iconSize: [25, 41],
//   iconAnchor: [12, 41]
// });

// L.marker(
//   [this.latitude, this.longitude],
//   { icon }
// ).addTo(this.map);

// setTimeout(()=>{
// this.map.invalidateSize();
// },0)

// } 

 loadUsers(){
    this.locationService.getUsersLocation().subscribe((response:any)=>{
        console.log(response);
        
        this.users=response;
    })
 }


 isOnline(lastSeenAt: string): boolean {

  const diff =
    Date.now() -
    new Date(lastSeenAt).getTime();

  return diff < 60000;
}



}