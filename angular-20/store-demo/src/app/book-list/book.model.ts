export interface BookModel {
  id: string;
  volumeInfo: {
    title: string;
    authors: Array<string>;
  };
}
