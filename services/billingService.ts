import { Product, PurchaseResult } from '../types';

// Simulated Google Play Billing Service
// In a real TWA (Trusted Web Activity), this would use the Digital Goods API or a bridge to native code.

export const PRODUCTS: Product[] = [
  {
    id: 'com.instavault.pro_monthly',
    title: 'Pro Plan',
    price: '$4.99',
    description: 'Advanced power for heavy users.',
    tier: 'pro',
    features: []
  },
  {
    id: 'com.instavault.ultimate_monthly',
    title: 'Ultimate Plan',
    price: '$19.99',
    description: 'Complete control for business users.',
    tier: 'ultimate',
    features: []
  }
];

class BillingService {
  private isConnected: boolean = false;

  // Simulate connecting to Google Play Store
  async connect(): Promise<boolean> {
    console.log("Connecting to Google Play Billing...");
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isConnected = true;
        console.log("Connected to Google Play Billing.");
        resolve(true);
      }, 1500);
    });
  }

  // Simulate the purchase flow
  async purchase(productId: string): Promise<PurchaseResult> {
    if (!this.isConnected) {
      await this.connect();
    }

    console.log(`Initiating purchase for: ${productId}`);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly simulate success or failure for testing
        const isSuccess = Math.random() > 0.1; // 90% success rate

        if (isSuccess) {
          const transactionId = 'GPA.' + Math.random().toString(36).substr(2, 16).toUpperCase();
          console.log(`Purchase Successful. Transaction ID: ${transactionId}`);
          resolve({
            success: true,
            message: 'Purchase successful! Your plan has been upgraded.',
            transactionId
          });
        } else {
          console.warn("Purchase Failed: User cancelled or payment declined.");
          resolve({
            success: false,
            message: 'Payment failed. Please check your Google Play payment settings.'
          });
        }
      }, 2000); // Simulate processing delay
    });
  }

  async restorePurchases(): Promise<any> {
    // Simulate restoring past purchases
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ hasPro: false, hasUltimate: false });
        }, 1000);
    });
  }
}

export const billingService = new BillingService();