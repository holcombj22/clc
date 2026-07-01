# Circleville Lawn Care Website Backend

This project now includes a simple secure backend for handling customer registrations.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open your site at http://localhost:3000

## Security notes

- HTTPS should be enforced by your hosting provider.
- Use environment variables for production secrets and allowed origins.
- Keep the registration data file outside the public webroot if possible.
- Consider replacing the JSON file storage with a database such as PostgreSQL or MongoDB for production.
