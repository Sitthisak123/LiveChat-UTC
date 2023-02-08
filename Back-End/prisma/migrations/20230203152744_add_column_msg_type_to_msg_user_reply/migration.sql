-- AlterTable
ALTER TABLE `msg-user_reply` ADD COLUMN `msg_type` ENUM('TEXT', 'IMAGE', 'AUDIO', 'VIDEO', 'PDF', 'FILE') NOT NULL DEFAULT 'TEXT';
