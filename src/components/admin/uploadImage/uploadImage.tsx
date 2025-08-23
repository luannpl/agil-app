"use client";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/kibo-ui/dropzone";
import { useState } from "react";
const UploadImage = () => {
  const [files, setFiles] = useState<File[] | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
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
