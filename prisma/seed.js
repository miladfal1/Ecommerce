const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.createMany({
    data: [{ name: "Electronics" }, { name: "Clothing" }],
  });

  const users = await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        phoneNumber: "9876543210",
      },
    ],
  });

  const products = await prisma.product.createMany({
    data: [
      { name: "Smartphone", categoryId: categories[0].id },
      { name: "Laptop", categoryId: categories[0].id },
      { name: "T-Shirt", categoryId: categories[1].id },
    ],
  });

  const productPrices = await prisma.productPrice.createMany({
    data: [
      {
        productId: products[0].id,
        sellerId: "SELLER_ID_1",
        price: 500,
        qty: 10,
      },
      {
        productId: products[1].id,
        sellerId: "SELLER_ID_2",
        price: 1000,
        qty: 5,
      },
    ],
  });
  const sellers = await prisma.seller.createMany({
    data: [
      {
        name: "Seller 1",
        email: "seller1@example.com",
        phoneNumber: "1234567890",
      },
      {
        name: "Seller 2",
        email: "seller2@example.com",
        phoneNumber: "9876543210",
      },
    ],
  });

  const baskets = await prisma.basket.createMany({
    data: [
      {
        productPriceId: productPrices[0].id,
        userId: users[0].id,
        qty: 3,
        status: "Pending",
        price: 150,
      },
      {
        productPriceId: productPrices[1].id,
        userId: users[1].id,
        qty: 2,
        status: "Pending",
        price: 200,
      },
    ],
  });

  const finalOrders = await prisma.finalOrders.createMany({
    data: [
      {
        addressId: addresses[0].id,
        transforFee: 20,
        userId: users[0].id,
        finalPrice: 170,
        discount: 5,
      },
      {
        addressId: addresses[1].id,
        transforFee: 25,
        userId: users[1].id,
        finalPrice: 220,
        discount: 10,
      },
    ],
  });

  console.log("Seed data has been created successfully.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
