import React from "react";
import { Formik, Form } from "formik";
import { MdOutlineChevronRight } from "react-icons/md";

interface PriceProps {
  onSelectPrice: (minPrice: number, maxPrice: number) => void;
}

const Price: React.FC<PriceProps> = ({ onSelectPrice }) => {
  return (
    <div className="flex flex-col border-b-2 mb-4">
      <div className="mb-4 container mx-auto">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold mb-4">Price</h3>
          <MdOutlineChevronRight />
        </div>
        <Formik
          initialValues={{ minPrice: 5, maxPrice: 500 }}
          onSubmit={(values) => {
            onSelectPrice(values.minPrice, values.maxPrice);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <span>Min: ${values.minPrice}</span>
                  <input
                    type="range"
                    min={5}
                    max={500}
                    value={values.minPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newMinPrice = parseInt(e.target.value);
                      setFieldValue("minPrice", newMinPrice);
                      onSelectPrice(newMinPrice, values.maxPrice); // Fiyat filtresini güncelle
                    }}
                    className="w-full mx-2"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span>Max: ${values.maxPrice}</span>
                  <input
                    type="range"
                    min={5}
                    max={500}
                    value={values.maxPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newMaxPrice = parseInt(e.target.value);
                      setFieldValue("maxPrice", newMaxPrice);
                      onSelectPrice(values.minPrice, newMaxPrice); // Fiyat filtresini güncelle
                    }}
                    className="w-full mx-2"
                  />
                </div>
                <div className="flex justify-between">
                  <span>${values.minPrice}</span>
                  <span>${values.maxPrice}</span>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Price;
