// @/components/admin/uploadImage/uploadImage.tsx

"use client";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { type Point, type Area } from "react-easy-crop";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/kibo-ui/dropzone";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface UploadImageProps {
  files: File[] | undefined;
  onFilesChange: (files: File[] | undefined) => void;
}

const ASPECT_RATIO = 16 / 9;

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<File | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Canvas is empty");
        return;
      }
      const file = new File([blob], "positioned-image.png", {
        type: "image/png",
      });
      resolve(file);
    }, "image/png");
  });
}

const UploadImage = ({ files, onFilesChange }: UploadImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleDrop = (droppedFiles: File[]) => {
    if (droppedFiles && droppedFiles.length > 0) {
      const file = droppedFiles[0];
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          setImgSrc(reader.result?.toString() || null);
        },
        false
      );
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (imgSrc && croppedAreaPixels) {
      const croppedImageFile = await getCroppedImg(imgSrc, croppedAreaPixels);
      if (croppedImageFile) {
        onFilesChange([croppedImageFile]);
      }
      setImgSrc(null);
      setZoom(1);
    }
  };

  const handleCancel = () => {
    setImgSrc(null);
    setZoom(1);
    onFilesChange(undefined);
  };

  if (imgSrc) {
    return (
      <div className="flex flex-col items-center gap-4 p-4 border rounded-md">
        <div className="relative w-full" style={{ height: "50vh" }}>
          <Cropper
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            aspect={ASPECT_RATIO}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="w-full max-w-sm flex flex-col gap-4">
          <label className="text-sm">Zoom</label>
          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(value) => setZoom(value[0])}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel} type="button">
            Cancelar
          </Button>
          <Button variant="auth" onClick={handleSave} type="button">
            Confirmar Posição
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Dropzone
        accept={{ "image/*": [] }}
        onDrop={handleDrop}
        onError={(err) => setError(String(err))}
        src={files}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      {error && <p className="text-sm text-error ml-2">{error}</p>}
    </div>
  );
};

export default UploadImage;
