import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import {AppComponent} from './app.component';
import {Title} from '../../providers/title';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AppComponent,
    Title
  ]);

  it('should have a url', inject([ AppComponent ], (app) => {
    expect(app.url).toEqual('https://twitter.com/AngularClass');
  }));

});
