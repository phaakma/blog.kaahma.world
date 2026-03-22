type YouTubeProps = {
  id: string
  title?: string
}

const YouTube = ({ id, title = 'YouTube video' }: YouTubeProps) => {
  return (
    <div className="relative my-6 w-full overflow-hidden rounded-lg pb-[56.25%]">
      <iframe
        className="absolute left-0 top-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}

export default YouTube