A strategic decision tree tool to help organizations determine if AI adds unique value to their problems. This interactive web application guides users through a series of questions to provide tailored recommendations on AI implementation.

## Features

- **Interactive Decision Tree**: Step-by-step assessment with clear navigation
- **Professional Design**: Clean, modern interface with responsive design
- **Progress Tracking**: Visual progress indicators and step counting
- **Offline Capability**: Works without internet connection using service workers
- **Comprehensive Results**: Detailed recommendations with case studies and actionable steps
- **Mobile Friendly**: Optimized for all devices and screen sizes

## Assessment Flow

The tool evaluates six key areas:

1. **Problem Characteristics**: Data volume, patterns, and repetitive tasks
2. **Traditional Solutions**: Effectiveness of existing methods
3. **Problem Scope**: Specific vs. broad/complex problems
4. **Human Involvement**: Automation vs. augmentation needs
5. **Risk Assessment**: Ethical, privacy, and transparency concerns
6. **Organizational Readiness**: Infrastructure and personnel capabilities

## Deployment to GitHub Pages

### Step-by-Step Instructions

1. **Create a GitHub Repository**
   ```bash
   # Create a new repository on GitHub (e.g., "ai-decision-tree")
   # Clone it locally or upload files directly
   ```

2. **Upload Files**
   - Upload all files from this directory to your GitHub repository:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `sw.js`
     - `README.md`

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/repository-name`
   - It may take a few minutes to deploy initially

### Alternative Deployment Options

- **Netlify**: Drag and drop the folder to netlify.com for instant deployment
- **Vercel**: Connect your GitHub repository for automatic deployments
- **GitHub Codespaces**: Use for development and testing

## Technical Details

### Browser Compatibility
- Chrome (recommended)
- Safari
- Firefox
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Offline Functionality
The tool uses a service worker to cache all resources, enabling:
- Complete offline functionality
- Fast loading on repeat visits
- Reliable performance in poor network conditions

### Accessibility Features
- Keyboard navigation support
- ARIA labels for screen readers
- High contrast design
- Responsive text sizing

## File Structure

```
ai-decision-tree/
├── index.html          # Main HTML file with decision tree structure
├── styles.css          # Professional styling with responsive design
├── script.js           # Interactive functionality and decision logic
├── sw.js              # Service worker for offline capability
└── README.md          # Documentation and deployment instructions
```

## Customization

### Styling
- Colors can be modified in `styles.css`
- Font families can be changed in the CSS file
- Layout adjustments for different screen sizes

### Content
- Question text can be updated in `index.html`
- Decision flow logic can be modified in `script.js`
- Case studies and examples can be customized

### Analytics
- Google Analytics can be added to track usage
- Custom event tracking for decision paths
- A/B testing for different question formats

## Development

### Local Development
1. Open `index.html` in a web browser
2. Use browser developer tools for debugging
3. Test offline functionality by disabling network

### Testing
- Test all decision paths
- Verify responsive design on different devices
- Check accessibility with screen readers
- Validate offline functionality

## License

This project is open source and available under the MIT License.

## Support

For questions or issues:
1. Check the browser console for error messages
2. Ensure all files are properly uploaded
3. Verify GitHub Pages is enabled correctly
4. Test in different browsers

## Version History

- **v1.0.0**: Initial release with complete decision tree functionality
  - Interactive assessment flow
  - Professional design
  - Offline capability
  - Mobile responsiveness
  - Comprehensive recommendations

## Contributing

Feel free to submit issues and enhancement requests. Contributions are welcome for:
- Additional case studies
- UI/UX improvements
- Accessibility enhancements
- Performance optimizations
