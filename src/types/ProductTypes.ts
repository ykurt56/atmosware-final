interface ProductTypes {
  id: string;
  title: string;
  category: string;
  price: number;
  color: string;
  sizes: object;
  S: number;
  M: number;
  L: number;
  XL: number;
  stock: number;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}
export default ProductTypes;
