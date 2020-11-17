import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent} from './author/author.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [AuthorComponent, PostComponent],
  imports: [CommonModule, AuthorRoutingModule, MaterialModule],
  providers: [],
})
export class AuthorModule {}
