import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeaveService } from '../../../core/services/leave.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.css']
})
export class LeaveListComponent implements OnInit, OnDestroy {
  leaveList: any[] = [];
  role: string | null = '';
  showDeleteModal:boolean=false;
  selectedLeaveId!: number;

  showToast=false;
  toastMessage = '';
  toastType: string | undefined
  private leavesSubscription?: Subscription;

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    

    this.leavesSubscription = this.leaveService.leaves$.subscribe({
      next: (leaves) => {
        this.leaveList = leaves
      console.log(leaves);
      }
    });

    this.leaveService.getAllLeaves().subscribe();
  }

  updateStatus(leave: any, status: string) {
    this.leaveService.updateLeaveStatus(leave._id, status).subscribe({
      next: (response)=>{console.log(response);
        
        this.showNotification(`Leave ${status.toLowerCase()} successfully `, status.toLocaleLowerCase())
      },
      error: (err)=>{
        this.showNotification('Something went wrong', 'rejected')
        console.log(err);
      }
    });
  }

  openDeleteModal(id: number){
    this.selectedLeaveId = id;
    this.showDeleteModal =true;
  }


  confirmDelete(){
    this.leaveService.deleteLeave(this.selectedLeaveId).subscribe({
      next: (response)=>{  
        this.leaveList = this.leaveList.filter(
          leave => leave.id !== this.selectedLeaveId
        );
        this.showDeleteModal =false;
      },
      error: (err:any)=>{
        console.log(err);
        
      }
    })
  }

  closeDeleteModal(){
    this.showDeleteModal =false;
  }

  showNotification( message : string, type: string){
    this.toastMessage = message;
    this.toastType = type;
    this.showToast=true;

    setTimeout(()=>{
      this.showToast=false;
    },3000)

  }

  ngOnDestroy(): void {
    this.leavesSubscription?.unsubscribe();
  }
}
