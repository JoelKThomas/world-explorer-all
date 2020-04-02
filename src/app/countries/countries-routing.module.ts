import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { SearchDashboardComponent } from './components/search-dashboard/search-dashboard.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

const routes: Routes = [
  {
    path: '',
    component: SearchDashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',
    component: CountryDetailComponent
  },
  {
    path: 'favourite',
    component: FavouritesComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
