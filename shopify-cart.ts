interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

class ShopifyCart {
  private cart: CartItem[] = [];
  private isModificationInProgress: boolean = false;

  public addToCart(product: CartItem) {
    if (this.isModificationInProgress) return;

    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.updateCartUI();
    this.submitCartChanges();
  }

  public removeFromCart(productId: string) {
    if (this.isModificationInProgress) return;

    this.cart = this.cart.filter(item => item.id !== productId);
    this.updateCartUI();
    this.submitCartChanges();
  }

  public updateQuantity(productId: string, newQuantity: number) {
    if (this.isModificationInProgress) return;

    const item = this.cart.find(item => item.id === productId);

    if (item) {
      item.quantity = newQuantity;
      this.updateCartUI();
      this.submitCartChanges();
    }
  }

  public setUpSellProductCondition(productId: string) {
    const productXInCart = this.cart.find(item => item.id === productId);
    
    if (productXInCart) {
      // Add the upsell product Y to the cart
      this.addToCart({
        id: 'productY',
        title: 'Product Y (Upsell)',
        price: 15,
        quantity: 1,
      });
    }
  }

  public setIsModificationInProgress(inProgress: boolean) {
    this.isModificationInProgress = inProgress;
    // Disable or enable controls based on inProgress value
  }

  private updateCartUI() {
    // Update the UI
  }

  private submitCartChanges() {
    // Submit cart changes
  }
}

const cart = new ShopifyCart();

// Example:
cart.addToCart({
  id: 'product1',
  title: 'Product 1',
  price: 10,
  quantity: 1,
});

cart.updateQuantity('product1', 2);
cart.removeFromCart('product1');
cart.setUpSellProductCondition('product1');
cart.setIsModificationInProgress(true); // Disable controls
cart.setIsModificationInProgress(false); // Enable controls
