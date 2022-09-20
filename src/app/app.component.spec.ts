// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppComponent } from './app.component';
// import { of } from 'rxjs';


// describe(`Component: App Component`, () => {

//   let component;
//   let companySvc;

//   beforeEach(() => {
//     companySvc = {
//       getCompanies: () => of([{
//         name: 'Fake Company',
//         email : 'fakeEmail@ssw.com.au',
//         number: 12345,
//       }])
//     };
//     component = new AppComponent(companySvc);
//   });
//   it(`companyCount = 1`, () => {
//     component.ngOnInit();
//     component.companyCount$.subscribe(c => {
//       expect(c).toEqual(1);
//     });
//   });

//   it('add 1+1 - PASS', () => {
//     expect(1 + 1).toEqual(2);
//   });

//   it(`title equals 'Angular Superpowers'`, () => {
//     const component = new AppComponent();
//     expect(component.title).toEqual('Brisbane');
//   });
// });
