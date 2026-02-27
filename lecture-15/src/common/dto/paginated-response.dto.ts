export class PaginatedResultDto<T> {
  public readonly data: T[];
  public readonly total: number;
  public readonly page: number;
  public readonly lastPage: number;
}
