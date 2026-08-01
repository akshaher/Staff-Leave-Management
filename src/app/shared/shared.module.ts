import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchStaffPipe } from './pipes/search.pipe';
import { SortStaffPipe } from './pipes/sort.pipe';
import { RouterModule } from '@angular/router';
import { ConfirmModalComponent } from './components/confirm-Modal/confirm-Modal.component';
import { ToastComponent } from './components/Toast/toast.component';
import { SplitNamePipe } from './pipes/split.pipe';
import { ProductImageDirective } from './directives/product-image.directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HeaderComponent,
        SidebarComponent,
        SearchStaffPipe,
        SortStaffPipe,
        ConfirmModalComponent,
        ToastComponent,
        SplitNamePipe,
        ProductImageDirective
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        SearchStaffPipe,
        SortStaffPipe,
        ConfirmModalComponent,
        ToastComponent,
        SplitNamePipe,
        RouterModule,
        ProductImageDirective
    ]
})
export class SharedModule { }
