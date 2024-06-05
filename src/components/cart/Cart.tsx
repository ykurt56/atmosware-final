import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getCartItem,
  deleteCartItem,
  updateCartItemQuantity,
} from "../../services/cartApi";
import { getProduct, updateProduct } from "../../services/productApi";
import { OrderApi } from "../../services/orderApi";
interface CartItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const user_id: string = localStorage.getItem("User_ID") || ""; // Varsayılan değer atama
      console.log(user_id);
      try {
        const initialCartItems = await getCartItem(user_id);
        setCartItems(initialCartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []); // Sadece bir kere çalıştır

  const handleRemoveItem = async (id: string) => {
    try {
      await deleteCartItem(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
      toast.success("Item removed from cart");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };
  console.log(cartItems);
  const handleQuantityChange = async (id: string, quantity: number) => {
    try {
      // Yerel durumu güncelle
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      );

      // API üzerindeki veriyi güncelle
      await updateCartItemQuantity(
        id,
        Math.max(1, quantity),
        cartItems.find((item) => item.id === id)
      );

      // Bildirim göster
      toast.success("Quantity updated successfully");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleApplyPromoCode = (code: string) => {
    if (code === "rigel") {
      toast.success("Promo code applied: rigel");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handleBuyProducts = async () => {
    try {
      // Sepetteki her ürün için
      for (const item of cartItems) {
        // Ürünü getir
        const product = await getProduct(item.id);

        // Ürünün boyutunu güncelle
        if (product.sizes && product.sizes[item.size]) {
          // Ürün miktarı yeterli mi kontrol et
          if (product.sizes[item.size] >= item.quantity) {
            product.sizes[item.size] -= item.quantity;
            product.stock -= item.quantity;

            await OrderApi(item);

            // Ürünü güncelle
            await updateProduct(item.id, product);
          } else {
            // Ürün boyutu mevcut değilse veya yetersizse hata göster ve işlemi durdur
            toast.error("Ürün bilgileri eksik veya hatalı: " + item.name);

            return;
          }
        } else {
          // Sepette yeterli miktarda ürün yoksa hata göster ve işlemi durdur
          toast.error("Yeterli stok bulunamadı: " + item.name);
          return;
        }

        // Sepetteki ürünü sil
        await deleteCartItem(item.id);
      }

      // Başarılı satın alma mesajı göster
      toast.success("Tüm ürünler başarıyla satın alındı!");
    } catch (error) {
      // Hata durumunda işlemi durdur ve hatayı konsola yazdır
      console.error("Satın alma işlemi sırasında hata oluştu:", error);
      // Kullanıcıya hata mesajı göster
      toast.error(
        "Satın alma işlemi sırasında bir hata oluştu, lütfen tekrar deneyin."
      );
    } finally {
      // Sepeti boşalt
      setCartItems([]);
      //sayfayı yenile
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-w-screen flex container mx-auto mt-5 ">
      <div className="w-full  block  lg:flex">
        <div className="lg:w-3/4 bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-300 lg:mr-5">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              size={item.size}
              color={item.color}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
              onQuantityChange={(id, quantity) =>
                handleQuantityChange(id, quantity)
              }
              onRemove={(id) => handleRemoveItem(id)}
            />
          ))}
        </div>
        <OrderSummary
          subtotal={subtotal}
          discount={discount}
          deliveryFee={deliveryFee}
          total={total}
          onApplyPromoCode={handleApplyPromoCode}
          onBuyProducts={handleBuyProducts}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
