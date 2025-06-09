import "./App.css"
import { Navbar } from "./components/navbar/Navbar"
import { Products } from "./features/products"

export const App = () => {
  return (
    <div className="bg-white dark:bg-gray-600">
      <Navbar />
      <div className="flex justify-center">
        <Products />
      </div>
    </div>
  )
}
