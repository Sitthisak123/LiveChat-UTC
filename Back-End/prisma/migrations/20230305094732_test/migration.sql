/*
  Warnings:

  - A unique constraint covering the columns `[user_username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `user_username` ON `user`;

-- CreateIndex
CREATE UNIQUE INDEX `user_username` ON `user`(`user_username`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email` ON `user`(`user_email`);

-- CreateIndex
CREATE UNIQUE INDEX `user_phone` ON `user`(`user_phone`);
