import { VideoUpload } from "../VideoUpload"

export default function VideoUploadExample() {
  return (
    <div className="p-8">
      <VideoUpload
        onVideoUploaded={(video) => console.log('Video uploaded:', video)}
        gameId="javelin-throw"
      />
    </div>
  )
}