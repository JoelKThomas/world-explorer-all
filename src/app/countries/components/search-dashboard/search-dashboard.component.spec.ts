import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CountriesService } from '../../service/countries.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchDashboardComponent } from './search-dashboard.component';
describe('SearchDashboardComponent', () => {
  let component: SearchDashboardComponent;
  let fixture: ComponentFixture<SearchDashboardComponent>;
  beforeEach(() => {
    const countriesServiceStub = {
      getAllCountries: () => ({ subscribe: () => ({}) }),
      postFavouriteCountry: country => ({ subscribe: () => ({}) }),
      removeFavouriteCountry: country => ({ subscribe: () => ({}) }),
      getAllUserFavourite: () => ({ subscribe: () => ({}) })
    };
    const routerStub = { navigate: array => ({}) };
    const matSnackBarStub = { open: (arg, string, object) => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchDashboardComponent],
      providers: [
        { provide: CountriesService, useValue: countriesServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ]
    });
    fixture = TestBed.createComponent(SearchDashboardComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('currentData defaults to: []', () => {
    expect(component.currentData).toEqual([]);
  });
  it('userFavourites defaults to: []', () => {
    expect(component.userFavourites).toEqual([]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getAllCountryDetails').and.callThrough();
      component.ngOnInit();
      expect(component.getAllCountryDetails).toHaveBeenCalled();
    });
  });
  describe('getAllCountryDetails', () => {
    it('makes expected calls', () => {
      const countriesServiceStub: CountriesService = fixture.debugElement.injector.get(
        CountriesService
      );
      spyOn(component, 'getUserFavourite').and.callThrough();
      spyOn(countriesServiceStub, 'getAllCountries').and.callThrough();
      component.getAllCountryDetails();
      expect(component.getUserFavourite).toHaveBeenCalled();
      expect(countriesServiceStub.getAllCountries).toHaveBeenCalled();
    });
  });
  describe('getUserFavourite', () => {
    it('makes expected calls', () => {
      const countriesServiceStub: CountriesService = fixture.debugElement.injector.get(
        CountriesService
      );
      spyOn(countriesServiceStub, 'getAllUserFavourite').and.callThrough();
      component.getUserFavourite();
      expect(countriesServiceStub.getAllUserFavourite).toHaveBeenCalled();
    });
  });
});
