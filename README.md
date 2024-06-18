# Sectors Application

This is a full-stack application built with Ruby on Rails and React that allows users to manage their sector information.
<br /><br />Users can only update their data when their session is available. The session starts with the first form submit and lasts for 30 minutes.
<br /><br />To add new user data, you can log out the current user by clicking the logout button. Please note that once you proceed to add new data, you won't be able to return to update any previous user data.

## Setup Instructions

1. **Clone the repository**

   ```sh
   git clone git@github.com:szymoniwacz/sectors.git
   cd sectors
   ```

2. **Install Ruby dependencies**

   ```sh
   bundle install
   ```

3. **Install Node.js dependencies**

   ```sh
   npm install
   ```

4. **Ensure PostgreSQL is running**
   You can use `docker-compose.yml` to run PostgreSQL. Ensure you have Docker and Docker Compose installed. Then run:

   ```sh
   docker-compose up -d
   ```

5. **Set up the database**

   ```sh
   bin/rails db:create
   bin/rails db:migrate
   bin/rails db:seed
   ```

6. **Set up the environment variables**
   Copy the example `.env` file and modify it with your specific configuration:
   ```sh
   cp .env.example .env
   ```
   Edit the `.env` file to match your environment settings.

## How to Run the Application

1. **Start the backend server**

   ```sh
   bin/rails server
   ```

2. **Start the frontend application**

   ```sh
   bin/webpack-dev-server
   ```

   This will run the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Run Tests

1. **Run the backend test suite**

   ```sh
   bin/rails rspec spec
   ```

   This will run the tests using RSpec and display the results in the terminal.

2. **Run the frontend test suite**

   ```sh
   npm test
   ```

   This will run the tests using Jest and display the results in the terminal.

## How This App Could Be Modified and Extended

1. **Backend Integration**

   - Improve the backend API to handle more complex validation and data processing
   - Add authentication and authorization to protect certain routes and data

2. **Frontend Improvements**

   - Add more form fields and validations as required
   - Implement better error handling and user notifications
   - Enhance the user interface with additional styling and components

3. **Testing**

   - Add more comprehensive tests to cover edge cases and different scenarios
   - Use tools like Cypress for end-to-end testing

4. **Internationalization**

   - Add support for more languages and improve the existing translations
   - Make the language switcher more user-friendly

5. **Performance Optimization**
   - Optimize the React components for better performance
   - Use code-splitting and lazy loading for faster load times

## Contribution

Feel free to open issues and submit pull requests to improve the application. Ensure that your code follows the project's coding standards and includes appropriate tests.
