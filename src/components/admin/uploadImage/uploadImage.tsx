"use client";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/kibo-ui/dropzone";

interface UploadImageProps {
  files: File[] | undefined;
  onFilesChange: (files: File[] | undefined) => void;
}

const UploadImage = ({ files, onFilesChange }: UploadImageProps) => {
  const handleDrop = (droppedFiles: File[]) => {
    onFilesChange(droppedFiles);
  };

  return (
    <Dropzone
      accept={{ "image/*": [] }}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};
export default UploadImage;
