import { prisma } from "@/app/lib/db";
import { notFound } from "next/navigation";
import SystemClient from "./systemClient"; 

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {

  const resolvedParams = await params;
  
  const systemData = await prisma.system.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!systemData) {
    return notFound();
  }

  return <SystemClient systemData={systemData} />;
}