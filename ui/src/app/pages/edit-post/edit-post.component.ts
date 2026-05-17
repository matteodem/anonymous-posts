import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostApiService } from '../../services/post-api.service';
import { PostTokenService } from '../../services/post-token.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-post.component.html',
})
export class EditPostComponent implements OnInit {
  slug = '';
  token: string | null = null;

  isLoading = true;
  isSubmitting = false;
  isDeleting = false;
  errorMessage = '';

  form!: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postApi: PostApiService,
    private postTokenService: PostTokenService,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.errorMessage = 'Invalid post URL.';
      this.isLoading = false;
      return;
    }

    this.slug = slug;
    this.token = this.postTokenService.getToken(slug);

    if (!this.token) {
      this.errorMessage = 'You do not have permission to edit this post.';
      this.isLoading = false;
      return;
    }

    this.postApi.getPost(slug, this.token).subscribe({
      next: (post) => {
        this.form.patchValue({
          title: post.title,
          content: post.content,
        });

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Post not found.';
        } else if (error.status === 403) {
          this.errorMessage = 'You do not have permission to edit this post.';
        } else {
          this.errorMessage = 'Could not load post.';
        }

        this.isLoading = false;
      },
    });
  }

  submit(): void {
    if (this.form.invalid || this.isSubmitting || !this.token) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const value = this.form.getRawValue();

    this.postApi
      .updatePost(
        this.slug,
        {
          title: value.title ?? '',
          content: value.content ?? '',
        },
        this.token,
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/p', this.slug]);
        },
        error: (error) => {
          if (error.status === 403) {
            this.errorMessage = 'Invalid secret token.';
          } else {
            this.errorMessage = 'Could not update post.';
          }

          this.isSubmitting = false;
        },
      });
  }

  deletePost(): void {
    if (!this.token || this.isDeleting) {
      return;
    }

    const confirmed = confirm('Delete this post permanently?');

    if (!confirmed) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';

    this.postApi.deletePost(this.slug, this.token).subscribe({
      next: () => {
        this.postTokenService.removeToken(this.slug);
        this.router.navigate(['/']);
      },
      error: (error) => {
        if (error.status === 403) {
          this.errorMessage = 'Invalid secret token.';
        } else {
          this.errorMessage = 'Could not delete post.';
        }

        this.isDeleting = false;
      },
    });
  }
}
