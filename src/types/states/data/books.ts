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
    readonly limit: number;
    readonly totalCounts: number;
    readonly currentPage: number;
  };
}

export default Books;
