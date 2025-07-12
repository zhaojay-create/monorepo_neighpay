/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Merchant_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_phone_key" ON "Merchant"("phone");
