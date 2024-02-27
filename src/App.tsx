import { ChangeEvent, FormEvent, useState } from "react"
import ProductCard from "./component/ProductCard"
import Modal from "./component/UI/Modal"
import { categories, colors, formInputsList, productList } from "./data"
import Button from "./component/UI/Button"
import Input from "./component/UI/Input"
import { IProduct } from "./interfaces"
import { productValidation } from "./validation"
import ErrorMessage from "./component/ErrorMessage"
import CircleColor from "./component/CircleColor"
import { v4 as uuid } from "uuid";
import SelectMenu from "./component/UI/SelectMenu"

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
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({ title: '', description: '', imageURL: '', price: '', colors: '' });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectCategory, setSelectedCategory] = useState(categories[0])

  /* ------ HUNDLERS ------- */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setProduct({
      ...product,
      [name]: value,    
    });
    setErrors({
      ...errors,
      [name]: ""
    })
  }
  
  const submitHundler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
      colors:  tempColors
    })

    const hasErrorMsg = Object.values(errors).some(value => value == "") && Object.values(errors).every(value => value == "")
console.log(product.colors)
console.log(tempColors, "temp")
    if (!hasErrorMsg) {
      setErrors(errors)
      return;
    }
    setProducts(prev => [{ ...product, id: uuid(), colors: tempColors , category: selectCategory}, ...prev]);
    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();

  }
  /* ------ RENDERS ------- */
  const renderProductList = products.map(product => <ProductCard key={product.id} product={product} />)
  const renderFormInputList = formInputsList.map(input => <div className="flex flex-col" key={input.id}>
    <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">{input.label}</label>
    <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
    <ErrorMessage message={errors[input.name]} />
  </div>)
  const renderColors = colors.map(color => <CircleColor key={color} color={color} onClick={() => {
    if (tempColors.includes(color)) {
      setTempColors(prev => prev.filter(item => item !== color))
      return
    }
    setTempColors(prev => [...prev, color])
  }} />)

  return (
    <main className="container">
      <Button onClick={(openModal)} className='bg-indigo-800' width='w-fit'>OPEN MODAL</Button>
      <div className=" m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} title="Edit Products">
        <form className="space-y-3" onSubmit={submitHundler}>
          {renderFormInputList}
          <SelectMenu selected={selectCategory} setSelected={setSelectedCategory} />
          <div className="flex item-center my-4 space-x-1">
            {renderColors}            
          </div>
          <div className="flex flex-wrap item-center my-4 space-x-1">
            {tempColors.map(color => (
              <span key={color} className="p-1 mr-1 mb-1 text-sm rounded-md text-white" style={{ backgroundColor: color }}>
                {color}
              </span>              
            ))}
          </div>               
          <span>
          <ErrorMessage message={errors.colors} />
            </span>     
          <div className="flex items-center space-x-3">
            <Button className='bg-indigo-700 hover:bg-indigo-700'>SUBMIT</Button>
          </div>
        </form>

      </Modal>
    </main>
  )
}

export default App