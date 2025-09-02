'use server'

import { generateProductDescription, type ProductDescriptionInput } from '@/ai/flows/product-description-generator'
import { z } from 'zod'

const schema = z.object({
  productName: z.string().min(1, "Product name is required."),
  productCategory: z.string().min(1, "Product category is required."),
  keyFeatures: z.string().min(1, "Key features are required."),
  targetAudience: z.string().min(1, "Target audience is required."),
  tone: z.string().min(1, "Tone is required."),
})

export async function createProductDescription(formData: FormData) {
  try {
    const parsed = schema.parse({
      productName: formData.get('productName'),
      productCategory: formData.get('productCategory'),
      keyFeatures: formData.get('keyFeatures'),
      targetAudience: formData.get('targetAudience'),
      tone: formData.get('tone'),
    })

    const input: ProductDescriptionInput = {
      ...parsed,
      keyFeatures: parsed.keyFeatures.split('\n').filter(s => s.trim()),
    }
    
    const result = await generateProductDescription(input)
    return { success: true, description: result.description }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors.map(e => e.message).join(', ') }
    }
    return { success: false, error: 'Failed to generate description. Please try again.' }
  }
}
