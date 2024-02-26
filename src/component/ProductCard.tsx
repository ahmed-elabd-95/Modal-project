import { IProduct } from "../interfaces"
import { txtcutter } from "../utils/functions"
import CircleColor from "./CircleColor"
import Image from "./Image"
import Button from "./UI/Button"
interface IProps {
  product: IProduct
}
const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL, price, category, colors } = product
  const renderColors = colors.map(color => <CircleColor key={color} color={color} />)
  return (
    <div className="border rounded-md p-2 flex flex-col max-w-sm md:max-w-lg mx-auto">

      <Image
        imageURL={imageURL}
        alt={category.name}
        className="rounded-md h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg font-semibold">{txtcutter(title, 20)}</h3>
      <p className="text-xs text-gray-500 break-words">{txtcutter(description)}</p>
      <div className="flex item-center my-4 space-x-1">
          {renderColors}
          </div>
      <div className="flex items-center justify-between">
        <span className="text-lg text-indigo-600 font-semibold">${price}</span>
        <Image
          imageURL={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-bottom"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-blue-800">EDIT</Button>
        <Button className="bg-red-800">DELETE</Button>
      </div>
    </div>
  )
}

export default ProductCard