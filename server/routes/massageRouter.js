const router = require('express').Router();
const {sendMessage,getMessages,deleteMessage}=require('../controllers/messageCtrl');

const { verifyToken }=require('../middleware/auth');

router.post('/send', verifyToken, sendMessage);
router.get('/:senderId/:receiverId', verifyToken, getMessages)
router.delete('/:messageId',verifyToken,deleteMessage)


module.exports=router;