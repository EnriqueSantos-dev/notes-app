-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "cover" TEXT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "notebook_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
