import { useRef, useState } from 'react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';

const FileUpload = ({
  accept = '*',
  multiple = false,
  label = 'Upload files',
  helperText,
  error,
  onChange,
  className = ''
}) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    onChange?.(selectedFiles);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      <div 
        onClick={triggerFileInput}
        className={classNames(
          'mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer',
          error ? 'border-red-300' : 'border-gray-300 hover:border-primary',
          files.length > 0 ? 'border-solid' : 'border-dashed'
        )}
      >
        <div className="space-y-1 text-center">
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <p className="pl-1">
              {label} or drag and drop
            </p>
          </div>
          <p className="text-xs text-gray-500">
            {helperText}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-700 truncate max-w-xs">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;