import { TandemComponent } from './tandem.component';

export const routes = [
  { path: '', children: [
        { path: '', component: TandemComponent },
    //{ path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
