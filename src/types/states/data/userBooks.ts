interface Book {
  readonly id: string;
  readonly title: string;
  readonly imageUrl: string;
  readonly addedAt: string;
  readonly burrowedNumber: number;
  readonly description: string;
  readonly category: string;
  readonly userBooks: { userId: string; bookId: string }[];
}

interface UserBook {
  book: Book;
  readonly userId: string;
  readonly id: string;
}

interface UserBooks {
  userBooks: UserBook[];
  readonly meta: {
    readonly limit: number;
    readonly totalCounts: number;
    readonly currentPage: number;
  };
}

export default UserBooks;
