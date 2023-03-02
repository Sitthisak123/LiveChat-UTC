/*
  Warnings:

  - You are about to drop the column `user_cover_img` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `user_cover_img`,
    ADD COLUMN `user_cover_img` VARCHAR(256) NOT NULL DEFAULT 'user_default.png';
