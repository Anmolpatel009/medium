// src/app/actions.ts
'use server';

import { recommendServices } from "@/ai/flows/smart-service-recommender";
import type { RecommendServicesInput as FlowInput, RecommendServicesOutput as FlowOutput } from "@/ai/flows/smart-service-recommender";

// Re-exporting the types here to be used in client components safely.
export type { FlowInput as RecommendServicesInput, FlowOutput as RecommendServicesOutput };


export async function recommendServicesAction(input: FlowInput): Promise<FlowOutput> {
    return await recommendServices(input);
}
