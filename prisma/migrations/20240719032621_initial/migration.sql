-- CreateTable
CREATE TABLE `AlbumList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `albumName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AlbumList_albumName_key`(`albumName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Album` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imgName` VARCHAR(191) NOT NULL,
    `imagePublicId` VARCHAR(300) NOT NULL,
    `imageUrl` VARCHAR(500) NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `albumListId` INTEGER NOT NULL,

    UNIQUE INDEX `Album_imagePublicId_key`(`imagePublicId`),
    UNIQUE INDEX `Album_imageUrl_key`(`imageUrl`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_albumListId_fkey` FOREIGN KEY (`albumListId`) REFERENCES `AlbumList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
