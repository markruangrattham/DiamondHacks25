"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Upload, File, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  accept: string
  maxFiles: number
  maxSize: number
  onFilesChange: (files: File[]) => void
  label: string
}

export function FileUploader({ accept, maxFiles, maxSize, onFilesChange, label }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const errorMessages = rejectedFiles.map((file) => {
          const errors = file.errors.map((e: any) => e.message).join(", ")
          return `${file.file.name}: ${errors}`
        })
        setError(errorMessages.join("; "))
        return
      }

      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files.`)
        return
      }

      setError(null)
      const newFiles = [...files, ...acceptedFiles]
      setFiles(newFiles)
      onFilesChange(newFiles)
    },
    [files, maxFiles, onFilesChange],
  )

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    onFilesChange(newFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept.includes("image") ? "image/*" : "application/pdf"]: [] } : undefined,
    maxSize,
    maxFiles,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary hover:bg-gray-50",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-gray-500">Drag & drop or click to browse</p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4" />
          <p>{error}</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Files:</p>
          <div className="grid gap-2">
            {files.map((file, index) => (
              <Card key={index} className="p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-gray-400" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-6 w-6 p-0">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

