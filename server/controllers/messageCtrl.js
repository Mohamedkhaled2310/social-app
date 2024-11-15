// const Message = require('../models/MessageModel'); 
// const Conversation = require('..//models//conversation'); 



//     const createMessage = async (req, res) => {
//     try {
//         const { recipient, chat } = req.body;
//        console.log(req.user.id)

//         if (!recipient || !chat.trim()) {
//             return res.status(400).json({ message: 'message can not ba empty' });
//           }

//           const newConversation = await Conversation.findOneAndUpdate(
//             {
//               $or: [
//                 { recipients: [req.user.id, recipient] },
//                 { recipients: [recipient, req.user.id] },
//               ],
//             },
//             {
//               recipients: [req.user.id, recipient],
//               chat,
//             },
//             {
//               new: true,
//               upsert: true, 
//             }
//           );




//           const newMessage = new Message({
//             conversation: newConversation._id,
//             sender: req.user.id,
//             recipient,
//             chat,
//           });

//       await newMessage.save();

    
//       res.status(201).json(newConversation);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

  
//   const getConversations = async (req, res) => {
//     try {
//         const conversations = await Conversation.find({
//           recipients: req.user.id,
//         })  
        
//         .sort('-updatedAt') 
//         .populate('recipients', 'name')
//         .populate('message')
        
//         res.json({
//             conversations,
//             result: conversations.length,
//           });
//         } catch (error) {
//           return res.status(500).json({ message: error.message });
//         }
//       }
    
//       const getMessages = async (req, res) => {
//         try {
//           const messages = await Message.find({
//             $or: [
//               { sender: req.user.id, recipient: req.params._id },
//               { sender: req.params.id, recipient: req.user.id },
//             ],
//           })
//             .sort('createdAt')
//             .populate('sender', 'name')
//             .populate('recipient', 'name');
    
//           res.json({
//             messages,
//             result: messages.length,
//           });
//         } catch (error) {
//           return res.status(500).json({ message: error.message });
//         }
//       }
//       const deleteMessage = async (req, res) => {
//         try {
//           const deletedMessage = await Message.findOneAndDelete({
//             _id: req.params.id,
//             sender: req.user.id,
//           });
    
//           if (!deletedMessage) {
//             return res.status(404).json({ message: 'the mesaage not found' });
//           }
    
//           res.json({ message: 'deleted Done' });
//         } catch (error) {
//           return res.status(500).json({ message: error.message });
//         }
//       };


  


//     module.exports = {
//         createMessage,
//         getConversations,
//         getMessages,
//         deleteMessage,
//       };
const Message = require('../models/MessageModel');


const sendMessage = async (req, res) => {
    try {
        const { sender, receiver, text } = req.body;

        const message = new Message({
            sender: sender,
            receiver: receiver,
            text,
        
        });

        await message.save();
        res.status(200).json({ success: true, message });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


const getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json({ success: true, messages,lenght:messages.length });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
const deleteMessage = async (req, res) => {
  try {
      const { messageId } = req.params;

  
      const deletedMessage = await Message.findByIdAndDelete(messageId);

      
      if (!deletedMessage) {
          return res.status(404).json({ success: false, message: 'Message not found' });
      }

      res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
      res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { 
  sendMessage, 
  getMessages,
  deleteMessage  
};
