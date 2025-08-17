# Rwanda Land Management System

A comprehensive digital land management platform for Rwanda with blockchain integration and secure transactions.

## Features

### User Management
- **Admin Users**: Can verify users, approve land sales, and manage the system
- **Regular Users**: Can buy, sell, and manage their land parcels
- **NIDA Integration**: Secure authentication using Rwanda National ID
- **Biometric Authentication**: Fingerprint-based login support

### Land Management
- **Digital Land Registry**: Secure blockchain-based land records
- **Land Verification**: Admin-verified land parcels with official documentation
- **Interactive Maps**: Visual representation of land parcels
- **Document Management**: Upload and manage land certificates and surveys

### Land Selling System
- **QR Code Generation**: Unique QR codes for each land sale
- **Blockchain Hashes**: Secure transaction tracking
- **Buyer-Seller Matching**: Scan QR codes to find lands for sale
- **Admin Approval Workflow**: Secure payment verification and land transfer

### Transaction Management
- **Pending Transactions**: Track ongoing land sales
- **Payment Confirmation**: Admin-verified payment processing
- **Automatic Land Transfer**: Ownership changes upon admin approval
- **Transaction History**: Complete audit trail of all transactions

## Test Users

The system comes with pre-configured test users for easy testing:

### Admin User
- **NIDA ID**: `1195432109876543`
- **Password**: `admin123`
- **Role**: Admin
- **Capabilities**: Verify users, approve sales, manage system

### Seller (User with Lands)
- **NIDA ID**: `1199780123456789`
- **Password**: `seller123`
- **Role**: Citizen
- **Lands**: 4 land parcels (3 available for sale, 1 personal)

### Buyer (User without Lands)
- **NIDA ID**: `1198765432109876`
- **Password**: `buyer123`
- **Role**: Citizen
- **Lands**: None (ready to purchase)

## Testing the Land Selling Workflow

1. **Login as Seller** (`1199780123456789` / `seller123`)
   - View your land parcels in "My Lands"
   - Click "Sell Land" on any verified parcel
   - Set asking price and create sale
   - Note the QR code generated

2. **Login as Buyer** (`1198765432109876` / `buyer123`)
   - Click "Buy Land" button
   - Enter the QR code from step 1
   - Express interest in the land
   - Transaction becomes pending

3. **Login as Admin** (`1195432109876543` / `admin123`)
   - View pending sales in admin dashboard
   - Approve payment (simulates payment verification)
   - Land ownership automatically transfers to buyer

## Database Setup

Run the following scripts in order:
1. `scripts/init-database.sql` - Create database schema
2. `scripts/enhanced-schema.sql` - Add selling system tables
3. `scripts/complete-test-data.sql` - Load comprehensive test data

## API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/biometric` - Biometric authentication

### Land Management
- `GET /api/land/user/{userId}` - Get user's lands
- `GET /api/land/{id}` - Get land details
- `GET /api/land/all` - Get all lands (admin)

### Land Selling
- `POST /api/land-sales` - Create land sale
- `GET /api/land-sales/search?code={qr}` - Find sale by QR code
- `PATCH /api/land-sales/{id}` - Update sale status

### Admin Functions
- `GET /api/admin/pending-sales` - Get pending sales
- `GET /api/admin/unverified-users` - Get unverified users
- `POST /api/admin/verify-user/{userId}` - Verify user
- `POST /api/admin/approve-payment/{saleId}` - Approve payment

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Neon PostgreSQL with serverless driver
- **Authentication**: Custom NIDA-based auth system
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS with custom Rwanda-themed colors

## Security Features

- **Role-based Access Control**: Different interfaces for admin vs regular users
- **Blockchain Integration**: Secure transaction hashing
- **Admin Approval Required**: All land transfers require admin verification
- **Audit Trail**: Complete transaction history and logging
- **NIDA Verification**: Government ID integration for user verification
