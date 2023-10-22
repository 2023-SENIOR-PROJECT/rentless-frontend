import { faker } from "@faker-js/faker";
import { Product } from "../types/Product";
import { ReviewDTO } from "../types/Review";

export function generateMockProducts(length: number = 50): Product[] {
  const products: Product[] = [];

  for (let i = 0; i < length; i++) {
    const product: Product = {
      id: faker.string.uuid(),
      name: faker.commerce.product(),
      slug: faker.number.int(100).toString(),
      image: faker.image.url(),
      category: faker.commerce.department(),
      brand: faker.company.name(),
      owner: faker.person.firstName(),
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

export function generateMockReviews(length: number = 50): ReviewDTO[] {
  const reviews: ReviewDTO[] = [];

  for (let i = 0; i < length; i++) {
    const review: ReviewDTO = {
      id: faker.number.int({ min: 0, max: 100 }),
      title: faker.lorem.sentence(),
      comment: faker.lorem.paragraph(),
      name: faker.name.firstName(),
      rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
      createdAt: faker.date.past(),
    };

    reviews.push(review);
  }

  return reviews;
}
