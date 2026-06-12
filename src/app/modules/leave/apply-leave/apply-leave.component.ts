import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveService } from '../../../core/services/leave.service';

function dateRangeValidator(formGroup: FormGroup) {
  const from = formGroup.get('fromDate')?.value;
  const to = formGroup.get('toDate')?.value;
  if (from && to && new Date(to) < new Date(from)) {
    return { dateRange: true };
  }
  return null;
}

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  leaveForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private router: Router
  ) {
    this.leaveForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required]
    }, { validators: dateRangeValidator });
  }

  ngOnInit(): void { }

  get f() { return this.leaveForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.leaveForm.invalid) {
      return;
    }

    this.leaveService.applyLeave(this.leaveForm.value).subscribe({
      next: () => this.router.navigate(['/leave'])
    });
  }
}
