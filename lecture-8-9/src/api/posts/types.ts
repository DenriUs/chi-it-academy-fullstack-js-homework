export type CreatePostDto = {
  image: string;
  description: string;
};

export type PostsParams = {
  page: number;
  limit: number;
};
