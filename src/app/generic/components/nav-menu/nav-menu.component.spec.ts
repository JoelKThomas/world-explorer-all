import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../../../auth/service/user.service';
import { Router } from '@angular/router';
import { NavMenuComponent } from './nav-menu.component';
import { MatMenuModule } from '@angular/material';
describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  beforeEach(() => {
    const userServiceStub = {
      getToken: () => ({}),
      getUserPayload: () => ({}),
      deleteToken: () => ({})
    };
    const routerStub = { navigate: array => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavMenuComponent],
      imports: [MatMenuModule],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'getToken').and.callThrough();
      spyOn(userServiceStub, 'getUserPayload').and.callThrough();
      component.ngOnInit();
      expect(userServiceStub.getToken).toHaveBeenCalled();
      expect(userServiceStub.getUserPayload).toHaveBeenCalled();
    });
  });
  describe('logout', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(userServiceStub, 'deleteToken').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.logout();
      expect(userServiceStub.deleteToken).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
  describe('favourites', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.favourites();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
