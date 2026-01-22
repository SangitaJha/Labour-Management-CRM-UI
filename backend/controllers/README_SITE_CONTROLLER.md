# Site Controller

## Overview
The Site Controller manages all CRUD operations for construction sites in the Labour Management CRM system. It provides endpoints for creating, reading, updating, and deleting site records.

## Dependencies
- `Site` model from `../models/Site`
- `Sequelize Op` for query operations

## API Endpoints

### 1. Get All Sites
**Function:** `getSites(req, res)`

Retrieves a list of sites with optional filtering.

**Query Parameters:**
- `project_id` (optional) - Filter sites by project ID
- `is_active` (optional) - Filter by active status (boolean as string: 'true' or 'false')
- `q` (optional) - Search sites by name (partial match)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "site_id": 1,
      "site_name": "Construction Site A",
      "project_id": 5,
      "is_active": true,
      "created_at": "2026-01-12T00:00:00.000Z"
    }
  ]
}
```

**HTTP Status Codes:**
- `200 OK` - Sites retrieved successfully
- `500 Internal Server Error` - Server error

---

### 2. Get Single Site
**Function:** `getSite(req, res)`

Retrieves a single site by its ID.

**URL Parameters:**
- `id` (required) - Site ID

**Response:**
```json
{
  "success": true,
  "data": {
    "site_id": 1,
    "site_name": "Construction Site A",
    "project_id": 5,
    "is_active": true
  }
}
```

**HTTP Status Codes:**
- `200 OK` - Site retrieved successfully
- `404 Not Found` - Site not found
- `500 Internal Server Error` - Server error

---

### 3. Create Site
**Function:** `createSite(req, res)`

Creates a new site record.

**Request Body:**
```json
{
  "site_name": "New Construction Site",
  "project_id": 5,
  "location": "123 Main St",
  "is_active": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "site_id": 10,
    "site_name": "New Construction Site",
    "project_id": 5,
    "location": "123 Main St",
    "is_active": true,
    "created_at": "2026-01-12T00:00:00.000Z"
  }
}
```

**HTTP Status Codes:**
- `201 Created` - Site created successfully
- `500 Internal Server Error` - Server error

---

### 4. Update Site
**Function:** `updateSite(req, res)`

Updates an existing site record.

**URL Parameters:**
- `id` (required) - Site ID

**Request Body:**
```json
{
  "site_name": "Updated Site Name",
  "is_active": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "site_id": 1,
    "site_name": "Updated Site Name",
    "is_active": false,
    "updated_at": "2026-01-12T00:00:00.000Z"
  }
}
```

**HTTP Status Codes:**
- `200 OK` - Site updated successfully
- `404 Not Found` - Site not found
- `500 Internal Server Error` - Server error

---

### 5. Delete Site
**Function:** `deleteSite(req, res)`

Permanently deletes a site record.

**URL Parameters:**
- `id` (required) - Site ID

**Response:**
```json
{
  "success": true,
  "message": "Site deleted"
}
```

**HTTP Status Codes:**
- `200 OK` - Site deleted successfully
- `404 Not Found` - Site not found
- `500 Internal Server Error` - Server error

---

## Features

### Search & Filter
- **Text Search:** Use the `q` parameter to search sites by name (partial matching)
- **Project Filter:** Filter sites by project ID
- **Active Status Filter:** Filter active or inactive sites

### Sorting
- Results are ordered by creation date (newest first)

### Error Handling
All endpoints include try-catch blocks and return standardized error responses:
```json
{
  "success": false,
  "error": "Error message description"
}
```

## Usage Examples

### Example 1: Get All Active Sites
```javascript
GET /api/sites?is_active=true
```

### Example 2: Search Sites by Name
```javascript
GET /api/sites?q=construction
```

### Example 3: Get Sites for a Specific Project
```javascript
GET /api/sites?project_id=5
```

### Example 4: Create a New Site
```javascript
POST /api/sites
Content-Type: application/json

{
  "site_name": "Downtown Project Site",
  "project_id": 3,
  "location": "456 Oak Avenue",
  "is_active": true
}
```

### Example 5: Update Site Status
```javascript
PUT /api/sites/1
Content-Type: application/json

{
  "is_active": false
}
```

### Example 6: Delete a Site
```javascript
DELETE /api/sites/1
```

## Related Files
- **Model:** `backend/models/Site.js`
- **Routes:** `backend/routes/site.routes.js`
- **Frontend:** `sites.html`

## Notes
- All operations require proper authentication (handled by middleware)
- The controller uses Sequelize ORM for database operations
- Soft delete is not implemented; deletions are permanent
- Consider adding pagination for large datasets
- Consider adding validation middleware for request body validation

## Testing
Refer to the API documentation for testing endpoints with tools like:
- Postman
- cURL
- Thunder Client (VS Code extension)

See `API_DOCUMENTATION.md` and `test-backend.html` for more details.
