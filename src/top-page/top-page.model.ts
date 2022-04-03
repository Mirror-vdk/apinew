export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Product,
}

export class TopPageModel {
  _id: string;
  firstCategory: TopLevelCategory;
  secondCategory: string;
  title: string;
  category: string;
  hh?: {
    count: number;
    juniorSalery: number;
    middleSalery: number;
    seniorSalery: number;
  };
  advantages: {
    title: string;
    description: string;
  }[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
