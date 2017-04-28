import { FavoritesComponent } from './favorites.component';

export const routes = [
  { path: '', children: [
        { path: '', component: FavoritesComponent },
    //{ path: 'child-detail', loadChildren: './+child-detail#ChildDetailModule' }
  ]},
];
