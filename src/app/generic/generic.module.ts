import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericRoutingModule } from './generic-routing.module';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AvatarModule } from 'ngx-avatar';
import { MatMenuModule } from '@angular/material/menu';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [NavMenuComponent],
  imports: [
    CommonModule,
    GenericRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    AvatarModule,
    MatMenuModule
  ], exports: [NavMenuComponent]
})
export class GenericModule { }
