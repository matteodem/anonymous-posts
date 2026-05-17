import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostApiService } from '../../services/post-api.service';
import { PostTokenService } from '../../services/post-token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent {
  isSubmitting = false;
  errorMessage = '';

  form!: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private postApi: PostApiService,
    private postTokenService: PostTokenService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      slug: ['', [Validators.maxLength(140)]],
      content: ['', [Validators.required]],
    });
  }

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const value = this.form.getRawValue();

    this.postApi
      .createPost({
        title: value.title ?? '',
        slug: value.slug || undefined,
        content: value.content ?? '',
      })
      .subscribe({
        next: (createdPost) => {
          this.postTokenService.saveToken(createdPost.slug, createdPost.secretToken);

          this.router.navigate(['/p', createdPost.slug]);
        },
        error: () => {
          this.errorMessage = 'Could not create post.';
          this.isSubmitting = false;
        },
      });
  }
}
