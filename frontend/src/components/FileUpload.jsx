import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, AlertCircle } from 'lucide-react'

function FileUpload({ file, setFile }) {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      alert('File must be CSV or Excel and less than 10MB')
      return
    }
    
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [setFile])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxSize: 10485760,
    multiple: false
  })

  const removeFile = (e) => {
    e.stopPropagation()
    setFile(null)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Upload Sales File <span className="text-red-500">*</span>
      </label>
      
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-3 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200
            ${isDragActive && !isDragReject ? 'border-purple-500 bg-purple-50 scale-[1.01]' : ''}
            ${isDragReject ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <div className={`p-4 rounded-full inline-block mx-auto
              ${isDragActive ? 'bg-purple-100' : 'bg-gray-100'}
            `}>
              <Upload className={`h-12 w-12 
                ${isDragActive ? 'text-purple-600' : 'text-gray-400'}
              `} />
            </div>
            
            {isDragActive ? (
              <p className="text-lg text-purple-600 font-medium">Drop your file here...</p>
            ) : (
              <>
                <div>
                  <p className="text-lg text-gray-700 font-medium">Drag & drop your file here</p>
                  <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                  <span className="px-3 py-1 bg-gray-100 rounded-full">CSV</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full">XLSX</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full">XLS</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full">Max 10MB</span>
                </div>
              </>
            )}
            
            {isDragReject && (
              <div className="flex items-center justify-center space-x-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <p>Invalid file type or size</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border-2 border-purple-200 rounded-2xl p-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB • 
                  {file.type || 'Spreadsheet'}
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-3 hover:bg-white rounded-xl transition-all duration-200 group"
              type="button"
            >
              <X className="h-5 w-5 text-gray-400 group-hover:text-red-500 group-hover:scale-110 transition" />
            </button>
          </div>
        </div>
      )}
      
      <p className="text-xs text-gray-400 mt-2">
        Accepted formats: .csv, .xlsx, .xls (max 10MB)
      </p>
    </div>
  )
}

export default FileUpload