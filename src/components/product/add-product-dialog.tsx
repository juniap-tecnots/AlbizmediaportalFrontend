"use client"

import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Copy, PlusCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createProductDescription } from "@/app/(main)/products/actions"

const formSchema = z.object({
  productName: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  productCategory: z.string().min(1, { message: "Please select a category." }),
  keyFeatures: z.string().min(10, { message: "Please list some key features." }),
  targetAudience: z.string().min(1, { message: "Please select a target audience." }),
  tone: z.string().min(1, { message: "Please select a tone." }),
})

const initialState = {
  description: "",
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : 'Generate Description'}
    </Button>
  );
}

export function AddProductDialog() {
  const [open, setOpen] = useState(false)
  const [formState, formAction] = useFormState(createProductDescription, initialState);
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productCategory: "",
      keyFeatures: "",
      targetAudience: "",
      tone: "",
    },
  });
  
  const handleCopy = () => {
    navigator.clipboard.writeText(description);
    toast({
      title: "Copied!",
      description: "Product description copied to clipboard.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><PlusCircle className="mr-2" /> Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <form action={async (formData) => {
          const result = await createProductDescription(formData);
          if (result.success && result.description) {
            setDescription(result.description);
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: result.error || "Failed to generate description.",
            })
          }
        }}>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new product. You can use our AI to generate a compelling description.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">Product Name</Label>
              <Input id="productName" name="productName" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productCategory" className="text-right">Category</Label>
              <Select name="productCategory">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home-goods">Home Goods</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="keyFeatures" className="text-right pt-2">Key Features</Label>
              <Textarea id="keyFeatures" name="keyFeatures" className="col-span-3" placeholder="Enter each feature on a new line." />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="targetAudience" className="text-right">Target Audience</Label>
              <Select name="targetAudience">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select an audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="young-adults">Young Adults</SelectItem>
                  <SelectItem value="professionals">Professionals</SelectItem>
                  <SelectItem value="parents">Parents</SelectItem>
                  <SelectItem value="tech-enthusiasts">Tech Enthusiasts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tone" className="text-right">Tone</Label>
              <Select name="tone">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {description && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Generated Description</Label>
                <div className="col-span-3 relative">
                  <Textarea value={description} readOnly className="pr-10" rows={6} />
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <SubmitButton />
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
