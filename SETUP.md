# Payment Gateway Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

## Setup Steps

### 1. Razorpay Setup
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Create an account or log in
3. Go to Settings > API Keys
4. Generate API keys (Test mode for development)
5. Copy the Key ID and Key Secret to your `.env.local` file

### 2. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string and add it to `.env.local`

### 3. Running the Application
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Features

- ✅ Beautiful homepage with payment form
- ✅ Name collection before payment
- ✅ Razorpay integration for ₹1 payment
- ✅ Payment verification and signature validation
- ✅ MongoDB storage for payment details
- ✅ Success page with 5-second redirect
- ✅ Responsive design with Tailwind CSS

## Payment Flow

1. User enters their name on homepage
2. Clicks "Pay ₹1 Now" button
3. Razorpay payment modal opens
4. User completes payment
5. Payment is verified on the server
6. Payment details are stored in MongoDB
7. User is redirected to success page
8. Success page shows confirmation and redirects to homepage after 5 seconds
