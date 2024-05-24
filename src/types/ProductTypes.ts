interface ProductTypes {
  id: number;
  title: string;
  category: string;
  price: number;
  color: string;
  size: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export default ProductTypes;
