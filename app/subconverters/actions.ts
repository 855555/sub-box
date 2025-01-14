"use server"

import { revalidatePath } from "next/cache"
import { subconverterService } from "@/lib/services/subconverter-service"
import type { Subconverter } from "@/types"

export async function getSubconverters() {
  return subconverterService.getAll()
}

export async function createSubconverter(data: Omit<Subconverter, "id">) {
  const subconverter = await subconverterService.create(data)
  revalidatePath("/subconverters")
  return subconverter
}

export async function updateSubconverter(id: string, data: Omit<Subconverter, "id">) {
  const subconverter = await subconverterService.update(id, data)
  revalidatePath("/subconverters")
  return subconverter
}

export async function deleteSubconverter(id: string) {
  await subconverterService.delete(id)
  revalidatePath("/subconverters")
}

