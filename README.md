# Products Catalog Mobile App

A React Native mobile application that allows users to browse and filter products from the DummyJSON API. Built with Expo Dev Client, TypeScript, and React Query for optimal performance and user experience.

## Features

- 📱 Product catalog with infinite scroll using FlashList for optimal performance
- 🔍 Filter products by category
- 📊 Sort products by price or rating
- 📝 Detailed product view
- 📅 iOS Purchase Reminder (Native Module)
- 🔄 Efficient data caching with React Query
- 🎯 Deep linking support

## Technical Stack

- **Framework**: React Native with Expo (Dev Client)
- **Language**: TypeScript
- **State Management**: React Query for server state
- **Navigation**: React Navigation
- **Native Modules**: Expo Modules for iOS Purchase Reminder
- **Styling**: React Native StyleSheet
- **Performance**: FlashList for efficient list rendering

## Key Technical Implementations

### Data Management

- Implemented React Query for efficient data fetching and caching
- Infinite scroll with automatic data prefetching using FlashList
- Automatic background refetching for data freshness

### Native Integration

- iOS Purchase Reminder using Expo Modules
- Native calendar integration for product reminders
- Platform-specific implementations for optimal performance

### Architecture

- Clean architecture with separation of concerns
- Custom hooks for business logic
- Type-safe API integration
- Error handling and loading states
- Deep linking support for product and category navigation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn or npm
- iOS Simulator or Android Emulator
- Expo CLI

### Installation

1. Clone the repository

```bash
git clone https://github.com/bryanscalzo97/products-catalog-mobile.git
```

2. Install dependencies

```bash
yarn install
```

3. Start the development server

```bash
yarn start
```

4. Run on iOS

```bash
yarn ios
```

5. Run on Android

```bash
yarn android
```

## Project Structure

```
├── modules/        # Native modules
│   └── purchase-reminder/  # iOS Purchase Reminder native module
├── src/
│   ├── api/           # API integration and types
│   │   └── productsApi.ts    # Products API endpoints
│   ├── mappers/       # Data transformation layer
│   │   └── productMapper.ts  # Product data mapping
│   ├── models/        # Type definitions
│   ├── navigation/    # Navigation configuration
│   ├── repositories/  # Data access layer
│   ├── screens/       # App screens
│   └── services/      # Api Client logic
```

## Deep Linking

The app supports deep linking for both products and categories.

### Testing Deep Links

#### For Product Details

```bash
# iOS
npx uri-scheme open exp+products-catalog://product/24 --ios

# Android
npx uri-scheme open exp+products-catalog://product/24 --android
```

#### For Categories

```bash
# iOS
npx uri-scheme open exp+products-catalog://category/beauty --ios

# Android
npx uri-scheme open exp+products-catalog://category/beauty --android
```

### Available URL Schemes

| Type     | URL Scheme                               | Example                                  |
| -------- | ---------------------------------------- | ---------------------------------------- |
| Product  | `exp+products-catalog://product/{id}`    | `exp+products-catalog://product/24`      |
| Category | `exp+products-catalog://category/{name}` | `exp+products-catalog://category/beauty` |

## Future Improvements

- [ ] Android Purchase Reminder implementation
- [ ] Clean up and refactor iOS Purchase Reminder native module
- [ ] Add theme styling
- [ ] Unit and integration tests
- [ ] Enhance UX/UI
- [ ] Search Bar
- [ ] Add Icon and improve logic for notifications
- [ ] Add SplashScreen

## API Integration

The app uses the [DummyJSON Products API](https://dummyjson.com/docs/products) for:

- Product listing
- Category filtering
- Product details
- Sorting options
