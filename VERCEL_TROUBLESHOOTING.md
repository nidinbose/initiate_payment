# Vercel Deployment Troubleshooting Guide

## Common Payment Verification Issues on Vercel

### 1. Environment Variables Not Set
**Problem**: Payment verification fails with "Server configuration error"
**Solution**: 
- Go to your Vercel dashboard
- Navigate to your project settings
- Add these environment variables:
  ```
  RAZORPAY_KEY_ID=your_key_id_here
  RAZORPAY_KEY_SECRET=your_key_secret_here
  NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id_here
  MONGODB_URI=your_mongodb_connection_string
  ```
- Redeploy your application

### 2. MongoDB Connection Issues
**Problem**: Database connection fails on Vercel
**Solution**:
- Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
- Check if your MongoDB URI is correct
- Verify database user permissions
- Test connection locally first

### 3. Razorpay Webhook vs Handler Issues
**Problem**: Signature verification fails
**Solution**:
- The current implementation uses Razorpay's client-side handler
- For production, consider implementing webhooks for better reliability
- Ensure you're using the correct key secret (not key ID)

### 4. CORS Issues
**Problem**: API calls fail from client
**Solution**:
- Vercel handles CORS automatically for same-origin requests
- If using custom domains, ensure they're properly configured

### 5. Build Errors
**Problem**: Build fails on Vercel
**Solution**:
- Check Node.js version compatibility
- Ensure all dependencies are in package.json
- Check for TypeScript errors if using TypeScript

## Debugging Steps

### 1. Check Vercel Function Logs
```bash
# Install Vercel CLI
npm i -g vercel

# View function logs
vercel logs your-project-name
```

### 2. Test API Endpoints Directly
```bash
# Test order creation
curl -X POST https://your-domain.vercel.app/api/create-order \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","amount":200}'
```

### 3. Verify Environment Variables
```javascript
// Add this to your API route temporarily
console.log('Environment check:', {
  hasKeyId: !!process.env.RAZORPAY_KEY_ID,
  hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
  hasMongoUri: !!process.env.MONGODB_URI
});
```

## Production Best Practices

### 1. Use Webhooks Instead of Client-Side Verification
```javascript
// webhook route: /api/razorpay-webhook
export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('x-razorpay-signature');
  
  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
    
  if (expectedSignature === signature) {
    // Process payment
  }
}
```

### 2. Add Error Monitoring
```javascript
// Add to your API routes
try {
  // payment logic
} catch (error) {
  // Log to external service (Sentry, LogRocket, etc.)
  console.error('Payment error:', error);
  // Return user-friendly error
}
```

### 3. Implement Retry Logic
```javascript
// Add retry mechanism for database operations
const savePaymentWithRetry = async (paymentData, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await payment.save();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

## Testing Checklist

- [ ] Environment variables are set in Vercel dashboard
- [ ] MongoDB connection works from Vercel functions
- [ ] Razorpay credentials are correct (test mode vs live mode)
- [ ] Payment flow works end-to-end
- [ ] Success page redirects properly
- [ ] Database saves payment records
- [ ] Error handling works gracefully

## Quick Fix Commands

```bash
# Redeploy with fresh environment variables
vercel --prod

# Check function logs
vercel logs --follow

# Test local build
npm run build && npm start
```
