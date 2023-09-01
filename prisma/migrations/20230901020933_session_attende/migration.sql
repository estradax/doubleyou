-- CreateTable
CREATE TABLE "session_attendee" (
    "session_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "session_attendee_pkey" PRIMARY KEY ("session_id","user_id")
);

-- AddForeignKey
ALTER TABLE "session_attendee" ADD CONSTRAINT "session_attendee_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_attendee" ADD CONSTRAINT "session_attendee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
