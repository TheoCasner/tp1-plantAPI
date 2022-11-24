import { Plant, PrismaClient } from '@prisma/client';

import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();

async function getJsonSeedFile(filePath: string): Promise<Plant[]> {
  try {
    return await JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (error) {
    throw new Error('Error while reading file ! -- try providing full path');
  }
}

function setupDb(): void {
  console.log('Running Migrations...');
  execSync('npx prisma migrate dev', { stdio: 'inherit' });

  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('Prisma generated !');
}

async function seedPlantsDb(plantsFromJson: Plant[]): Promise<void> {
  const plants = await prisma.plant.findMany();
  if (plants.length === 0) {
    console.log('Seeding Plants...');

    plantsFromJson.map(async (p) => {
      const data = {
        id: p.id,
        name: p.name,
        secondName: p.secondName,
        imageURL: p.imageURL,
      };
      await prisma.plant.create({ data });
    });
  } else {
    console.log('Plants already seeded, updating database plants...');

    // if plant in db not in json
    for (const p of plants) {
      const plantInJson = plantsFromJson.find((plant) => plant.id === p.id);
      if (!plantInJson) {
        await prisma.plant.update({
          where: { id: p.id },
          data: {
            deleted: true,
          },
        });
      }
    }

    // update plants in db from json
    for (const p of plantsFromJson) {
      const plant = await prisma.plant.findUnique({
        where: { id: p.id },
      });
      if (!plant) {
        await prisma.plant.create({
          data: {
            id: p.id,
            name: p.name,
            secondName: p.secondName,
            imageURL: p.imageURL,
          },
        });
      } else {
        await prisma.plant.update({
          where: { id: p.id },
          data: {
            name: p.name,
            secondName: p.secondName,
            imageURL: p.imageURL,
            deleted: false,
          },
        });
      }
    }
  }

  console.log('Finished seeding !');
}

async function main(args: any): Promise<void> {
  if (args.length <= 2) throw new Error('No file path provided !');

  const plantsFromJson = await getJsonSeedFile(args[2]);
  await setupDb();
  await seedPlantsDb(plantsFromJson);
  await prisma.$disconnect();
}

main(process.argv);
