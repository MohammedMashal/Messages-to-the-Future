const cron = require("node-cron");
const Email = require("./src/utils/email");
const {
  getPendingMessages,
  updateMessageStatus,
} = require("./src/controllers/messageController");

const sendingPendingMessagesTask = async () => {
  const messages = await getPendingMessages();

  if (messages.length === 0) return;

  // Array of promises
  const sendPromises = messages.map((message) =>
    (async () => {
      try {
        await new Email().sendMessage(
          message.recipient_email,
          message.title,
          message.body
        );

        await updateMessageStatus(message.id, "sent", new Date());
        console.log(`Message ${message.id} sent to ${message.recipient_email}`);
      } catch (err) {
        console.error(`Failed to send message ${message.id}:`, err.message);
        await updateMessageStatus(message.id, "failed");
      }
    })()
  );

  // Execute all promises concurrently
  await Promise.allSettled(sendPromises);
};

cron.schedule("* * * * *", sendingPendingMessagesTask);
