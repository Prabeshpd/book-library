interface Book {
  readonly id: string;
  readonly title: string;
  readonly imageUrl: string;
  readonly addedAt: string;
  readonly burrowedNumber: number;
  readonly description: string;
  readonly category: string;
}

interface Books {
  books: Book[];

  readonly meta: {
    readonly currentPage: number;
    // todo: rename to pageLimit
    readonly perPage: number;
    readonly totalCount: number;
  };
}

export default Books;
