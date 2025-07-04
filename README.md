# stockscope
Professional stock tracking application with advanced analytics
StockScope - Advanced Stock Tracking Application

StockScope is a comprehensive, professional-grade stock tracking application built with Python and Tkinter. It provides advanced portfolio management, real-time market data, technical analysis, and secure authentication features.

## 🌟 Features

### 🔐 Authentication & Security
- **Firebase Authentication**: Secure email/password and phone number authentication
- **Multi-Factor Authentication (MFA)**: SMS-based two-factor authentication
- **Phone Number Sign-in**: Direct sign-in using phone number verification
- **Account Security Management**: Link/unlink phone numbers and manage MFA settings

### 📊 Portfolio Management
- **Stock Tracking**: Add, remove, and track stocks with real-time prices
- **Portfolio Analytics**: Comprehensive portfolio performance analysis
- **P&L Tracking**: Real-time profit/loss calculations with percentage gains
- **Portfolio Optimization**: Modern Portfolio Theory-based optimization
- **Risk Analysis**: Value at Risk (VaR), volatility, and correlation analysis
- **Sector Allocation**: Visual sector breakdown and analysis

### 📈 Advanced Analytics
- **Technical Indicators**: 
  - Bollinger Bands
  - MACD (Moving Average Convergence Divergence)
  - Stochastic Oscillator
  - Average True Range (ATR)
  - Support and Resistance Levels
- **Risk Metrics**: Beta calculation, Sharpe ratio, volatility analysis
- **Comprehensive Reports**: Detailed portfolio and stock analysis reports

### 📰 News & Market Data
- **Real-time News**: Web scraping from multiple sources (Yahoo Finance, MarketWatch, Reuters)
- **Market Overview**: Major indices tracking (S&P 500, Dow Jones, NASDAQ, VIX)
- **Stock-specific News**: Latest news for individual stocks
- **Market News**: General market updates and trends

### 🔔 Smart Notifications
- **Price Alerts**: Custom price level notifications
- **Earnings Reminders**: Automatic earnings date tracking
- **Desktop Notifications**: System-level notifications
- **Notification Center**: Centralized notification management
- **Priority-based Alerts**: High-priority alerts for important events

### 📊 Advanced Charting
- **Interactive Charts**: Price history with multiple timeframes
- **Technical Analysis Charts**: Bollinger Bands, MACD, Stochastic visualizations
- **Support/Resistance**: Automated support and resistance level identification
- **Chart Controls**: Customizable chart periods and indicators

### 🎯 Stock Screener
- **Custom Filters**: Price, volume, market cap, and technical filters
- **Screening Results**: Filtered stock lists with key metrics
- **Export Capabilities**: Export screening results

### 📋 Data Management
- **Export Options**: JSON, CSV, and Excel export formats
- **Import Capabilities**: Import portfolio data from JSON files
- **Data Backup**: Automatic data persistence to Firebase
- **Cross-platform**: Works on Windows and macOS

### 🎨 User Interface
- **Modern Dashboard**: Comprehensive overview with portfolio summary
- **Tabbed Interface**: Organized sections for different features
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Adapts to different screen sizes
- **Auto-refresh**: Automatic data updates

### 🔄 Update System
- **Version Tracking**: Current version and build date tracking
- **Update Checker**: Automatic update detection
- **GitHub Integration**: Check for updates from GitHub releases
- **Update Notifications**: Notify users of available updates

## 🚀 Installation

### Prerequisites
- Python 3.7 or higher
- Firebase project with Authentication and Realtime Database enabled

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/stockscope.git
   cd stockscope
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Phone Number providers)
   - Enable Realtime Database
   - Get your Firebase API key and database URL
   - Update `config.py` with your Firebase credentials

4. **Run the application**:
   ```bash
   python main.py
   ```

## 📱 Usage Guide

### Getting Started
1. **Launch StockScope**: Run `python main.py`
2. **Create Account**: Sign up with email/password or phone number
3. **Add Stocks**: Use the "Add Stock" button to add stocks to your watchlist
4. **Explore Features**: Navigate through different tabs to explore features

### Dashboard
- **Portfolio Summary**: View total portfolio value, P&L, and top performers
- **Market Overview**: Real-time major indices data
- **Quick Actions**: Fast access to common features

