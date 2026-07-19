const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse rounded-xl border border-neutral-200/80 bg-white overflow-hidden">
      <div className="aspect-[4/3] bg-neutral-200" />
      <div className="p-3.5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-neutral-200 rounded" />
          <div className="h-2 w-2 bg-neutral-200 rounded-full" />
          <div className="h-3 w-12 bg-neutral-200 rounded" />
        </div>
        <div className="h-4 w-full bg-neutral-200 rounded" />
        <div className="h-4 w-3/4 bg-neutral-200 rounded" />
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-3 w-3 bg-neutral-200 rounded" />
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 w-24 bg-neutral-200 rounded" />
          <div className="h-3 w-16 bg-neutral-200 rounded" />
        </div>
        <div className="flex gap-3 pt-2 border-t border-neutral-100">
          <div className="h-3 w-16 bg-neutral-200 rounded" />
          <div className="h-3 w-14 bg-neutral-200 rounded" />
          <div className="h-3 w-12 bg-neutral-200 rounded" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
