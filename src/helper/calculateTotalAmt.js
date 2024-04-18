const calculateTotalAmt = (products, productDetails) => {
  let totalPrice = 0;

  productDetails.forEach((item) => {
    const eachProduct = products.find(
      (product) => product._id == item.product_id
    );
    if (eachProduct) {
      let productPrice = eachProduct.price * item.quantity;
      totalPrice = totalPrice + productPrice;
    }
  });
  
  return totalPrice;
};

module.exports = { calculateTotalAmt };
