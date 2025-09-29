/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    name: {
      type: "varchar(30)",
      notNull: true,
    },
    email: {
      type: "varchar(50)",
      notNull: true,
      unique: true,
    },
    password: { type: "text", notNull: true },
    password_changed_at: {
      type: "timestamp with time zone",
      default: pgm.func("now()"),
      notNull: true,
    },
    password_reset_token: "text",
    password_reset_expires: "timestamp with time zone",
    created_at: {
      type: "timestamp with time zone",
      default: pgm.func("now()"),
      notNull: true,
    },
  });

  pgm.createTable("messages", {
    id: "id",
    user_id: {
      type: "integer",
      references: "users",
      onDelete: "CASCADE",
    },
    recipient_email: {
      type: "text",
      notNull: true,
    },
    title: {
      type: "text",
      notNull: true,
    },
    body: {
      type: "text",
      notNull: true,
    },
    scheduled_at: {
      type: "timestamp with time zone",
      notNull: true,
    },
    status: {
      type: "varchar(15)",
      notNull: true,
      default: "pending",
    },
    created_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("now()"),
    },
    sent_at: {
      type: "timestamp with time zone",
    },
  });

  pgm.createIndex("messages", ["status", "scheduled_at"]);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("messages");
  pgm.dropTable("users");
};
