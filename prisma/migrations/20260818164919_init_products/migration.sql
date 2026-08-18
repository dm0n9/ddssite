-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "ex" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "shortDesc" JSONB NOT NULL,
    "applications" JSONB NOT NULL,
    "specifications" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "additionalImages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ishidden"

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
