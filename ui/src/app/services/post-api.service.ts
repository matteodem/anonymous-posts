import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreatePostRequest,
  CreatePostResponse,
  Post,
  UpdatePostRequest,
} from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  private readonly apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  createPost(request: CreatePostRequest): Observable<CreatePostResponse> {
    return this.http.post<CreatePostResponse>(this.apiUrl, request);
  }

  getPost(slug: string, token?: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${slug}`, {
      headers: this.createTokenHeaders(token),
    });
  }

  updatePost(slug: string, request: UpdatePostRequest, token: string): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${slug}`, request, {
      headers: this.createTokenHeaders(token),
    });
  }

  deletePost(slug: string, token: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${slug}`, {
      headers: this.createTokenHeaders(token),
    });
  }

  private createTokenHeaders(token?: string | null): HttpHeaders {
    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'X-Post-Token': token,
    });
  }
}
