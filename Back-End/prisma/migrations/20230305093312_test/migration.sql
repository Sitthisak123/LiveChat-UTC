/*
  Warnings:

  - The primary key for the `friends_relationship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `relation_id` on the `friends_relationship` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `friends_relationship` DROP FOREIGN KEY `fk_user_one1`;

-- DropForeignKey
ALTER TABLE `friends_relationship` DROP FOREIGN KEY `fk_user_two1`;

-- AlterTable
ALTER TABLE `friends_relationship` DROP PRIMARY KEY,
    DROP COLUMN `relation_id`,
    ADD PRIMARY KEY (`fk_user_one`, `fk_user_two`);

-- AddForeignKey
ALTER TABLE `friends_relationship` ADD CONSTRAINT `friends_relationship_fk_user_one_fkey` FOREIGN KEY (`fk_user_one`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friends_relationship` ADD CONSTRAINT `friends_relationship_fk_user_two_fkey` FOREIGN KEY (`fk_user_two`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
