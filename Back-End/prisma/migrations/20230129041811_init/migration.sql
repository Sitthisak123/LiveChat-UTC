-- CreateTable
CREATE TABLE `chat_user` (
    `chat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `chat_user_one` INTEGER NOT NULL,
    `chat_user_two` INTEGER NOT NULL,
    `chat_createTime` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_user_one`(`chat_user_one`),
    INDEX `fk_user_two`(`chat_user_two`),
    PRIMARY KEY (`chat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `friends_relationship` (
    `relation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_user_one` INTEGER NOT NULL,
    `fk_user_two` INTEGER NOT NULL,
    `relation_status` INTEGER NOT NULL,
    `relation_createTime` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_user_one1`(`fk_user_one`),
    INDEX `fk_user_two1`(`fk_user_two`),
    PRIMARY KEY (`relation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `msg-user_reply` (
    `msg_reply_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_chat_id` INTEGER NOT NULL,
    `fk_user_owner` INTEGER NOT NULL,
    `msg_reply_message` TEXT NOT NULL,
    `msg_createTime` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `msg_status` INTEGER NOT NULL,
    `msg_read` INTEGER NOT NULL,

    INDEX `fk_chat_id`(`fk_chat_id`),
    INDEX `fk_user_one_chat`(`fk_user_owner`),
    PRIMARY KEY (`msg_reply_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `google_id` INTEGER NULL,
    `user_username` VARCHAR(60) NOT NULL,
    `user_password` VARCHAR(256) NOT NULL,
    `user_email` VARCHAR(256) NOT NULL,
    `user_phone` VARCHAR(12) NOT NULL,
    `user_name` TINYTEXT NOT NULL,
    `user_profile_img` VARCHAR(256) NOT NULL DEFAULT 'user_default.png',

    UNIQUE INDEX `google_id`(`google_id`),
    UNIQUE INDEX `user_username`(`user_username`, `user_email`, `user_phone`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chat_user` ADD CONSTRAINT `fk_user_one` FOREIGN KEY (`chat_user_one`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_user` ADD CONSTRAINT `fk_user_two` FOREIGN KEY (`chat_user_two`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friends_relationship` ADD CONSTRAINT `fk_user_one1` FOREIGN KEY (`fk_user_one`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friends_relationship` ADD CONSTRAINT `fk_user_two1` FOREIGN KEY (`fk_user_two`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `msg-user_reply` ADD CONSTRAINT `fk_chat_id` FOREIGN KEY (`fk_chat_id`) REFERENCES `chat_user`(`chat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `msg-user_reply` ADD CONSTRAINT `fk_user_one_chat` FOREIGN KEY (`fk_user_owner`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
