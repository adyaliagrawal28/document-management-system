# Document Management System (Front-End)

## Overview

This is the **front-end** of a Document Management System built with **React**. The system allows users to:

- Upload documents (images & PDFs) with:
  - Date
  - Major/Minor categories
  - Tags
  - Remarks  
- Search documents using multiple criteria:
  - Categories
  - Tags
  - Date range  
- Preview documents (image/PDF) on a dedicated page  
- Download individual files or all files as a ZIP  

The backend uses **.NET** and **MySQL**, while this front-end connects to the backend APIs.

---

## Features

1. **Authentication**
   - OTP login interface
   - Token management for secure API requests
   - Static Admin interface for user creation  

2. **Upload Documents**
   - File type validation: images and PDFs only
   - Dynamic dropdowns:
     - Major category: Personal / Professional
     - Minor category: Names (Personal) / Departments (Professional)
   - Tag input with API integration
   - Remarks field  

3. **Search Documents**
   - Filter by Major/Minor categories, tags, and date range
   - Redirects to Preview page for search results  

4. **Preview Documents**
   - Displays documents with:
     - PDF/image preview
     - Tags, remarks, major/minor categories
   - Individual file download
   - **Download all files as ZIP**
   - Back button to return to search  

5. **Responsive Design**
   - Works well on different screen sizes
   - Consistent styling across Upload and Preview pages  

---

## Technologies Used

- React (with hooks and context)
- React Router (navigation)
- React-Bootstrap (UI components & styling)
- Axios (API calls)
- JSZip + FileSaver (Download all files as ZIP)
- CSS for component styling  

---

## Setup & Running the Project

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <your-project-folder>
```
2. **Install dependencies**
```bash
npm install
```
3. **Start Development server**
```bash
npm start
```
3. **Open app in your browser**
Open the app in your browser: http://localhost:3000
Make sure the backend server is running and the API endpoints are accessible.

---

## API Endpoints Used

- **Login / OTP Authentication**
- **Upload Document** → `/saveDocumentEntry`
- **Search Documents** → `/searchDocumentEntry`
- **Document Tags** → `/documentTags` (used for autocomplete)

---

## Notes

- User ID in uploads is currently hardcoded for testing.
- Only PDF and image files are supported for previews.
- Large files may take time when downloading all as ZIP.

---

## Author

- Name: Adyali Agrawal
