/*
  Warnings:

  - Added the required column `hari` to the `Kelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jamMulai` to the `Kelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jamSelesai` to the `Kelas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kelas` ADD COLUMN `hari` VARCHAR(191) NOT NULL,
    ADD COLUMN `jamMulai` VARCHAR(191) NOT NULL,
    ADD COLUMN `jamSelesai` VARCHAR(191) NOT NULL;
