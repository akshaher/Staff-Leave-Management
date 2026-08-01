import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeaveService } from '../../../core/services/leave.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocationService } from 'src/app/core/services/location.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgIf } from '@angular/common';

interface ReverseGeocodeResponse {
  display_name: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [NgIf],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

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
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.startLocationTracking();

    if (this.role === 'HOD') {
      this.userService
        .getStaffCount()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => (this.totalStaff = response.count),
          error: () => (this.totalStaff = 0),
        });
    }

    if (this.role === 'STAFF') {
      this.leaveService
        .getLeaveStats()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (stats) => {
            this.totalLeaves = stats.total;
            this.approvedLeaves = stats.approved;
            this.rejectedLeaves = stats.rejected;
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  startLocationTracking() {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.fetchAddress(position.coords.latitude, position.coords.longitude);
      },
      () => {},
      { enableHighAccuracy: true },
    );
  }

  fetchAddress(lat: number, lng: number) {
    this.http
      .get<ReverseGeocodeResponse>(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.locationService
            .updateLocation({
              latitude: lat,
              longitude: lng,
              areaName: response.display_name,
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => console.log('location send to mongo'));
        },
        error:(error)=>{console.log('Error while fetching address', error)}
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
