/*
  Warnings:

  - A unique constraint covering the columns `[chat_user_one,chat_user_two]` on the table `chat_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_custom_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `msg-user_reply` MODIFY `msg_status` INTEGER NOT NULL DEFAULT 0,
    MODIFY `msg_read` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `user_custom_id` VARCHAR(60) NULL,
    MODIFY `user_phone` VARCHAR(12) NULL;

-- CreateTable
CREATE TABLE `admin` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_username` VARCHAR(60) NOT NULL,
    `admin_password` VARCHAR(256) NOT NULL,
    `admin_email` VARCHAR(256) NOT NULL,
    `admin_phone` VARCHAR(12) NULL,
    `admin_name` TINYTEXT NOT NULL,
    `admin_profile_img` VARCHAR(256) NOT NULL DEFAULT 'user_default.png',
    `admin_cover_img` VARCHAR(256) NOT NULL DEFAULT 'user_default.png',
    `admin_role` ENUM('CUSTOMER_SERVICE', 'ADMIN', 'GENERAL_MANAGER') NOT NULL DEFAULT 'CUSTOMER_SERVICE',

    UNIQUE INDEX `admin_username`(`admin_username`),
    UNIQUE INDEX `admin_email`(`admin_email`),
    UNIQUE INDEX `admin_phone`(`admin_phone`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `chat_user_chat_user_one_chat_user_two_key` ON `chat_user`(`chat_user_one`, `chat_user_two`);

-- CreateIndex
CREATE UNIQUE INDEX `user_custom_id` ON `user`(`user_custom_id`);

-- RenameIndex
ALTER TABLE `friends_relationship` RENAME INDEX `fk_user_two1` TO `friends_relationship_fk_user_two_fkey`;
