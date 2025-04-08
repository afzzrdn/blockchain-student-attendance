// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.kelas.createMany({
    data: [
      {
        kode: '001',
        nama: 'Pemrograman Web',
        hari: 'Senin',
        jamMulai: '09:00',
        jamSelesai: '10:40',
      },
      {
        kode: '002',
        nama: 'Struktur Data',
        hari: 'Rabu',
        jamMulai: '10:00',
        jamSelesai: '11:40',
      },
    ],
  })

  console.log('✅ Data kelas berhasil ditambahkan.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
