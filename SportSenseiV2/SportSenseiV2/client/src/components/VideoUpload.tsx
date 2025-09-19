import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, File, X, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UploadedVideo {
  file: File
  url: string
  progress: number
  status: "uploading" | "processing" | "completed" | "error"
}

interface VideoUploadProps {
  onVideoUploaded: (video: UploadedVideo) => void
  gameId?: string
}

export function VideoUpload({ onVideoUploaded, gameId }: VideoUploadProps) {
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const videoUrl = URL.createObjectURL(file)
      const newVideo: UploadedVideo = {
        file,
        url: videoUrl,
        progress: 0,
        status: "uploading"
      }
      
      setUploadedVideos(prev => [...prev, newVideo])
      setIsUploading(true)
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadedVideos(prev => 
          prev.map(video => {
            if (video.file === file && video.progress < 100) {
              const newProgress = Math.min(video.progress + 10, 100)
              const newStatus = newProgress === 100 ? "processing" : "uploading"
              return { ...video, progress: newProgress, status: newStatus }
            }
            return video
          })
        )
      }, 200)
      
      // Complete upload after 3 seconds
      setTimeout(() => {
        clearInterval(progressInterval)
        setUploadedVideos(prev => 
          prev.map(video => {
            if (video.file === file) {
              const completedVideo = { ...video, status: "completed" as const, progress: 100 }
              onVideoUploaded(completedVideo)
              return completedVideo
            }
            return video
          })
        )
        setIsUploading(false)
      }, 3000)
    })
  }, [onVideoUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1,
    disabled: isUploading
  })

  const removeVideo = (index: number) => {
    setUploadedVideos(prev => {
      const video = prev[index]
      if (video.url) {
        URL.revokeObjectURL(video.url)
      }
      return prev.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Upload Your Performance Video</h2>
        <p className="text-muted-foreground">
          Upload a video of your {gameId?.replace('-', ' ')} performance to receive AI-powered feedback and scoring.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
              ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary/5'}
            `}
            data-testid="video-dropzone"
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isDragActive ? 'Drop your video here' : 'Upload a video'}
              </p>
              <p className="text-sm text-muted-foreground">
                Drag and drop a video file, or click to select
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: MP4, MOV, AVI, WebM (Max 100MB)
              </p>
            </div>
          </div>

          {uploadedVideos.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Uploaded Videos</h3>
              {uploadedVideos.map((video, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <File className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{video.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(video.file.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={video.status === "completed" ? "default" : 
                                video.status === "error" ? "destructive" : "secondary"}
                      >
                        {video.status}
                      </Badge>
                      {video.status === "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const video_element = document.createElement('video')
                            video_element.src = video.url
                            video_element.controls = true
                            video_element.style.maxWidth = '100%'
                            const dialog = document.createElement('dialog')
                            dialog.appendChild(video_element)
                            document.body.appendChild(dialog)
                            dialog.showModal()
                            dialog.onclick = () => {
                              dialog.close()
                              document.body.removeChild(dialog)
                            }
                          }}
                          data-testid={`button-preview-${index}`}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeVideo(index)}
                        data-testid={`button-remove-${index}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {video.status !== "completed" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          {video.status === "uploading" ? "Uploading..." : 
                           video.status === "processing" ? "Processing..." : ""}
                        </span>
                        <span>{video.progress}%</span>
                      </div>
                      <Progress value={video.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}