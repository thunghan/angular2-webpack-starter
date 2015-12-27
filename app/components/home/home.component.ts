import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {Title} from '../../providers/title';

@Component({
    selector: 'home',
    directives: [FORM_DIRECTIVES],
    providers: [Title],
    pipes: [],
    styles: [require('./home.component.scss')],
    template: require('./home.component.html')
})
export class Home {
    constructor(public title: Title, public http: Http) {
    }

    ngOnInit() {
        console.log('hello Home');
    }
}
