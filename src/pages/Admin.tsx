import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Edit, Trash2, Eye, ArrowLeft } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import RichTextEditor from '@/components/RichTextEditor'
import ImageUpload from '@/components/ImageUpload'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Article {
  id: string
  title: string
  content: string
  image_url: string | null
  created_at: string
  is_published: boolean
}

const Admin = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    is_published: false
  })

  // Check if user is site owner
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          navigate('/')
          return
        }

        const { data, error } = await supabase.rpc('is_site_owner')
        if (error || !data) {
          toast.error('Access denied. Admin privileges required.')
          navigate('/')
          return
        }

        setIsAuthorized(true)
        fetchArticles()
      } catch (error) {
        console.error('Auth check error:', error)
        navigate('/')
      }
    }

    checkAuth()
  }, [navigate])

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching articles:', error)
        toast.error('Failed to fetch articles')
      } else {
        setArticles(data || [])
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      toast.error('Failed to fetch articles')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      image_url: '',
      is_published: false
    })
    setEditingArticle(null)
  }

  const openDialog = (article?: Article) => {
    if (article) {
      setEditingArticle(article)
      setFormData({
        title: article.title,
        content: article.content,
        image_url: article.image_url || '',
        is_published: article.is_published
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error('You must be logged in')
        return
      }

      const articleData = {
        title: formData.title.trim(),
        content: formData.content,
        image_url: formData.image_url || null,
        is_published: formData.is_published,
        author_id: user.id
      }

      if (editingArticle) {
        // Update existing article
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingArticle.id)

        if (error) {
          console.error('Update error:', error)
          toast.error('Failed to update article')
          return
        }

        toast.success('Article updated successfully')
      } else {
        // Create new article
        const { error } = await supabase
          .from('articles')
          .insert([articleData])

        if (error) {
          console.error('Create error:', error)
          toast.error('Failed to create article')
          return
        }

        toast.success('Article created successfully')
      }

      closeDialog()
      fetchArticles()
    } catch (error) {
      console.error('Submit error:', error)
      toast.error('Failed to save article')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Delete error:', error)
        toast.error('Failed to delete article')
        return
      }

      toast.success('Article deleted successfully')
      fetchArticles()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete article')
    }
  }

  const togglePublished = async (article: Article) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ is_published: !article.is_published })
        .eq('id', article.id)

      if (error) {
        console.error('Toggle error:', error)
        toast.error('Failed to update article status')
        return
      }

      toast.success(`Article ${!article.is_published ? 'published' : 'unpublished'}`)
      fetchArticles()
    } catch (error) {
      console.error('Toggle error:', error)
      toast.error('Failed to update article status')
    }
  }

  if (!isAuthorized) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your articles and content</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingArticle ? 'Edit Article' : 'Create New Article'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter article title..."
                    required
                  />
                </div>

                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  onRemove={() => setFormData({ ...formData, image_url: '' })}
                />

                <div>
                  <Label htmlFor="content">Content *</Label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(html) => setFormData({ ...formData, content: html })}
                    placeholder="Write your article content..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingArticle ? 'Update Article' : 'Create Article'}
                  </Button>
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Articles</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ArticleList
              articles={articles}
              loading={loading}
              onEdit={openDialog}
              onDelete={handleDelete}
              onTogglePublish={togglePublished}
            />
          </TabsContent>

          <TabsContent value="published">
            <ArticleList
              articles={articles.filter(a => a.is_published)}
              loading={loading}
              onEdit={openDialog}
              onDelete={handleDelete}
              onTogglePublish={togglePublished}
            />
          </TabsContent>

          <TabsContent value="draft">
            <ArticleList
              articles={articles.filter(a => !a.is_published)}
              loading={loading}
              onEdit={openDialog}
              onDelete={handleDelete}
              onTogglePublish={togglePublished}
            />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}

interface ArticleListProps {
  articles: Article[]
  loading: boolean
  onEdit: (article: Article) => void
  onDelete: (id: string) => void
  onTogglePublish: (article: Article) => void
}

const ArticleList = ({ articles, loading, onEdit, onDelete, onTogglePublish }: ArticleListProps) => {
  if (loading) {
    return <div>Loading articles...</div>
  }

  if (articles.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No articles found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {articles.map((article) => (
        <Card key={article.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{article.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={article.is_published ? "default" : "secondary"}>
                    {article.is_published ? 'Published' : 'Draft'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(article.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`/articles/${article.id}`, '_blank')}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(article)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onTogglePublish(article)}
                >
                  {article.is_published ? 'Unpublish' : 'Publish'}
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Article</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this article? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(article.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          
          {article.image_url && (
            <CardContent>
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-32 object-cover rounded-lg"
              />
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

export default Admin