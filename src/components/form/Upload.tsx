'use client'
import React, { useState, useRef, ChangeEvent, DragEvent, useMemo, useCallback } from 'react';
import { InputFileForm } from './InputFileForm';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { imageUrl } from '@/lib/constant';
import { CustomImage } from '../custom/CustomImage';

interface FileDnDProps {
  files: File[];
  fileDragging: number | null;
  fileDropping: number | null;
}

interface UploadProps {
  form: any;
  name: string;
}

const Upload: React.FC<UploadProps> = ({ form, name }) => {
  const t = useTranslations('all-product')
  const [files, setFiles] = useState<File[]>([]);
  const [fileDragging, setFileDragging] = useState<number | null>(null);
  const [fileDropping, setFileDropping] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

    const removedImage = updatedImages.splice(index, 1);

    setImages(updatedImages);

    const currentRemovedImages = form.getValues('removeImages') || [];
    form.setValue('removeImages', [...currentRemovedImages, ...removedImage]);
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (fileDragging === null || fileDropping === null) return;

    const newFiles = [...files];
    const removedFile = newFiles.splice(fileDragging, 1)[0];
    newFiles.splice(fileDropping, 0, removedFile);
    setFiles(newFiles);

    setFileDropping(null);
    setFileDragging(null);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    const targetElem = e.target as HTMLElement;
    const index = targetElem.closest("[draggable]")?.getAttribute("data-index");
    if (index) setFileDropping(parseInt(index, 10));
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    const index = (e.target as HTMLElement).closest("[draggable]")?.getAttribute("data-index");
    if (index) setFileDragging(parseInt(index, 10));
    e.dataTransfer.effectAllowed = "move";
  };

  const loadFile = (file: File) => {
    const blobUrl = URL.createObjectURL(file);
    return blobUrl;
  };

  const addFiles = (e: ChangeEvent<HTMLInputElement>) => {
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
          onDragOver={(e) => {
            e.preventDefault();
            fileInputRef.current?.classList.add('border-blue-400', 'ring-4', 'ring-inset');
          }}
          onDragLeave={() => {
            fileInputRef.current?.classList.remove('border-blue-400', 'ring-4', 'ring-inset');
          }}
          onDrop={handleDrop}
        >
          <InputFileForm
            form={form}
            name={name}
            multiple={true}
            onChanges={addFiles}
            className=""
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
              className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none`}
              style={{ paddingTop: '100%' }}
              data-index={index}
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
              <CustomImage src={image} className="absolute inset-0 z-0 object-contain w-full h-full border-4 border-white preview" alt={'review' + index} />
              <div className={`absolute inset-0 z-40 transition-colors duration-300 ${fileDropping === index && fileDragging !== index ? 'bg-blue-200 bg-opacity-80' : ''}`} />
            </div>
          ))}
          {files?.map((file, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none`}
              style={{ paddingTop: '100%' }}
              draggable
              onDragStart={handleDragStart}
              onDragEnd={() => setFileDragging(null)}
              data-index={index}
              onDragEnter={handleDragEnter}
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
              {file.type.includes('audio/') && (
                <svg className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              )}
              {file.type.includes('application/') || file.type === '' && (
                <svg className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              )}
              {file.type.includes('image/') && (
                <Image priority
                  fill src={loadFile(file)} className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview" alt={`upload-image-${index}`} />
              )}
              {file.type.includes('video/') && (
                <video className="absolute inset-0 object-cover w-full h-full border-4 border-white pointer-events-none preview">
                  <source src={loadFile(file)} type="video/mp4" />
                </video>
              )}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                <span className="w-full font-bold text-gray-900 truncate">{file.name}</span>
                <span className="text-xs text-gray-900">{humanFileSize(file.size)}</span>
              </div>
              <div className={`absolute inset-0 z-40 transition-colors duration-300 ${fileDropping === index && fileDragging !== index ? 'bg-blue-200 bg-opacity-80' : ''}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upload;
