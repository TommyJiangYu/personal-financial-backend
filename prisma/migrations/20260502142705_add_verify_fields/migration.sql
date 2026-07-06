/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `verified_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified_by` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    ADD COLUMN `is_verify` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `verified_at` DATETIME(3) NOT NULL,
    ADD COLUMN `verified_by` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
