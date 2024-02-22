import { ChangeEvent, FormEvent, useState } from "react"
import ProductCard from "./component/ProductCard"
import Modal from "./component/UI/Modal"
import { formInputsList, productList } from "./data"
import Button from "./component/UI/Button"
import Input from "./component/UI/Input"
import { IProduct } from "./interfaces"
import { productValidation } from "./validation"

const App = () => {
  const defaultProductObj = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: '',
    }
  }
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<IProduct>(defaultProductObj)

  /* ------ HUNDLERS ------- */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setProduct({
      ...product,
      [name]: value,
    });
  }
  const onCancel = () => {
    setProduct(defaultProductObj)
    closeModal()
  }
  const submitHundler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    })
    console.log(errors)
  }
  /* ------ RENDERS ------- */
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product} />)
  const renderFormInputList = formInputsList.map(input => <div className="flex flex-col" key={input.id}>
    <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">{input.label}</label>
    <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
  </div>)


  return (
    <main className="container">
      <Button onClick={(openModal)} className='bg-indigo-800' width='w-fit'>OPEN MODAL</Button>
      <div className=" m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} title="Edit Products">
        <form className="space-y-3" onSubmit={submitHundler}>
          {renderFormInputList}
          <div className="flex items-center space-x-3">
            <Button className='bg-indigo-700 hover:bg-indigo-700'>SUBMIT</Button>
            <Button onClick={onCancel} className='bg-gray-400' >CANCEL</Button>
          </div>
        </form>

      </Modal>
    </main>
  )
}

export default App