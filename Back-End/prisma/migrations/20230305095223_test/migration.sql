/*
  Warnings:

  - A unique constraint covering the columns `[chat_user_one]` on the table `chat_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chat_user_two]` on the table `chat_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `fk_user_one` ON `chat_user`(`chat_user_one`);

-- CreateIndex
CREATE UNIQUE INDEX `fk_user_two` ON `chat_user`(`chat_user_two`);
