import "server-only";

import crypto from "crypto";
import { eq } from "drizzle-orm";

import { type Node } from "@/types";
import db from "../db";
import { nodes } from "../db/schema";

class NodeService {
  async getAll(): Promise<Node[]> {
    return db.select().from(nodes);
  }

  async get(id: string): Promise<Node | null> {
    const results = await db.select().from(nodes).where(eq(nodes.id, id)).limit(1);
    return results[0] || null;
  }

  async create(data: Omit<Node, "id" | "createdAt" | "updatedAt">): Promise<Node> {
    const now = new Date().toISOString();
    const item = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };

    const results = await db.insert(nodes).values(item).returning();
    if (!results[0]) {
      throw new Error("Failed to create node");
    }
    return results[0];
  }

  async update(id: string, data: Partial<Omit<Node, "id" | "createdAt" | "updatedAt">>): Promise<Node> {
    const now = new Date().toISOString();
    const updateData = {
      ...data,
      updatedAt: now,
    };

    const results = await db.update(nodes).set(updateData).where(eq(nodes.id, id)).returning();

    if (!results[0]) {
      throw new Error(`Node with id ${id} not found`);
    }

    return results[0];
  }

  async delete(id: string): Promise<void> {
    await db.delete(nodes).where(eq(nodes.id, id));
  }
}

export const nodeService = new NodeService();
