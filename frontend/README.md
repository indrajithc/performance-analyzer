# Performance Report Analyzer

This React application provides a user-friendly interface to analyze and monitor the performance of web pages using the Google PageSpeed Insights API. Users can input a URL to fetch and visualize performance data, including historical trends.

---

## Features

- **URL Analysis**: Enter a URL to analyze its performance using the PageSpeed Insights API.
- **Interactive UI**: Responsive full-width URL input similar to Google PageSpeed Insights.
- **Validation**: Real-time URL validation with error messages.
- **Loading State**: A spinner indicates when analysis is in progress.
- **Toast Notifications**: Feedback for success or error scenarios.
- **Graph Visualization**: Historical performance data visualized using D3.js.
- **Tailwind CSS**: Modern, responsive styling.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/indrajithc/performance-analyzer.git
   cd performance-analyzer/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

---

## API Integration

The app integrates with the Google PageSpeed Insights API. Ensure you replace any API keys or backend details in the code as needed.

---

## Scripts

- `npm start`: Runs the app in development mode.
- `npm build`: Builds the app for production.
- `npm test`: Runs tests using React Testing Library.

---

## Project Structure

```plaintext
frontend/
├── public/          # Public assets (e.g., favicon, index.html)
├── src/
│   ├── components/  # Reusable React components
│   ├── pages/       # Page-specific components
│   ├── utils/       # Utility functions (e.g., cookie helpers, validation)
│   ├── App.js       # Main app component
│   └── index.js     # Entry point
├── package.json     # Project metadata and dependencies
└── tailwind.config.js # Tailwind CSS configuration
```

---

## Dependencies

- **React**: Core UI framework.
- **React Hook Form**: For form validation and handling.
- **D3.js**: Visualization library for charts and graphs.
- **React Toastify**: Toast notifications for user feedback.
- **Tailwind CSS**: For styling.

---

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request for review.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
