import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { SignInComponent } from './sign-in.component';
describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  beforeEach(() => {
    const ngFormStub = { value: {} };
    const routerStub = { navigateByUrl: string => ({}) };
    const userServiceStub = {
      isLoggedIn: () => ({}),
      login: value => ({ subscribe: () => ({}) }),
      setToken: res => ({})
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SignInComponent],
      imports: [FormsModule],
      providers: [
        { provide: NgForm, useValue: ngFormStub },
        { provide: Router, useValue: routerStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('emailRegex defaults to: /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/', () => {
    expect(component.emailRegex).toEqual(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      fakeAsync(() => {
        const ngFormStub: NgForm = fixture.debugElement.injector.get(NgForm);
        const routerStub: Router = fixture.debugElement.injector.get(Router);
        const userServiceStub: UserService = fixture.debugElement.injector.get(
          UserService
        );
        spyOn(routerStub, 'navigateByUrl').and.callThrough();
        spyOn(userServiceStub, 'login').and.callThrough();
        spyOn(userServiceStub, 'setToken').and.callThrough();
        component.onSubmit(ngFormStub);
        expect(routerStub.navigateByUrl).toHaveBeenCalled();
        expect(userServiceStub.login).toHaveBeenCalled();
        expect(userServiceStub.setToken).toHaveBeenCalled();
      });
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', fakeAsync(() => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(userServiceStub, 'isLoggedIn').and.callThrough();
      component.ngOnInit();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(userServiceStub.isLoggedIn).toHaveBeenCalled();
    }));
  });
});
