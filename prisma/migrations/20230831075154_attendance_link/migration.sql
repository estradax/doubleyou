-- CreateTable
CREATE TABLE "attendance_links" (
    "id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,

    CONSTRAINT "attendance_links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attendance_links" ADD CONSTRAINT "attendance_links_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
