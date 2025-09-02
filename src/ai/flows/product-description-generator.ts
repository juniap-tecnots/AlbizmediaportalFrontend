'use server';

/**
 * @fileOverview AI-powered product description generator.
 *
 * - generateProductDescription - A function that generates product descriptions.
 * - ProductDescriptionInput - The input type for the generateProductDescription function.
 * - ProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productCategory: z.string().describe('The category of the product (e.g., electronics, clothing, home goods).'),
  keyFeatures: z.array(z.string()).describe('An array of key features and benefits of the product.'),
  targetAudience: z.string().describe('The target audience for the product (e.g., young adults, professionals, parents).'),
  tone: z.string().describe('The desired tone of the description (e.g., professional, friendly, humorous).'),
});
export type ProductDescriptionInput = z.infer<typeof ProductDescriptionInputSchema>;

const ProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type ProductDescriptionOutput = z.infer<typeof ProductDescriptionOutputSchema>;

export async function generateProductDescription(input: ProductDescriptionInput): Promise<ProductDescriptionOutput> {
  return productDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productDescriptionPrompt',
  input: {schema: ProductDescriptionInputSchema},
  output: {schema: ProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in creating compelling product descriptions.

  Based on the following information, generate a product description that is engaging, informative, and tailored to the target audience.

  Product Name: {{{productName}}}
  Product Category: {{{productCategory}}}
  Key Features: {{#each keyFeatures}}{{{this}}}\n{{/each}}
  Target Audience: {{{targetAudience}}}
  Tone: {{{tone}}}

  Description:`,  
});

const productDescriptionFlow = ai.defineFlow(
  {
    name: 'productDescriptionFlow',
    inputSchema: ProductDescriptionInputSchema,
    outputSchema: ProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
