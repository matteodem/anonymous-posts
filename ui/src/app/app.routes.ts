import { Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';

export const routes: Routes = [
  {
    path: '',
    component: CreatePostComponent,
  },
  {
    path: 'p/:slug',
    component: ViewPostComponent,
  },
  {
    path: 'p/:slug/edit',
    component: EditPostComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
