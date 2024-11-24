# JSON File Storage API

This is a simple API for storing, retrieving, and managing JSON files based on keys and IDs. It serves as a basic key-value store for JSON data. The application allows saving, fetching by key, and retrieving data by key and ID. It also includes static file serving for a React app.

## Features

- **Save JSON**: Save JSON data associated with a unique key.
- **Get All JSON by Key**: Retrieve all JSON files associated with a key.
- **Get JSON by Key and ID**: Retrieve a specific JSON file based on its key and ID.
- **Health Check**: A simple health check endpoint for server monitoring.
- **Static File Serving**: Serves static files (React build) when requested.

## Endpoints

### Health Check
- **URL**: `/health`
- **Method**: `POST`
- **Response**: `OK` with status code `200`

### Save JSON
- **URL**: `/api/save`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
      "key": "uniqueKey",
      "json": { "field": "value" }
    }
    ```
- **Response**:
    ```json
    {
      "id": "uniqueId",
      "key": "uniqueKey"
    }
    ```
- **Description**: Saves a JSON object under the specified `key`. A unique `id` will be generated for each saved JSON.

### Get All JSON by Key
- **URL**: `/api/get/{key}`
- **Method**: `GET`
- **Response**:
    ```json
    {
      "key": "uniqueKey",
      "files": [
        { "id": "fileId1", "data": { /* JSON content */ } },
        { "id": "fileId2", "data": { /* JSON content */ } }
      ]
    }
    ```
- **Description**: Retrieves all JSON files stored under the specified `key`. Each file's `id` and data are included in the response.

### Get JSON by Key and ID
- **URL**: `/api/getById/{key}/{id}`
- **Method**: `GET`
- **Response**:
    ```json
    {
      "id": "fileId",
      "data": { /* JSON content */ }
    }
    ```
- **Description**: Retrieves a specific JSON file by its `key` and `id`. Returns the corresponding data.

### Static File Serving
- **URL**: `/` or any path matching your React build files
- **Method**: `GET`
- **Response**: Serves static React files from the `build` directory, including `index.html`.

## Setup

1. Clone the repository:
   ```git clone https://github.com/yourusername/json-file-storage-api.git ```

2. Navigate to the project directory:
   ```cd json-file-storage-api``

3. Install dependencies:
   ```npm install```

4. Create a `.env` file in the root directory and configure the following variables:
   - `PORT`: The port on which the server will run (default: `3001`).
   - `BUILD_DIR`: The path to the React build directory (default: `./build`).
   - `BASE_DIR`: The directory where JSON files are stored (default: `./data`).
   - `LOG_DIR`: The directory where log files are stored (default: `./logs`).

5. Run the server:
   ```npm start```

## Directory Structure

- `data/`: Stores JSON files associated with each key.
- `logs/`: Stores log files with request details.
- `build/`: Contains the React build files.

## Logging

All requests made to the `/save` endpoint are logged in `logs/save_requests.log`. The logs include the timestamp, request details, and the saved JSON data.

## Dependencies

- `bun`: Fast JavaScript runtime for the server.
- `dotenv`: Loads environment variables from `.env` file.
- `fs`: Node.js file system module for handling files.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
