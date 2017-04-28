import { LionelPWComponent} from './lionelpw.component';

export const routes = [
  { path: '', children: [
        { path: '', component: LionelPWComponent },
    //{ path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
