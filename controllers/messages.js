const User = require('../models/user')
const Message = require('../models/message')
const Conversation = require('../models/conversation')

exports.store = (req, res, err) => {
    Conversation.find({
        $or: [{
            participants: {
                $elemMatch: {
                    senderId: req.params.senderId,
                    receiverId: req.params.receiverId
                }
            }
        }, {
            participants: {
                $elemMatch: {
                    senderId: req.params.receiverId,
                    receiverId: req.params.senderId
                }
            }
        }]
    }, async (err, result) => {
        if (result.length > 0) {

        } else {
            const convo = new Conversation()
            convo.participants.push({
                senderId: req.user._id,
                receiverId: req.params.receiverId
            })

            const saveConvo = await convo.save()

            const message = new Message()
            message.conversationId = saveConvo._id
            message.sender = req.user.username
            message.receiver = req.body.receiverName
            message.messages.push({
                senderId: req.user._id,
                receiverId: req.params.receiverId,
                senderName: req.user.username,
                receiverName: req.body.receiverName,
                body: req.body.message
            })
            await message.save()
                .then(() => {
                    return res.status(201).json({
                        message: 'Message sent.'
                    })
                })
                .catch(() => {
                    return res.statis(422).json({
                        message: 'Could not send message.'
                    })
                })
        }
    })
}