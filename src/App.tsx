import { useState } from "react"
import ProductCard from "./component/ProductCard"
import Modal from "./component/UI/Modal"
import { productList } from "./data"
import Button from "./component/UI/Button"

const App = () => {

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product} />)
  return (
    <main className="container">
      <Button onClick={(openModal)} className='bg-blue-800' width='w-fit'>OPEN MODAL</Button>
      <div className=" m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} title="Edit Products">

        <Button onClick={(closeModal)} className='bg-blue-800' width='w-fit'>SUBMIT</Button>
      </Modal>


    </main>
  )
}

export default App