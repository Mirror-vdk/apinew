export class ProductModel {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  credit: number;
  calculatedRating: number;
  description: string;
  advantages: string;
  disAdvantsges: string;
  categories: string[];
  tags: string;
  charasteristics: {
    [key: string]: string;
  };
}
