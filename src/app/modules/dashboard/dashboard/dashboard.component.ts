import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../../core/services/leave.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocationService } from 'src/app/core/services/location.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  role: string | null = '';
  totalStaff = 0;
  totalLeaves = 0;
  approvedLeaves = 0;
  rejectedLeaves = 0;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private leaveService: LeaveService,
    private locationService: LocationService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.startLocationTracking();
    this.role = this.authService.getUserRole();


    if (this.role === 'HOD') {
      this.userService.getStaffCount().subscribe({
        next: (response) => this.totalStaff = response.count
      });
    }

    if (this.role === 'STAFF') {
      this.leaveService.getLeaveStats().subscribe({
        next: (stats) => {
          this.totalLeaves = stats.total;
          this.approvedLeaves = stats.approved;
          this.rejectedLeaves = stats.rejected;
        },
        error: (error) => {
          console.log(error);

        }
      });
    }

  }

  startLocationTracking() {

    console.log("map called");
    
    navigator.geolocation.getCurrentPosition(
      
      (position) => {

          console.log(position);
        
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

          

        this.fetchAddress(
          latitude,
          longitude
        );

      }

    );

  }

  fetchAddress(
    lat: number,
    lng: number
  ) {

    this.http.get<any>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    )
      .subscribe((response) => {
  console.log(response);
  
        this.locationService
          .updateLocation({
            latitude: lat,
            longitude: lng,
            areaName: response.display_name
          })
          .subscribe(()=> console.log("location send to mongo"));
          

      });

  }

}
