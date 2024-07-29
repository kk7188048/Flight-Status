# Flight Status and Notifications System

This project is a full-stack application designed to provide real-time flight status updates and notifications to passengers. It features a backend developed using FastAPI, MongoDB, and Firebase for notifications, and a frontend built with Vite, React.js, React Router, and Tailwind CSS.

## Features

1. **Real-time Updates**: Display current flight status (delays, cancellations, gate changes).
2. **Push Notifications**: Send notifications for flight status changes via SMS, email, or app notifications.
3. **Integration with Airport Systems**: Pull data from airport databases for accurate information (using mock data in this project).
4. **Authentication**: Register and login functionality with JWT authentication.
5. **Flight Status Management**: Add, update, and get flight status information.

## Technologies Used

### Frontend

- **Framework**: [React.js](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Notification**: [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- **Email**: [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)

## Setup and Installation

### Backend

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kk7188048/Flight-Status.git
   cd Flight-Status/back

2. **Create and activate a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   
3   **Install the dependencies:**

   ```bash
   pip install -r requirements.txt

4    **Start the FastAPI server:**
   ```bash
   uvicorn main:app --reload


### Frontend
**Navigate to the frontend directory:**
```bash
cd ../front

**Install the dependencies:**

```bash
npm install

**Start the Vite development server:**

```bash
npm run dev