import FileUpload from './FileUpload'
import EmailInput from './EmailInput'
import LoadingSpinner from './LoadingSpinner'

const UploadForm = ({ 
  file, setFile, 
  email, setEmail, 
  loading, 
  handleSubmit 
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Generate Your Insight</h2>
        <p className="text-gray-600 mt-2">Fill in the details below to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <FileUpload file={file} setFile={setFile} />
        <EmailInput email={email} setEmail={setEmail} />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 px-6 rounded-xl font-semibold text-lg
                   hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-3">
              <LoadingSpinner />
              <span>Processing Your File...</span>
            </div>
          ) : (
            'Generate & Send Summary'
          )}
        </button>
      </form>
    </div>
  )
}

export default UploadForm