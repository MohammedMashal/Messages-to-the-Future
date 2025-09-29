const express = require("express");

const messageController = require("../controllers/messageController");
const messageValidator = require("../utils/validation/messageValidator");
const { protect } = require("../middlewares/authMiddlware");

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messages to the future routes
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new scheduled message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipientEmail
 *               - title
 *               - body
 *               - scheduledAt
 *             properties:
 *               recipientEmail:
 *                 type: string
 *                 format: email
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               scheduledAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     recipientEmail:
 *                       type: string
 *                     title:
 *                       type: string
 *                     body:
 *                       type: string
 *                     scheduledAt:
 *                       type: string
 *                       format: date-time
 *                     status:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation error
 */
router
  .route("/")
  .post(
    messageValidator.createMessageValidator,
    messageController.createMessage
  )
  /**
   * @swagger
   * /messages:
   *   get:
   *     summary: Get all messages created by the logged-in user
   *     tags: [Messages]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of user's messages
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                 length:
   *                   type: integer
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                       recipientEmail:
   *                         type: string
   *                       title:
   *                         type: string
   *                       body:
   *                         type: string
   *                       scheduledAt:
   *                         type: string
   *                         format: date-time
   *                       status:
   *                         type: string
   *                       createdAt:
   *                         type: string
   *                         format: date-time
   */
  .get(messageController.getMyMessages);

module.exports = router;
