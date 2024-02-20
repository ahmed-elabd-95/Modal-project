import ProductCard from "./component/ProductCard"
import { productList } from "./data"

const App = () => {
  const renderProductList = productList.map(product =><ProductCard  key={product.id} product={product}/> )
  return (
    <main className="container">
      <div className=" m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {renderProductList}
      </div>
        
    </main>
  )
}

export default App