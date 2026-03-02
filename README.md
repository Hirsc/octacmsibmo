# OCTACMSIBMO
**Other Calories Tracking Apps Charge Money So I Built My Own**

A personal mobile calorie tracking application built with Ionic, Capacitor, and Stencil. Track your daily calorie intake and macros without subscription fees or paywalls.

## 🎯 MVP Status: COMPLETE ✅

This project is now a fully functional Minimum Viable Product ready for user testing and deployment.

## ✨ Features

### Core Functionality
- **📱 Mobile-First Design**: Built for iOS and Android using Capacitor
- **📊 Complete Macro Tracking**: Track calories, protein, fat, and carbohydrates
- **📷 Smart Barcode Scanning**: Scan product barcodes for automatic nutritional data
- **✍️ Manual Food Entry**: Complete nutritional forms for custom food items
- **🎯 Goal Setting**: Set personalized daily calorie and macro targets
- **📈 Progress Visualization**: Color-coded progress bars showing daily progress
- **💾 Local Data Storage**: All data stored privately on your device
- **✅ Form Validation**: Comprehensive input validation for data accuracy

### User Experience
- **🌙 Dark Mode**: Toggle between light and dark themes with one tap
- **🎨 Theme Persistence**: Your theme preference is saved automatically
- **Smooth Transitions**: Animated theme changes for a polished experience
- **System Detection**: Automatically detects system preference on first launch

### Smart Features
- **Open Food Facts Integration**: Access millions of food products via barcode scan
- **Automatic Calculations**: Real-time macro totals and progress tracking
- **Persistent Goals**: Custom targets saved across app sessions
- **Data Privacy**: No cloud storage or data collection

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- iOS/Xcode (for iOS development) or Android Studio (for Android development)

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd octacmsibmo

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Development

```bash
# Development mode with hot reload
npm start

# Run linting
npm run lint

# Format code
npm run fmt

# Run tests
npm run test.unit
npm run test.e2e
```

## 📱 Usage

### Main Features

1. **Dashboard**: View daily progress against your goals
2. **Add Food**: Tap the barcode icon (left) to scan or create icon (right) for manual entry
3. **Set Goals**: Tap the flag icon to customize your daily targets
4. **Track Progress**: Monitor your daily intake with color-coded progress bars

### Quick Start Guide

1. **Set Your Goals**: Open the app → Tap flag icon → Adjust your daily targets
2. **Add Food**: Scan a barcode or enter food manually
3. **Track Progress**: Watch progress bars update in real-time
4. **Stay on Track**: Monitor your daily calorie and macro intake

## 🛠️ Tech Stack

- **Frontend**: Stencil.js components with Ionic 6
- **Mobile Platform**: Capacitor 3.4 for iOS/Android deployment
- **State Management**: @stencil/store
- **Routing**: @stencil/router
- **Storage**: @capacitor/storage (local device storage)
- **Barcode Scanning**: @zxing/library
- **API Integration**: Open Food Facts API
- **Build Tool**: Stencil 2.14
- **Language**: TypeScript 4.5

## 📋 Project Structure

```
src/
├── components/           # Stencil components
│   ├── app-root/        # Root application with routing
│   ├── goals-settings/  # Daily goal configuration
│   ├── calories-tracker/# Main tracking features
│   │   ├── scan-food.tsx      # Barcode scanning with auto-populate
│   │   ├── add.tsx            # Manual food entry
│   │   ├── day-overview.tsx   # Main dashboard
│   │   └── service/           # Food tracking service
│   └── toasts/           # UI notifications
├── services/            # Business logic services
│   ├── storage.ts       # Storage wrapper
│   └── goals.ts         # Goal management
├── entities/            # TypeScript interfaces
│   ├── food.ts          # Food and macros types
│   ├── goals.ts         # Daily goals types
│   └── food-information.ts # API response types
├── utils/               # Helper functions
│   ├── food-validation.ts    # Input validation
│   └── goals-validation.ts   # Goals validation
└── open-food-facts/     # Open Food Facts API integration
```

## 🧪 Testing

See **[TESTING.md](TESTING.md)** for comprehensive testing instructions including:
- Feature testing checklists
- Integration testing scenarios
- Troubleshooting guide
- Test results template

## 📖 Documentation

- **[CLAUDE.md](CLAUDE.md)** - Project documentation and setup
- **[PURPOSE.md](PURPOSE.md)** - Project purpose and philosophy
- **[NEXT_STEPS.md](NEXT_STEPS.md)** - Development roadmap and MVP status
- **[TESTING.md](TESTING.md)** - Comprehensive testing guide

## 🎯 MVP Features

### ✅ Implemented
- Manual food entry with complete nutritional tracking
- Barcode scanning with automatic data population
- Daily goal setting and progress tracking
- Data persistence across app sessions
- Form validation and error handling
- Color-coded progress visualization

### 🔜 Future Enhancements
- Food item editing functionality
- Weekly/monthly progress reports
- Export/import data capabilities
- Enhanced offline support
- Nutritional insights and recommendations

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

MIT License - see LICENSE file for details

## 🎉 Acknowledgments

- **Open Food Facts**: Free, open-source food products database
- **Ionic Framework**: Mobile UI components
- **Stencil.js**: Web component compiler
- **Capacitor**: Cross-platform native runtime

---

**Built with ❤️ for personal calorie tracking freedom**

*Project Status: MVP Complete | Ready for User Testing*
