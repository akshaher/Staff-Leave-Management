import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LeaveService } from '../../../core/services/leave.service';
import { NgClass } from '@angular/common';

function dateRangeValidator(formGroup: UntypedFormGroup) {
  const from = formGroup.get('fromDate')?.value;
  const to = formGroup.get('toDate')?.value;
  console.log(from,"called");

  if (from && to && new Date(to) < new Date(from)) {
    return { dateRange: true };
  }
  return null;
}

@Component({
    selector: 'app-apply-leave',
    templateUrl: './apply-leave.component.html',
    styleUrls: ['./apply-leave.component.css'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, NgClass]
})
export class ApplyLeaveComponent implements OnInit {
  leaveForm: UntypedFormGroup;
  submitted = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private leaveService: LeaveService,
    private router: Router
  ) {
    this.leaveForm = this.formBuilder.group({
      leaveDate: this.formBuilder.group(
        {
        fromDate: ['', Validators.required],
        toDate: ['', Validators.required]
        },
        {
          validators: dateRangeValidator
        }
      ),   
     reason: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  get f() { return this.leaveForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('called', this.leaveForm.value);

    if (this.leaveForm.invalid) {
      return;
    }

    const payload={
      fromDate: this.leaveForm.value.leaveDate.fromDate,
      toDate : this.leaveForm.value.leaveDate.toDate,
      reason: this.leaveForm.value.reason
    }

    console.log(payload);
    

    this.leaveService.applyLeave(this.leaveForm.value).subscribe({
      next: () => this.router.navigate(['/leave'])
    });
  }
}
