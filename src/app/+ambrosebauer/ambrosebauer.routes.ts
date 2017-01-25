import { AmbrosebauerComponent } from './ambrosebauer.component';

export const routes = [
  { path: '', children: [
        { path: '', component: AmbrosebauerComponent },
    //{ path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
