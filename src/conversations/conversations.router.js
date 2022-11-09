const router = require("express").Router();
const passport = require("passport");
const conversationServices = require("./conversations.services");

// /conversations

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    conversationServices.getAllConversations
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    conversationServices.postConversation
  );

// /conversations/:conversation_id
router
  .route("/:conversation_id")
  .get(
    passport.authenticate("jwt", { session: false }),
    conversationServices.getConversationsById
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    conversationServices.deleteConversationById
  )
  .patch(
    passport.authenticate("jwt", { session: false }),
    conversationServices.patchConversationById
  );

// /conversations/:conversation_id/messages
router
  .route("/:conversation_id/messages")
  .get(
    passport.authenticate("jwt", { session: false }),
    conversationServices.getAllMessagesFromConversationId
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    conversationServices.createMessage
  );

// /conversations/:conversation_id/messages/:message_id
router
  .route("/:conversation_id/messages/:message_id")
  .get(
    passport.authenticate("jwt", { session: false }),
    conversationServices.getMessageById
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    conversationServices.deleteMessage
  );

// /conversations/:conversation_id/participants
// router.route("/:conversation_id/participants").get().post();

// /conversations/:conversation_id/participants/:participant_id
// router.route("/:conversation_id/participants/:participant_id").get().delete();


module.exports = router