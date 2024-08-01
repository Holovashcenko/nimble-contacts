import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="container mx-auto max-w-screen-xl min-w-[400px]">
      <Outlet />
    </div>
  )
}

export default App
