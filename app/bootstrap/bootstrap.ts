import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
import {enableProdMode} from 'angular2/core';

import {AppComponent} from '../components/app/app.component';

if (!DEVELOPMENT) enableProdMode();

function main() {
    var providers = [
        HTTP_PROVIDERS,
        ROUTER_PROVIDERS
    ];

    if (DEVELOPMENT) providers.push(ELEMENT_PROBE_PROVIDERS);

    return bootstrap(AppComponent, providers).catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);
