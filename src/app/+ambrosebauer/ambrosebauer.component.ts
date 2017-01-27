import {
  Component,
  OnInit,
} from '@angular/core';

import { Http, Response, Headers, ResponseOptions } from '@angular/http';

import { AmbrosebauerProvider } from './ambrosebauer.provider';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
  selector: 'ambrosebauer',
  template: `
    <h1>Hello from Detail</h1>
    <span>
      <a [routerLink]=" ['./child-detail'] ">
        Child Detail
      </a>
    </span>
<div [(ngModel)]="model" ngbRadioGroup name="radioBasic">
  <label class="btn btn-primary">
    <input type="radio" [value]="1"> Left (pre-checked)
  </label>
  <label class="btn btn-primary">
    <input type="radio" value="middle"> Middle
  </label>
  <label class="btn btn-primary">
    <input type="radio" [value]="false"> Right
  </label>
</div>
<hr>

<ngb-accordion #acc="ngbAccordion" activeIds="ngb-panel-0">
  <ngb-panel title="Simple">
    <template ngbPanelContent>
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia
      aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
      sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,
      craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
      occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
      labore sustainable VHS.
    </template>
  </ngb-panel>
  <ngb-panel>
    <template ngbPanelTitle>
      <span>&#9733; <b>Fancy</b> title &#9733;</span>
    </template>
    <template ngbPanelContent>
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia
      aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
      sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,
      craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
      occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
      labore sustainable VHS.
    </template>
  </ngb-panel>
  <ngb-panel title="Disabled" [disabled]="true">
    <template ngbPanelContent>
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia
      aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
      sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,
      craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
      occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
      labore sustainable VHS.
    </template>
  </ngb-panel>
</ngb-accordion>
<pre>{{model}}</pre>
    <router-outlet></router-outlet>
  `,
})
export class AmbrosebauerComponent implements OnInit {

    public model: number = 1;

    constructor(private http: Http) {

    }

    public ngOnInit() {

        
        let headers = new Headers({ 'Content-Type': 'text/html; charset=UTF-8' });
        let options = new ResponseOptions({ headers: headers });
        /*
        this.http.get('//ambrosebauer.com/lotdetail.php?auction=264&lot=2',
            options).subscribe(data => {
                console.log(data);
            });
        */
        let ts: AmbrosebauerProvider = new AmbrosebauerProvider(this.http);
        ts.getAuctionItems().subscribe(data => {
            console.log(data)
        });
        
    }

}
