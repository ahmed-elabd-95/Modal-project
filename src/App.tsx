import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./component/ProductCard";
import Modal from "./component/UI/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./component/UI/Button";
import Input from "./component/UI/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./component/ErrorMessage";
import CircleColor from "./component/CircleColor";
import { v4 as uuid } from "uuid";
import SelectMenu from "./component/UI/SelectMenu";
import toast, { Toaster } from 'react-hot-toast';


const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);  
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectCategory, setSelectedCategory] = useState(categories[0]);

  /* ------ HUNDLERS ------- */
  // ADD NEW PRODUCT HUNDLERS
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const submitHundler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
      colors: tempColors,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors, category: selectCategory },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();
    toast('Product has been added!', {
      icon: '👏',
      style: {
        backgroundColor: "black",
        color: "white"
      }
    })
    
  };
  // EDIT MODAL HUNDLERS
  const closeEditModal = () => setIsOpenEditModal(false);
  const openEditModal = () => setIsOpenEditModal(true);
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const submitEditHundler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, price, imageURL } = productToEdit;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
      colors,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value == "") &&
      Object.values(errors).every((value) => value == "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);
    setProduct(defaultProductObj);
    setTempColors([]);
    closeEditModal();
    toast('Product has been edited!', {
      icon: '👏',
      style: {
        backgroundColor: "#2a53af",
        color: "white"
      }
    })
  };
  // DELETE MODAL HUNDLERS
  const closeDeleteModal = () => setIsOpenDeleteModal(false);
  const openDeleteModal = () => setIsOpenDeleteModal(true);
  const removeHundler = () =>{
    const filtered = products.filter(product => product.id != productToEdit.id)
    setProducts(filtered)
    closeDeleteModal()
    toast('Product has been deleted!', {
      icon: '👏',
      style: {
        backgroundColor: "#9a311a",
        color: "white"
      }
    })
  }

  /* ------ RENDERS ------- */
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}      
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      openDeleteModal= {openDeleteModal}
    />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage message={errors[input.name]} />
    </div>
  ));

  const renderFormInputTOEdit = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={productToEdit[input.name]}
        onChange={onChangeEditHandler}
      />
      <ErrorMessage message={errors[input.name]} />
    </div>
  ));

  const renderColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  return (
    <main className="container">
      <div className="flex items-center p-4 justify-center">
      <Button onClick={openModal} className="bg-indigo-800" width="w-fit">
       Create New Product
      </Button>
      </div>
      <div className=" m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderProductList}
      </div>

      {/* ADD NEW PRODUCT */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
        <form className="space-y-3" onSubmit={submitHundler}>
          {renderFormInputList}
          <SelectMenu
            selected={selectCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex item-center my-4 space-x-1">{renderColors}</div>
          <div className="flex flex-wrap item-center my-4 space-x-1">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-sm rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <span>
            <ErrorMessage message={errors.colors} />
          </span>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-700">
              SUBMIT
            </Button>
          </div>
        </form>
      </Modal>

      {/* EDIT PRODUCT */}
      <Modal
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="Edit Products"
      >
        <form className="space-y-3" onSubmit={submitEditHundler}>
          {renderFormInputTOEdit}
          <SelectMenu
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex item-center my-4 space-x-1">{renderColors}</div>
          <div className="flex flex-wrap item-center my-4 space-x-1">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mb-1 text-sm rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <span>
            <ErrorMessage message={errors.colors} />
          </span>
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-700">
              SUBMIT
            </Button>
            <Button
              className="bg-gray-300 hover:bg-gray-500"
              onClick={closeEditModal}
            >
              CANCEL
            </Button>
          </div>
        </form>
      </Modal>
      {/* DELETE PRODUCT  */}
      <Modal
        isOpen={isOpenDeleteModal}
        closeModal={closeDeleteModal}
        title="Are you sure you want to remove this product from your store?"
        description="Deleting this product will remove it permanently from your inventory. 
        Any associated data, sales history, and other related information will also be deleted. 
        Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-red-700 hover:bg-red-700" onClick={removeHundler}>Yes, remove</Button>
          <Button
            className="bg-gray-300 hover:bg-gray-500"
            onClick={closeDeleteModal}
          >
            CANCEL
          </Button>
        </div>
      </Modal>
      <Toaster/>
    </main>
  );
};

export default App;
