# Amiibo Viewer

A modern, responsive web application for browsing and discovering Nintendo Amiibo figures, cards, and accessories. Built with vanilla JavaScript, HTML5, and CSS3, this application provides an intuitive interface for filtering and exploring the vast collection of Amiibo products.

## 🌟 Features

### **Multi-Filter Search System**
- **Character Filter**: Search by specific Amiibo characters (Mario, Link, Pikachu, etc.)
- **Game Series Filter**: Browse by video game franchises (Super Mario, The Legend of Zelda, Animal Crossing, etc.)
- **Amiibo Series Filter**: Filter by specific Amiibo product lines (Super Smash Bros., Animal Crossing, etc.)
- **Type Filter**: Filter by physical format (Figure, Card, Band, Yarn, Block)

### **Interactive Table Results**
- **Real-time Filtering**: Results update instantly as you select filters
- **Comprehensive Data**: View Amiibo Series, Character, Game Series, and Type for each result
- **Clickable Rows**: Click any amiibo in the table to view detailed information

### **Detailed Information Cards**
- **Visual Display**: High-quality amiibo images with responsive layout
- **Complete Information**: 
  - Basic details (name, character, series, type)
  - Technical identifiers (Head ID, Tail ID)
  - Regional release dates (North America, Europe, Japan, Australia)
- **Multiple Close Options**: Close with button, clicking outside, or pressing Escape

### **User Experience Features**
- **Clear/Reset Functionality**: Remove individual filter selections with clear buttons
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Visual feedback during API requests
- **Error Handling**: Graceful handling of network issues and missing data
- **Keyboard Navigation**: Full keyboard support for accessibility

## 🚀 Getting Started

### **Prerequisites**
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (required for API access)

### **Installation**
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start browsing Amiibo!

### **Usage**
1. **Select Filters**: Choose one or more filters from the dropdown menus
2. **View Results**: The table will automatically populate with matching amiibo
3. **Explore Details**: Click on any amiibo row to view detailed information
4. **Clear Filters**: Use the "×" buttons to remove individual selections

## 🔌 API Dependencies

This application depends on the following external services:

### **Amiibo API**
- **Base URL**: `https://www.amiiboapi.com/api/`
- **Service**: Free, community-maintained API for Nintendo Amiibo data
- **Endpoints Used**:
  - `/character/` - List of all Amiibo characters
  - `/gameseries/` - List of all game series
  - `/amiiboseries/` - List of all Amiibo series
  - `/type/` - List of all Amiibo types
  - `/amiibo/` - Detailed Amiibo information with filtering

### **Image Hosting**
- **Provider**: GitHub (via Amiibo API)
- **URL Pattern**: `https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_[head]-[tail].png`
- **Content**: Official Amiibo product images

## 🛠️ Technical Architecture

### **Frontend Technologies**
- **HTML5**: Semantic markup with modern features
- **CSS3**: Responsive design with Flexbox, Grid, and modern styling
- **Vanilla JavaScript**: No frameworks - pure ES6+ JavaScript
- **Fetch API**: Modern HTTP client for API requests

### **Browser Compatibility**
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### **Performance Features**
- **Lazy Loading**: Images load only when displayed
- **Efficient Filtering**: Client-side filtering for responsive interactions
- **Optimized Requests**: Parallel API calls for faster loading
- **Responsive Images**: Adaptive image sizing for different screen sizes

## 📱 Responsive Design

### **Desktop (768px+)**
- Four-column filter layout
- Side-by-side image and details in info cards
- Full table display with hover effects

### **Mobile (<768px)**
- Stacked filter layout
- Vertical image and details layout
- Optimized touch interactions
- Smaller fonts and spacing

## 🎨 Design Features

### **Visual Elements**
- **Modern UI**: Clean, professional interface with subtle shadows and gradients
- **Color Scheme**: Blue primary colors with consistent branding
- **Typography**: System fonts for optimal performance and readability
- **Icons**: Unicode symbols for clear visual communication

### **Accessibility**
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Friendly**: Proper semantic HTML and ARIA labels
- **High Contrast**: Readable color combinations
- **Focus Indicators**: Clear visual feedback for keyboard users

## 🔧 Development

### **File Structure**
```
amiiboviewer/
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling and responsive design
├── script.js           # JavaScript functionality and API integration
└── README.md           # This documentation file
```

### **Key Functions**
- **API Integration**: Fetch and display data from Amiibo API
- **Filter Management**: Handle multiple filter selections and clearing
- **Modal System**: Display detailed amiibo information
- **Responsive Layout**: Adapt interface for different screen sizes

## 📊 Data Sources

### **Amiibo Information**
- **Characters**: 800+ unique Amiibo characters
- **Game Series**: 100+ video game franchises
- **Amiibo Series**: 30+ product lines
- **Types**: 5 different physical formats
- **Images**: High-quality product photos
- **Release Data**: Regional availability information

### **Data Updates**
- API is community-maintained and updated regularly
- New Amiibo releases are added as they become available
- Historical data includes discontinued and limited edition items

## 🐛 Troubleshooting

### **Common Issues**
- **No Results**: Ensure at least one filter is selected
- **Images Not Loading**: Check internet connection and try refreshing
- **API Errors**: Service may be temporarily unavailable - try again later

### **Browser Requirements**
- JavaScript must be enabled
- Modern browser with Fetch API support
- Stable internet connection for API access

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 🙏 Acknowledgments

- **Amiibo API**: Thanks to [N3evin](https://github.com/N3evin/AmiiboAPI) for maintaining the comprehensive Amiibo API
- **Nintendo**: For creating the amazing Amiibo ecosystem
- **Community**: Thanks to all Amiibo collectors and enthusiasts

---

**Note**: This application is not affiliated with Nintendo Co., Ltd. Amiibo is a trademark of Nintendo. All Amiibo data and images are provided through the community-maintained Amiibo API.
