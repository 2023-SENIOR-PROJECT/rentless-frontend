import { faker } from "@faker-js/faker";

export type Product = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  brand: string;
  price: number;
  countInStock: number;
  description: string;
  rating: number;
  numReviews: number;
};

export function generateMockData(): Product[] {
  const products: Product[] = [];

  for (let i = 0; i < 100; i++) {
    const product: Product = {
      _id: faker.string.uuid(),
      name: faker.commerce.product(),
      slug: faker.number.int(100).toString(),
      image: faker.image.url(),
      category: faker.commerce.department(),
      brand: faker.company.name(),
      price: parseFloat(faker.commerce.price({ min: 100, max: 700, dec: 0 })),
      countInStock: faker.number.int({ min: 0, max: 100 }),
      description: faker.commerce.productDescription(),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      numReviews: faker.number.int({ min: 0, max: 100 }),
    };

    products.push(product);
  }

  return products;
}