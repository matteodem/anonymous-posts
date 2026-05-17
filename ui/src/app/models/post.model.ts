export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  owner: boolean;
}

export interface CreatePostRequest {
  title: string;
  slug?: string;
  content: string;
}

export interface CreatePostResponse {
  title: string;
  slug: string;
  content: string;
  secretToken: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}
