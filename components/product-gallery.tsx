"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
        <Image src={images[selectedImage] || "/placeholder.svg"} alt="Product image" fill className="object-cover" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square w-20 rounded-md overflow-hidden bg-muted",
              selectedImage === index && "ring-2 ring-primary",
            )}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

