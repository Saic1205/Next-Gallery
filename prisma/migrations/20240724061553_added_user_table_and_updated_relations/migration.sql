/*
  Warnings:

  - A unique constraint covering the columns `[albumName,userId]` on the table `AlbumList` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AlbumList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `album` DROP FOREIGN KEY `Album_albumListId_fkey`;

-- DropIndex
DROP INDEX `AlbumList_albumName_key` ON `albumlist`;

-- AlterTable
ALTER TABLE `albumlist` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(500) NOT NULL,
    `profilePic` VARCHAR(500) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `AlbumList_albumName_userId_key` ON `AlbumList`(`albumName`, `userId`);

-- AddForeignKey
ALTER TABLE `AlbumList` ADD CONSTRAINT `AlbumList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_albumListId_fkey` FOREIGN KEY (`albumListId`) REFERENCES `AlbumList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
