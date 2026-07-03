import Navbar from '@/components/Navbar/Navbar'

function BoardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">My Board</h1>
      </div>
    </div>
  )
}

export default BoardPage
