import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .max(50, 'Slug must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  logo: z.any()
    .refine((file) => !file || (file instanceof File && file.type.startsWith('image/')), {
      message: 'Logo must be an image file',
    })
    .nullable(),
})

type FormValues = z.infer<typeof formSchema>

interface AddBoardModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; description?: string; logo: File | null; slug: string }) => void
}

export function AddBoardModal({ isOpen, onClose, onSubmit }: AddBoardModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      logo: null,
    }
  })

  // Watch the name field to auto-generate slug
  // const nameValue = watch('name')

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setValue('logo', file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const onFormSubmit = handleSubmit((data: any) => {
    console.log("data ", data)
    onSubmit(data)
    reset()
    setPreviewUrl(null)
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={onFormSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="logo">Board Logo</Label>
              <Card className={cn(
                "w-full h-40 flex items-center justify-center cursor-pointer",
                errors.logo && "border-red-500"
              )}>
                <CardContent>
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    {...register('logo')}
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <label htmlFor="logo" className="w-full h-full flex flex-col items-center justify-center">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <>
                        <ImagePlus className="w-12 h-12 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">Upload Logo</span>
                      </>
                    )}
                  </label>
                </CardContent>
              </Card>
              {errors.logo && (
                <span className="text-sm text-red-500">{errors.logo.message as string}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Board Name</Label>
              <Input
                id="name"
                {...register('name', {
                  onChange: (e) => {
                    const newSlug = e.target.value.toLowerCase().replace(/\s+/g, '-')
                    setValue('slug', newSlug, { shouldValidate: true })
                  }
                })}
                className={cn(errors.name && "border-red-500")}
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                className={cn(errors.description && "border-red-500")}
                placeholder="Enter board description..."
                rows={4}
              />
              {errors.description && (
                <span className="text-sm text-red-500">{errors.description.message}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Board Slug</Label>
              <Input
                id="slug"
                {...register('slug')}
                className={cn(errors.slug && "border-red-500")}
              />
              {errors.slug && (
                <span className="text-sm text-red-500">{errors.slug.message}</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Board</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}