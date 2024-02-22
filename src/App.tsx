import { useState } from "react"
import ProductCard from "./component/ProductCard"
import Modal from "./component/UI/Modal"
import { formInputsList, productList } from "./data"
import Button from "./component/UI/Button"
import Input from "./component/UI/Input"

const App = () => {

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product} />)
  const renderFormInputList = formInputsList.map(input =><div className="flex flex-col">
    <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">{input.label}</label>
    <Input type="text" id={input.id} name={input.name}/>
  </div>)
  return (
    <main className="container">
      <Button onClick={(openModal)} className='bg-indigo-800' width='w-fit'>OPEN MODAL</Button>
      <div className=" m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} title="Edit Products">
      <form className="space-y-3">
      {renderFormInputList}
      <div className="flex items-center space-x-3">
        <Button onClick={(closeModal)} className='bg-indigo-700 hover:bg-indigo-700'>SUBMIT</Button>
        <Button onClick={(closeModal)} className='bg-gray-400'>CANCEL</Button>
        </div>
        </form>
        
      </Modal>


    </main>
  )
}

export default App