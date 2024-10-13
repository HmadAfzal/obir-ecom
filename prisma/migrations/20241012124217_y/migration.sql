/*
  Warnings:

  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verifyCodeExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerified",
DROP COLUMN "verifyCode",
DROP COLUMN "verifyCodeExpiry";
