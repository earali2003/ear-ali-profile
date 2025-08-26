import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, Link as LinkIcon, X } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
}

const ImageUpload = ({ value, onChange, onRemove }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false)
  const [externalUrl, setExternalUrl] = useState('')

  const uploadImage = async (file: File) => {
    try {
      setUploading(true)
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(fileName, file)

      if (error) {
        console.error('Upload error:', error)
        toast.error('Failed to upload image')
        return
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('article-images')
        .getPublicUrl(data.path)

      onChange(urlData.publicUrl)
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB')
        return
      }
      
      uploadImage(file)
    }
  }

  const handleExternalUrl = () => {
    if (externalUrl.trim()) {
      onChange(externalUrl.trim())
      setExternalUrl('')
      toast.success('Image URL added')
    }
  }

  return (
    <div className="space-y-4">
      <Label>Article Image</Label>
      
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Article preview"
            className="max-w-full h-auto max-h-64 rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!value && (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="url">External URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Upload an image file (max 5MB). Supported formats: JPG, PNG, GIF, WebP
              </p>
            </div>
            {uploading && (
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 animate-spin" />
                <span className="text-sm">Uploading...</span>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/image.jpg"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExternalUrl()}
              />
              <Button
                type="button"
                onClick={handleExternalUrl}
                disabled={!externalUrl.trim()}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Paste a direct link to an image
            </p>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default ImageUpload