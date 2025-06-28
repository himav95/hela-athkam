'use strict';

module.exports = {
    async up(queryInterface) {
        await queryInterface.sequelize.query(`
      /* 1. Create enum type if missing */
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_users_role') THEN
          CREATE TYPE "enum_users_role" AS ENUM('user', 'admin');
        END IF;
      END$$;
      
      /* 2. Add temporary column */
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role_new" "enum_users_role" DEFAULT 'user';
      
      /* 3. Convert existing values safely */
      UPDATE "users" SET "role_new" = 
        CASE 
          WHEN "role" = 'admin' THEN 'admin'::"enum_users_role"
          ELSE 'user'::"enum_users_role" 
        END;
      
      /* 4. Drop old column */
      ALTER TABLE "users" DROP COLUMN "role";
      
      /* 5. Rename new column */
      ALTER TABLE "users" RENAME COLUMN "role_new" TO "role";
    `);
    },

    async down(queryInterface) {
        /* Reversal uses same safe approach */
        await queryInterface.sequelize.query(`
      ALTER TABLE "users" ADD COLUMN "role_old" TEXT;
      UPDATE "users" SET "role_old" = "role"::text;
      ALTER TABLE "users" DROP COLUMN "role";
      ALTER TABLE "users" RENAME COLUMN "role_old" TO "role";
      DROP TYPE IF EXISTS "enum_users_role";
    `);
    }
};