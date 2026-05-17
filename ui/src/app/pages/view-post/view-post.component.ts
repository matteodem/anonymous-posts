import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { marked } from 'marked';
import { Post } from '../../models/post.model';
import { PostApiService } from '../../services/post-api.service';
import { PostTokenService } from '../../services/post-token.service';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-post.component.html',
})
export class ViewPostComponent implements OnInit {
  post: Post | null = null;
  htmlContent = '';
  isLoading = true;
  errorMessage = '';
  canEdit = false;

  constructor(
    private route: ActivatedRoute,
    private postApi: PostApiService,
    private postTokenService: PostTokenService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.errorMessage = 'Invalid post URL.';
      this.isLoading = false;
      return;
    }

    const token = this.postTokenService.getToken(slug);

    this.postApi.getPost(slug, token).subscribe({
      next: (post) => {
        this.post = post;
        this.canEdit = this.postTokenService.hasToken(post.slug);
        this.htmlContent = marked.parse(post.content) as string;
        this.isLoading = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Post not found.';
        } else {
          this.errorMessage = 'Could not load post.';
        }

        this.isLoading = false;

        this.cdr.detectChanges();
      },
    });
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href);
  }
}
