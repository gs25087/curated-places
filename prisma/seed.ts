import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: posts
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const posts = [
  {
    id: 4,
    userId: '1KafE5d9uDbGQMlfroRLeYN5v303',
    image: 'https://res.cloudinary.com/dnns5oxof/image/upload/v1676748313/lmugxlprdyuqtnsr5bgk.jpg',
    latitude: 51.5082192,
    longitude: -0.0876934,
    address: 'London Bridge, London, Vereinigtes Königreich',

    title: 'Lorem ipsum',
    description: 'Lorem ipsum description',
    category: 1
  },
  {
    id: 5,
    userId: '1KafE5d9uDbGQMlfroRLeYN5v303',
    image: 'https://res.cloudinary.com/dnns5oxof/image/upload/v1676840729/lgcajaulzcqakju9s8o6.jpg',
    latitude: 52.54498299999999,
    longitude: 13.3684778,
    address: 'Julius, Gerichtstraße, Berlin, Deutschland',

    title: 'Lorem ipsum lorem',
    description: 'Lorem ipsum description',
    category: 2
  },
  {
    id: 6,
    userId: '1KafE5d9uDbGQMlfroRLeYN5v303',
    image: 'https://res.cloudinary.com/dnns5oxof/image/upload/v1676841151/h0sdvlv4bvciogan2yo2.jpg',
    latitude: 52.5288502,
    longitude: 13.4054007,
    address: 'lois, Linienstraße, Berlin, Deutschland',

    title: 'Lorem ipsum',
    description: 'Lorem ipsum another description',
    category: 5
  },
  {
    id: 7,
    userId: 'E8UtyIQz67NxRLLPNSnsQfLsl8S2',
    image: 'https://res.cloudinary.com/dnns5oxof/image/upload/v1676912019/btncvgtzflezwlgzvpz5.jpg',
    latitude: 52.5004054,
    longitude: 13.4334017,
    address: '10997 Berlin, Germany',

    title: 'Lorem ipsum',
    description: 'Lorem ipsum description',
    category: 4
  },
  {
    id: 8,
    userId: 'E8UtyIQz67NxRLLPNSnsQfLsl8S2',
    image: 'https://res.cloudinary.com/dnns5oxof/image/upload/v1676912023/jbusndfsaegzwdivkwmm.jpg',
    latitude: 52.5004054,
    longitude: 13.4334017,
    address: '10997 Berlin, Germany',

    title: 'Lorem ipsum',
    description: 'Lorem ipsum description',
    category: 3
  }
];
