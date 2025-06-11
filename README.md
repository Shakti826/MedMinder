# MedMinder

## Description

MedMinder is your personal health companion, simplified. It's a web application designed to help you and your family manage medicine reminders, doctor's appointments, digital health records, and emergency information all in one place.

## Features

*   **Landing Page:** An attractive and informative entry point to the application.
*   **Dashboard:** A quick overview of active reminders, today's appointments, and family members.
*   **Medicine Reminders:**
    *   Add, edit, and delete medication reminders.
    *   Specify dosage, frequency, time, duration, and assign to a family member or self.
    *   Mark reminders as "Taken" or "Undo".
*   **Appointment Scheduling:**
    *   Add, edit, and delete appointments.
    *   Include title, description, date, time, location, notes, and assign to a family member or self.
    *   Mark appointments as "Completed" or "Undo".
*   **Digital Health Records:**
    *   Upload and store health documents (prescriptions, lab reports, scans, etc.) as images or PDFs.
    *   Categorize records, add dates, assign to family members, and include notes.
    *   View/download uploaded records.
    *   Delete records.
*   **Family Member Management:**
    *   Add, edit, and delete family member profiles.
    *   Include name, age, gender, and general medical conditions.
    *   Detailed Emergency Information per member:
        *   Blood Type
        *   Allergies
        *   Emergency Contacts (multiple, with name, phone, relationship)
        *   Other critical medical information.
*   **Emergency View:**
    *   A consolidated view displaying key emergency information for all family members for quick access.
    *   Direct links to edit full family member details.
*   **Localization:** Supports English (en) and Spanish (es) languages.
*   **Responsive Design:** Adapts to various screen sizes for use on desktop and mobile devices.
*   **Offline Data Storage:** Utilizes browser `localStorage` to save all data, allowing the app to function offline once loaded.
*   **Simulated API Interactions:** Demonstrates frontend structure for asynchronous data operations (fetching, adding, updating, deleting) with loading states, preparing for potential backend integration.

## How to Run

1.  Ensure you have all the project files in a single directory:
    *   `index.html`
    *   `index.css`
    *   `index.tsx` (TypeScript source file, though served directly in this setup)
    *   `metadata.json`
    *   `README.md` (this file)
2.  Open the `index.html` file in a modern web browser that supports ES6 modules (e.g., Chrome, Firefox, Edge, Safari).
3.  The application will load, starting with the landing page. Click "Get Started" to enter the main application.

*Note: The application uses `localStorage` for data persistence. Data will be saved only within the browser you are using.*

## Tech Stack

*   **Frontend:**
    *   HTML5
    *   CSS3 (with custom properties for theming)
    *   TypeScript (for application logic and strong typing)
*   **Data Storage:** Browser `localStorage` (for client-side persistence)
*   **Potential Future Integration:**
    *   The project includes an import map for `@google/genai`, suggesting potential future use of the Google Gemini API.

## Future Enhancements (Potential)

Based on the initial conceptualization, future enhancements could include:

*   **Real Backend Integration:** Connecting to a server-side database for robust, multi-user, and multi-device data storage.
*   **Push Notifications/SMS Reminders:** For medicine and appointment alerts.
*   **Calendar Sync:** Integration with Google Calendar/Apple Calendar for appointments.
*   **OCR (Optical Character Recognition):** For extracting text from uploaded health records.
*   **Advanced Search & Filtering:** For all sections.
*   **Emergency Info Sharing (QR Code/Link):** For quickly sharing vital information.
*   **User Authentication:** Secure login for individual user accounts.
*   **AI Chatbot:** For health-related queries (using Gemini API).
*   **Telemedicine Integration.**
*   **Community Support Forums.**

This README provides an overview of the MedMinder application in its current state.
