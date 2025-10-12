// @/components/admin/uploadImage/uploadImage.tsx

"use client";
import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { type Point, type Area } from "react-easy-crop";
import { X } from "lucide-react";
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

const ASPECT_RATIO = 16 / 12;

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
  pixelCrop: Area,
  quality: number = 0.85,
  fileName: string = "positioned-image.jpg"
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
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        const file = new File([blob], fileName, {
          type: "image/jpeg",
        });
        resolve(file);
      },
      "image/jpeg",
      quality
    );
  });
}

interface ImageToProcess {
  id: string;
  file: File;
  src: string;
  crop: Point;
  zoom: number;
  quality: number;
  croppedAreaPixels: Area | null;
}

const UploadImage = ({ files, onFilesChange }: UploadImageProps) => {
  const [imagesToProcess, setImagesToProcess] = useState<ImageToProcess[]>([]);
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      if (currentEditingIndex !== null) {
        setImagesToProcess((prev) =>
          prev.map((img, index) =>
            index === currentEditingIndex ? { ...img, croppedAreaPixels } : img
          )
        );
      }
    },
    [currentEditingIndex]
  );

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleDrop(Array.from(files));
    }
    // Reset the input value so the same file can be selected again if needed
    event.target.value = "";
  };

  const handleContinueAdding = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (droppedFiles: File[]) => {
    if (droppedFiles && droppedFiles.length > 0) {
      const newImages: ImageToProcess[] = droppedFiles.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        file,
        src: "",
        crop: { x: 0, y: 0 },
        zoom: 1,
        quality: 0.85,
        croppedAreaPixels: null,
      }));

      // Load images one by one
      newImages.forEach((imageData) => {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            const src = reader.result?.toString() || "";
            setImagesToProcess((prev) =>
              prev.map((img) =>
                img.id === imageData.id ? { ...img, src } : img
              )
            );
          },
          false
        );
        reader.readAsDataURL(imageData.file);
      });

      setImagesToProcess((prev) => [...prev, ...newImages]);
    }
  };

  const handleSave = async () => {
    if (imagesToProcess.length > 0 && !isProcessing) {
      setIsProcessing(true);
      const processedFiles: File[] = [];

      console.log(
        "Iniciando processamento de",
        imagesToProcess.length,
        "imagens"
      );

      for (const [index, imageData] of imagesToProcess.entries()) {
        try {
          if (imageData.src) {
            let croppedImageFile: File | null = null;

            if (imageData.croppedAreaPixels) {
              // Se foi cortada, usa as coordenadas de corte
              const fileName = `imagem-${index + 1}-${Date.now()}.jpg`;
              croppedImageFile = await getCroppedImg(
                imageData.src,
                imageData.croppedAreaPixels,
                imageData.quality,
                fileName
              );
              console.log(
                `Imagem ${index + 1} cortada processada:`,
                croppedImageFile?.name
              );
            } else {
              // Se não foi cortada, converte a imagem original para JPEG
              const image = await createImage(imageData.src);
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              if (ctx) {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);

                croppedImageFile = await new Promise<File>((resolve) => {
                  canvas.toBlob(
                    (blob) => {
                      if (blob) {
                        const fileName = `imagem-${
                          index + 1
                        }-${Date.now()}.jpg`;
                        const file = new File([blob], fileName, {
                          type: "image/jpeg",
                        });
                        resolve(file);
                      }
                    },
                    "image/jpeg",
                    imageData.quality
                  );
                });
                console.log(
                  `Imagem ${index + 1} original processada:`,
                  croppedImageFile?.name
                );
              }
            }

            if (croppedImageFile) {
              processedFiles.push(croppedImageFile);
            }
          }
        } catch (error) {
          console.error(`Erro ao processar imagem ${index + 1}:`, error);
        }
      }

      console.log(
        "Processamento concluído. Imagens processadas:",
        processedFiles.length
      );

      if (processedFiles.length > 0) {
        onFilesChange(processedFiles);
        console.log("Imagens enviadas para o componente pai");
      } else {
        console.warn("Nenhuma imagem foi processada com sucesso");
      }

      // Reset state
      setImagesToProcess([]);
      setCurrentEditingIndex(null);
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    if (!isProcessing) {
      setImagesToProcess([]);
      setCurrentEditingIndex(null);
      onFilesChange(undefined);
    }
  };

  const updateImageData = (index: number, updates: Partial<ImageToProcess>) => {
    setImagesToProcess((prev) =>
      prev.map((img, i) => (i === index ? { ...img, ...updates } : img))
    );
  };

  const removeImage = (index: number) => {
    setImagesToProcess((prev) => prev.filter((_, i) => i !== index));
    if (currentEditingIndex === index) {
      setCurrentEditingIndex(null);
    } else if (currentEditingIndex !== null && currentEditingIndex > index) {
      setCurrentEditingIndex(currentEditingIndex - 1);
    }
  };

  // Render editing interface for current image
  if (currentEditingIndex !== null && imagesToProcess[currentEditingIndex]) {
    const currentImage = imagesToProcess[currentEditingIndex];
    return (
      <div className="flex flex-col items-center gap-4 p-4 border rounded-md">
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-2 w-full sm:w-auto">
          <span className="text-sm text-muted-foreground text-center sm:text-left">
            Editando imagem {currentEditingIndex + 1} de{" "}
            {imagesToProcess.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentEditingIndex(null)}
            className="w-full sm:w-auto"
          >
            Voltar para lista
          </Button>
        </div>

        <div className="relative w-full" style={{ height: "50vh" }}>
          <Cropper
            image={currentImage.src}
            crop={currentImage.crop}
            zoom={currentImage.zoom}
            aspect={ASPECT_RATIO}
            onCropChange={(crop) =>
              updateImageData(currentEditingIndex, { crop })
            }
            onZoomChange={(zoom) =>
              updateImageData(currentEditingIndex, { zoom })
            }
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Zoom</label>
            <Slider
              value={[currentImage.zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) =>
                updateImageData(currentEditingIndex, { zoom: value[0] })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Qualidade JPEG: {Math.round(currentImage.quality * 100)}%
            </label>
            <Slider
              value={[currentImage.quality]}
              min={0.6}
              max={1.0}
              step={0.05}
              onValueChange={(value) =>
                updateImageData(currentEditingIndex, { quality: value[0] })
              }
            />
            <p className="text-xs text-muted-foreground">
              Qualidade mais baixa = arquivo menor, mas pode perder detalhes
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant="outline"
            onClick={handleCancel}
            type="button"
            disabled={isProcessing}
            className="flex-1 min-w-[120px] max-w-[200px]"
          >
            Cancelar Tudo
          </Button>
          <Button
            variant="auth"
            onClick={handleSave}
            type="button"
            disabled={isProcessing}
            className="flex-1 min-w-[120px] max-w-[200px]"
          >
            {isProcessing
              ? "Processando..."
              : `Processar Todas (${imagesToProcess.length})`}
          </Button>
        </div>
      </div>
    );
  }

  // Render image list interface
  if (imagesToProcess.length > 0) {
    return (
      <div className="flex flex-col gap-4 p-4 border rounded-md">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium">
            {imagesToProcess.length} imagem(ns) selecionada(s)
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              type="button"
              disabled={isProcessing}
              className="flex-1 min-w-[120px]"
            >
              Cancelar
            </Button>
            <Button
              variant="auth"
              onClick={handleSave}
              type="button"
              disabled={isProcessing}
              className="flex-1 min-w-[120px]"
            >
              {isProcessing ? "Processando..." : "Processar Todas"}
            </Button>
            <Button
              variant="secondary"
              onClick={handleContinueAdding}
              type="button"
              disabled={isProcessing}
              className="flex-1 min-w-[120px]"
            >
              Continuar Adicionando
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imagesToProcess.map((imageData, index) => (
            <div key={imageData.id} className="relative group">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                {imageData.src ? (
                  <img
                    src={imageData.src}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setCurrentEditingIndex(index)}
                  className="text-xs px-2 py-1 h-auto"
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeImage(index)}
                  className="text-xs px-2 py-1 h-auto"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          style={{ display: "none" }}
        />
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
        multiple={true}
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      {error && <p className="text-sm text-error ml-2">{error}</p>}
    </div>
  );
};

export default UploadImage;
