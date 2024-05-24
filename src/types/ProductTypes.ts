interface ProductTypes {
  id: number | string;
  title: string;
  category: string;
  price: number;
  color: string;
  size: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}
export default ProductTypes;
