const asyncHandler = require("express-async-handler");

const messageModel = require("../models/messageModel");

exports.createMessage = asyncHandler(async (req, res, next) => {
  const { recipientEmail, title, body, scheduledAt } = req.body;
  const userId = req.user.id;
  const result = await messageModel.createMessage(
    userId,
    recipientEmail,
    title,
    body,
    scheduledAt
  );
  res.status(201).json({
    status: "success",
    data: {
      id: result.id,
      recipientEmail: result.recipient_email,
      title: result.title,
      body: result.body,
      scheduledAt: result.scheduled_at,
      status: result.status,
      createdAt: result.created_at,
    },
  });
});

exports.getMyMessages = asyncHandler(async (req, res, next) => {
  const result = await messageModel.getMessagesByUser(req.user.id);
  res.status(200).json({
    status: "success",
    length: result.length,
    data: result,
  });
});

exports.getPendingMessages = async () => {
  const result = await messageModel.getPendingMessages();
  return result;
};

exports.updateMessageStatus = async (id, status, sentAt = null) => {
  const result = await messageModel.updateMessageStatus(id, status, sentAt);
  return result;
};
