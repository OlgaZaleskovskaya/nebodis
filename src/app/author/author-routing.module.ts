import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthorComponent } from'./author/author.component';
import { PostComponent } from './post/post.component';




const routes: Routes = [
  {
    path: '',
    component: AuthorComponent,
  },
  {
    path: 'post',
    component: PostComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
