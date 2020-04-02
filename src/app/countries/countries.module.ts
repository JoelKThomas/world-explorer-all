import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenericModule } from '../generic/generic.module';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { SearchDashboardComponent } from './components/search-dashboard/search-dashboard.component';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
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
