import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CountriesService } from '../../service/countries.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouritesComponent } from './favourites.component';
describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;
  beforeEach(() => {
    const countriesServiceStub = {
      getAllUserFavourite: () => ({ subscribe: () => ({}) }),
      getCountryDetail: favouriteCountry => ({ subscribe: () => ({}) }),
      postFavouriteCountry: country => ({ subscribe: () => ({}) }),
      removeFavouriteCountry: country => ({ subscribe: () => ({}) })
    };
    const matSnackBarStub = { open: (arg, string, object) => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FavouritesComponent],
      providers: [
        { provide: CountriesService, useValue: countriesServiceStub },
        { provide: MatSnackBar, useValue: matSnackBarStub }
      ]
    });
    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('userFavourites defaults to: []', () => {
    expect(component.userFavourites).toEqual([]);
  });
  it('userFavouriteCountryDetails defaults to: []', () => {
    expect(component.userFavouriteCountryDetails).toEqual([]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getUserFavouriteCountry').and.callThrough();
      component.ngOnInit();
      expect(component.getUserFavouriteCountry).toHaveBeenCalled();
    });
  });
  describe('getUserFavouriteCountry', () => {
    it('makes expected calls', () => {
      fakeAsync(() => {
        const countriesServiceStub: CountriesService = fixture.debugElement.injector.get(
          CountriesService
        );
        spyOn(countriesServiceStub, 'getAllUserFavourite').and.callThrough();
        spyOn(countriesServiceStub, 'getCountryDetail').and.callThrough();
        component.getUserFavouriteCountry();
        expect(countriesServiceStub.getAllUserFavourite).toHaveBeenCalled();
        expect(countriesServiceStub.getCountryDetail).toHaveBeenCalled();
      });
    });
  });
});
