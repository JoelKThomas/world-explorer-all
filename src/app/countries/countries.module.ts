import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericModule } from '../generic/generic.module';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { SearchDashboardComponent } from './components/search-dashboard/search-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { FavouritesComponent } from './components/favourites/favourites.component';

@NgModule({
  declarations: [CountryDetailComponent, SearchDashboardComponent, FavouritesComponent],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    GenericModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ]
})
export class CountriesModule { }
