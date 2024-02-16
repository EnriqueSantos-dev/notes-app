-- CreateTable
CREATE TABLE "limits" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "note_count" INTEGER NOT NULL,
    "notebook_count" INTEGER NOT NULL,
    "tag_count" INTEGER NOT NULL,
    "shared_note_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "limits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "limits_user_id_key" ON "limits"("user_id");

-- AddForeignKey
ALTER TABLE "limits" ADD CONSTRAINT "limits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
