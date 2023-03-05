const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const verify_TOKEN = require('../../middleware/Auth.js');


router.put('/update/name', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { newName } = req.body;
    try {
        const updatename = await prisma.user.update({
            where: {
                user_id: user_id
            },
            data: {
                user_name: newName
            }
        });
    } catch (err) {
        console.log(err);
    }
    res.send('Name has Changed');
});


router.put('/update/relations', verify_TOKEN, async (req, res) => {
    const { user_id } = req.user;
    const { newRelation, FriendID } = req.body;
    const RelationList = { block: 0, Friend: 1, Favorite: 2, Require: 3 };
    if (Object.values(RelationList).includes(newRelation)) {
        try {
            const update = await prisma.friends_relationship.updateMany({
                where: {
                    OR: [
                        {
                            fk_user_one: user_id,
                            fk_user_two: FriendID
                        },
                        {
                            fk_user_one: FriendID,
                            fk_user_two: user_id
                        }
                    ]
                },
                data: {
                    relation_status: newRelation
                }
            });

        } catch (err) {
            console.log(err);
        }


        res.status(200).send({ text: 'Update Status Success' });
    } else if (newRelation === -1) {
        try {
            const deleteRelation = await prisma.friends_relationship.deleteMany({
                where: {
                    OR: [
                        {
                            fk_user_one: user_id,
                            fk_user_two: FriendID
                        },
                        {
                            fk_user_one: FriendID,
                            fk_user_two: user_id
                        }
                    ]
                }
            });
            res.status(200).send({ text: 'Delete Status Success' });
            console.log(deleteRelation);
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(400).send({ text: 'Invalid relation status' });
    }

});

module.exports = router;