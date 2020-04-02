import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { SignUpComponent } from './sign-up.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  beforeEach(() => {
    const ngFormStub = { value: {}, resetForm: () => ({}) };
    const userServiceStub = {
      postUser: value => ({ subscribe: () => ({}) }),
      selectedUser: {}
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SignUpComponent],
      imports: [FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [
        { provide: NgForm, useValue: ngFormStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SignUpComponent);
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
        const userServiceStub: UserService = fixture.debugElement.injector.get(
          UserService
        );
        spyOn(component, 'resetForm').and.callThrough();
        spyOn(userServiceStub, 'postUser').and.callThrough();
        component.onSubmit(ngFormStub);
        expect(component.resetForm).toHaveBeenCalled();
        expect(userServiceStub.postUser).toHaveBeenCalled();
      });
    });
  });
  describe('resetForm', () => {
    it('makes expected calls', () => {
      fakeAsync(() => {
        const ngFormStub: NgForm = fixture.debugElement.injector.get(NgForm);
        spyOn(ngFormStub, 'resetForm').and.callThrough();
        component.resetForm(ngFormStub);
        expect(ngFormStub.resetForm).toHaveBeenCalled();
      });
    });
  });
});
