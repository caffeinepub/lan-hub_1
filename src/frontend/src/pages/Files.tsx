import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Download, Loader2 } from 'lucide-react';
import { useListFiles, useUploadFile } from '@/hooks/useQueries';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

export default function Files() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: files = [], isLoading } = useListFiles();
  const uploadFileMutation = useUploadFile();

  const formatFileSize = (bytes: bigint): string => {
    const numBytes = Number(bytes);
    if (numBytes < 1024) return `${numBytes} B`;
    if (numBytes < 1024 * 1024) return `${(numBytes / 1024).toFixed(2)} KB`;
    if (numBytes < 1024 * 1024 * 1024) return `${(numBytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(numBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const formatTimestamp = (timestamp: bigint): string => {
    const milliseconds = Number(timestamp) / 1_000_000;
    return formatDistanceToNow(new Date(milliseconds), { addSuffix: true });
  };

  const handleFileSelect = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    
    try {
      setUploadProgress(0);
      
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await uploadFileMutation.mutateAsync({
        blob,
        filename: file.name,
        size: BigInt(file.size),
        contentType: file.type || 'application/octet-stream',
      });

      toast.success(`File "${file.name}" uploaded successfully!`);
      setUploadProgress(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload "${file.name}". Please try again.`);
      setUploadProgress(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDownload = (fileId: string, filename: string, blob: ExternalBlob) => {
    const url = blob.getDirectURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Files</h1>
        <p className="text-muted-foreground">
          Upload and manage files on your local network
        </p>
      </div>

      {/* Upload Area */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
          <CardDescription>
            Drag and drop a file or click to browse
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-accent/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
              disabled={uploadProgress !== null}
            />
            
            {uploadProgress !== null ? (
              <div className="w-full max-w-md space-y-4">
                <div className="flex items-center justify-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploading...</span>
                    <span className="font-medium">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              </div>
            ) : (
              <>
                <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="mb-2 text-sm font-medium">
                  Drop your file here or click to browse
                </p>
                <p className="mb-4 text-xs text-muted-foreground">
                  Supports all file types
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadFileMutation.isPending}
                >
                  Select File
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
          <CardDescription>
            {files.length === 0
              ? 'No files uploaded yet'
              : `${files.length} file${files.length === 1 ? '' : 's'} available`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No files have been uploaded yet. Upload your first file above!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {files.map((file) => (
                <div
                  key={file.fileId}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{file.metadata.filename}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.metadata.size)}</span>
                        <span>•</span>
                        <span>{formatTimestamp(file.metadata.uploadTimestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {file.metadata.contentType}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        try {
                          const fileData = await fetch(
                            ExternalBlob.fromURL(`/api/files/${file.fileId}`).getDirectURL()
                          ).then(res => res.blob());
                          const url = URL.createObjectURL(fileData);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = file.metadata.filename;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        } catch (error) {
                          console.error('Download error:', error);
                          toast.error('Failed to download file');
                        }
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
