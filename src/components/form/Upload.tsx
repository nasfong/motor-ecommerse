'use client'
import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { InputFileForm } from './InputFileForm';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { CustomImage } from '../custom/CustomImage';
import { imageUrl } from '@/lib/constant';
import { toast } from 'sonner';

interface UploadProps {
  form: any;
  name: string;
}

const Upload: React.FC<UploadProps> = ({ form, name }) => {
  const t = useTranslations('all-product')
  const [files, setFiles] = useState<File[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<string[]>(form.getValues('image'))

  const humanFileSize = (size: number): string => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      parseFloat((size / Math.pow(1024, i)).toFixed(2)) +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    form.setValue(name, newFiles);
  };
  const removePreviewImage = (index: number) => {
    const updatedImages = [...images];

    updatedImages.splice(index, 1);

    setImages(updatedImages);

    form.setValue('image', updatedImages);
  }

  const handleDropImage = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggingIndex === null || hoveringIndex === null) return;

    const newFiles = [...files];
    const [movedFile] = newFiles.splice(draggingIndex, 1);
    newFiles.splice(hoveringIndex, 0, movedFile);
    setFiles(newFiles);
    form.setValue(name, newFiles)
    setDraggingIndex(null);
    setHoveringIndex(null);
  };

  const handleDropPreview = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggingIndex === null || hoveringIndex === null) return;

    const updatedList = [...images];
    const [movedImage] = updatedList.splice(draggingIndex, 1);
    updatedList.splice(hoveringIndex, 0, movedImage);

    setImages(updatedList);
    form.setValue('image', updatedList);
    setDraggingIndex(null);
    setHoveringIndex(null);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragEnter = (index: number) => {
    setHoveringIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    setHoveringIndex(null);
  };

  const loadFile = (file: File) => {
    const blobUrl = URL.createObjectURL(file);
    return blobUrl;
  };

  const addFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => ['image/png', 'image/jpeg'].includes(file.type));

    if (validFiles.length === 0) {
      toast.warning('Please select a valid image file (PNG, JPG, JPEG).');
      return;
    }
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => {
        const updatedFiles = [...prevFiles, ...newFiles];
        form.setValue(name, updatedFiles);
        return updatedFiles;
      });
    }
  };

  return (
    <div className="">
      <div className="relative flex flex-col">
        <div
          className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
        >
          <InputFileForm
            form={form}
            name={name}
            multiple={true}
            onChanges={addFiles}
            className="absolute inset-0 z-50 h-full py-16 opacity-0  cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <svg className="w-6 h-6 mr-1 text-current-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="m-0">{t('Drag your files here or click in this area')}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6">
          {images?.map((image, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none transition-transform duration-300 ease-in-out transform ${isDragging ? 'scale-105' : 'scale-100'
                }`}
              style={{ paddingTop: '100%' }}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={() => {
                handleDragEnd();
                setIsDragging(false);
              }}
              onDragOver={handleDragOver}
              onDrop={handleDropPreview}
              onDrag={e => setIsDragging(true)}
            >
              <button
                className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                type="button"
                onClick={() => removePreviewImage(index)}
              >
                <svg className="w-4 h-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <Image
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 3840px'
                src={imageUrl + image} height={500} width={500} className="absolute inset-0 z-0 object-contain border-4 border-transparent" alt={'review' + index} />
            </div>
          ))}
          {files.map((file, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none transition-transform duration-300 ease-in-out transform ${isDragging ? 'scale-105' : 'scale-100'
                }`}
              style={{ paddingTop: '100%' }}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={() => {
                handleDragEnd();
                setIsDragging(false);
              }}
              onDragOver={handleDragOver}
              onDrop={handleDropImage}
              onDrag={e => setIsDragging(true)}
            >
              <button
                className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                type="button"
                onClick={() => removeFile(index)}
              >
                <svg className="w-4 h-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <Image
                src={loadFile(file)}
                alt={`upload-image-${index}`}
                height={500} width={500}
                className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
              />
              <p className="absolute bottom-0 w-full p-2 text-xs text-white bg-gray-800 bg-opacity-70">{humanFileSize(file.size)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upload;