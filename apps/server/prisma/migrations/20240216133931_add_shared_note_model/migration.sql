-- CreateEnum
CREATE TYPE "SharedNoteRole" AS ENUM ('EDITOR', 'VIEWER');

-- CreateTable
CREATE TABLE "shared_notes" (
    "id" TEXT NOT NULL,
    "note_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "permission" "SharedNoteRole" NOT NULL DEFAULT 'VIEWER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shared_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shared_notes" ADD CONSTRAINT "shared_notes_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_notes" ADD CONSTRAINT "shared_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
