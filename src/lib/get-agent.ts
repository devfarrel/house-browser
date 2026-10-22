import { agents } from "@/data/agents";
import type { Agent } from "@/types/listing";

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id === id);
}
