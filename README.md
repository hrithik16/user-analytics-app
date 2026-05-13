# User Analytics App

A Node.js backend application for tracking and analyzing user interactions on websites. It captures page views and click events, stores them in MongoDB, and provides APIs for retrieving analytics data such as session information, event details, and heatmap data.

## Features

- Track user page views and clicks
- Store events with session IDs, timestamps, and coordinates
- Retrieve session summaries with event counts
- Get detailed events for specific sessions
- Generate heatmap data for click analysis
- RESTful API endpoints
- MongoDB integration with Mongoose

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd user-analytics-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables (see Environment Variables section).

4. Start the server:
   ```
   npm start
   ```
   Or for development with auto-restart:
   ```
   npx nodemon server.js
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- `MONGO_URI`: MongoDB connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/database`)
- `PORT`: Port number for the server (default: 5000)
- `WEBSITE_URL`: The URL of the website being tracked (e.g., `https://example.com`)

Example `.env` file:
```
MONGO_URI=mongodb+srv://jarvis:ironman@cluster-1.scqpxtj.mongodb.net/?appName=Cluster-1
PORT=5000
WEBSITE_URL=https://demo-site-five-sable.vercel.app/
```

## Usage

The application provides REST API endpoints for managing analytics data.

### API Endpoints

#### POST /api/events
Store a new event (page view or click).

**Request Body:**
```json
{
  "session_id": "unique-session-id",
  "event_type": "page_view" | "click",
  "page_url": "https://example.com/page",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "x": 100,  // Optional, for clicks
  "y": 200   // Optional, for clicks
}
```

**Response:** The created event object.

#### GET /api/sessions
Retrieve all sessions with event counts and last activity.

**Response:** Array of session objects:
```json
[
  {
    "session_id": "session-1",
    "totalEvents": 5,
    "lastActivity": "2023-01-01T00:00:00.000Z"
  }
]
```

#### GET /api/sessions/:sessionId
Get all events for a specific session.

**Response:** Array of event objects for the session.

#### GET /api/heatmap?page=page_url
Get click data for heatmap generation (filtered by WEBSITE_URL).

**Response:** Array of click coordinates with timestamps.

#### GET /api/all-clicks (Development)
Get all click events (for development purposes).

#### DELETE /api/clear (Development)
Delete all events from the database (for development purposes).

## Project Structure

- `app.js`: Main Express application setup
- `server.js`: Server startup and MongoDB connection
- `models/Event.js`: Mongoose schema for events
- `routes/analyticsRoutes.js`: API routes for analytics
- `.env`: Environment variables (not committed to version control)

## Dependencies

- `express`: Web framework
- `mongoose`: MongoDB ODM
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management

## Development

- Run with `npx nodemon server.js` for auto-restart on changes.
- The application uses CommonJS modules (`"type": "commonjs"` in package.json).

## License

ISC License

