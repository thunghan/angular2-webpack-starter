import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Http} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';

import {Title} from '../../providers/title';
import {XLarge} from '../../directives/x-large';
import {Home} from '../home/home.component';

@Component({
    selector: 'app',
    providers: [FORM_PROVIDERS, Title],
    directives: [ROUTER_DIRECTIVES, XLarge],
    styles: [require('./app.component.scss')],
    template: require('./app.component.html')
})
@RouteConfig([
    {path: '/', component: Home, name: 'Home'}
])
export class AppComponent {
    url: string = 'https://twitter.com/AngularClass';

    constructor(public title: Title) {
    }
}
