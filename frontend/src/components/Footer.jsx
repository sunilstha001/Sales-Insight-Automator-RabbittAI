const Footer = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © 2024 Rabbit AI. All rights reserved. | AI Cloud DevOps Engineer Challenge
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer