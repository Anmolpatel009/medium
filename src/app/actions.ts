// src/app/actions.ts
'use server';

import { recommendServices, RecommendServicesInput, RecommendServicesOutput } from "@/ai/flows/smart-service-recommender";

export async function recommendServicesAction(input: RecommendServicesInput): Promise<RecommendServicesOutput> {
    return await recommendServices(input);
}