### Portfolio Management
1. **Add Stocks**: Enter ticker symbols to add stocks
2. **Portfolio Data**: Enter shares and purchase price for portfolio tracking
3. **Status Management**: Color-code stocks by status (Watchlist, Bought, Sold)
4. **Notes**: Add personal notes for each stock

### Technical Analysis
1. **Select Stock**: Choose a stock from your list
2. **View Charts**: Navigate to Charts or Advanced Charts tabs
3. **Technical Indicators**: View Bollinger Bands, MACD, Stochastic, etc.
4. **Analytics**: Get comprehensive analysis in the Analytics tab

### Notifications
1. **Set Alerts**: Add price alerts or earnings reminders
2. **Notification Center**: Click the bell icon to view all notifications
3. **Settings**: Configure notification preferences

### Data Export/Import
1. **Export Data**: Use Tools tab to export portfolio data
2. **Import Data**: Import previously exported data
3. **Multiple Formats**: Choose from JSON, CSV, or Excel formats

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication with Email/Password and Phone Number providers
3. Enable Realtime Database
4. Update `config.py`:
   ```python
   FIREBASE_API_KEY = "your-api-key"
   FIREBASE_DATABASE_URL = "your-database-url"
   ```

### Update Checker
Update `version.py` with your GitHub repository:
```python
GITHUB_REPO = "https://api.github.com/repos/yourusername/stockscope/releases/latest"
```

## 📊 Features in Detail

### Portfolio Optimization
- Uses Modern Portfolio Theory (MPT)
- Calculates optimal asset allocation
- Minimizes portfolio volatility
- Maximizes Sharpe ratio
- Supports target return constraints

### Risk Analysis
- **Portfolio Volatility**: Annualized volatility calculation
- **Value at Risk (VaR)**: 95% confidence level risk measure
- **Maximum Drawdown**: Worst historical decline
- **Correlation Matrix**: Stock correlation analysis
- **Diversification Score**: Portfolio diversification measure

### Advanced Analytics
- **Beta Calculation**: Market risk measurement
- **Sharpe Ratio**: Risk-adjusted return metric
- **Technical Indicators**: Professional-grade technical analysis
- **Support/Resistance**: Automated level identification
- **Volume Analysis**: Trading volume insights

### News Integration
- **Multi-source News**: Yahoo Finance, MarketWatch, Reuters
- **Real-time Updates**: Latest market and stock news
- **Source Attribution**: Clear source identification
- **Error Handling**: Graceful fallback for network issues

## 🛠️ Technical Details

### Architecture
- **Frontend**: Tkinter GUI framework
- **Backend**: Python with Firebase integration
- **Data Sources**: Yahoo Finance API, web scraping
- **Authentication**: Firebase Authentication
- **Database**: Firebase Realtime Database

### Dependencies
- `requests`: HTTP requests and API calls
- `yfinance`: Yahoo Finance data
- `matplotlib`: Chart generation
- `numpy`: Numerical computations
- `pandas`: Data manipulation
- `scipy`: Portfolio optimization
- `beautifulsoup4`: Web scraping
- `plyer`: Desktop notifications
- `openpyxl`: Excel export

### Security Features
- Firebase Authentication
- Multi-factor authentication
- Phone number verification
- Secure data storage
- Session management

## 🔄 Update Process

### Automatic Updates
1. Application checks for updates on startup
2. Compares current version with GitHub releases
3. Notifies user if update is available
4. Provides download link to latest release

### Manual Updates
1. Click "Check for Updates" in Tools tab
2. View update information
3. Download and install new version

## 🐛 Troubleshooting

### Common Issues

**Firebase Connection Error**:
- Verify API key and database URL in `config.py`
- Check internet connection
- Ensure Firebase project is properly configured

**Stock Data Not Loading**:
- Check internet connection
- Verify ticker symbol is correct
- Yahoo Finance API may have rate limits

**Authentication Issues**:
- Verify Firebase Authentication is enabled
- Check phone number format for SMS verification
- Ensure MFA is properly configured

**Chart Display Issues**:
- Install matplotlib backend: `pip install matplotlib`
- Check display settings
- Verify data availability

### Performance Tips
- Limit number of stocks for faster loading
- Use auto-refresh sparingly
- Close unused tabs
- Regular data cleanup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Yahoo Finance for market data
- Firebase for authentication and database
- Matplotlib for charting capabilities
- Open source community for libraries and tools

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the documentation

---

**StockScope** - Professional stock tracking made simple and powerful. 
