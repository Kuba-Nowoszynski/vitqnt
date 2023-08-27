# VitQnt - Vitamin & Micronutrient Calculator

## Overview

![CyFw2hXgkB](https://github.com/Kuba-Nowoszynski/vitqnt/assets/117540841/88b025be-543d-4aaa-b66c-518992ef912b)

## Project Scope and Definition

**Purpose:** The primary goal of the VitQnt is to provide users with personalized information about their daily required intake of vitamins and micronutrients based on individual factors such as age, sex, and weight. Additionally, the app offers features like nutrient analysis based on the user's diet and potentially suggests recipes to cover any deficiencies.

**Features:**

1. **Daily Vitamin & Micronutrient Recommendation:** The app calculates and displays the recommended daily intake of vitamins and micronutrients based on user inputs.
2. **Nutrient Information Panel:** Users can access detailed information about each selected vitamin or micronutrient.
3. **Dietary Analysis:** Users can input the foods they consume, and the app identifies potential nutrient deficiencies based on their dietary choices.
4. _(Additional)_ **Recipe Recommendations:** The app can provide recipe suggestions to help users address nutrient deficiencies.

## UI/UX Design

**Layout:**

- **Landing Page:** Provides a brief introduction to the importance of vitamins and micronutrients in daily life.
- **Calculator Section:** Includes input fields for age, sex, weight, and other relevant factors. Outputs the recommended daily nutrient intake.
- **Nutrient Information Section:** Displays a grid of tiles, each representing a vitamin or micronutrient. Clicking a tile expands it to show detailed information.
- **Dietary Analysis Section:** Features a search bar and a list of foods. After food selection, the app provides a summary of potential nutrient deficiencies.

## Resources and Data

- **Vitamin & Micronutrient Database:** Utilize a reliable data source for nutrient information. The USDA's FoodData Central is comprehensive, but alternative sources are available.
- **Images:** Use platforms like Unsplash or Pexels for high-quality royalty-free images.

## React Implementation

**Components:**

- **Header:** Displays the app's name and possibly a tagline.
- **InputForm:** Collects user data such as age, sex, and weight.
- **NutrientTile:** Represents a single vitamin or micronutrient. Clicking expands it to reveal more information.
- **FoodList:** Supports the dietary analysis section. Users can select and submit foods for analysis.
- **ResultsPanel:** Displays the results after the user submits their food list.

## Additional Features and Ideas

- **User Profiles:** Allow users to create profiles to save information and track nutrient intake over time.
- **Interactive Charts:** Incorporate visual representations of vitamin and micronutrient intake for a better user experience.
- **Social Sharing:** Enable users to share their results or favorite nutrient information on social media platforms.

## Installation Process (React App Set Up in Vite)

1. Clone the repository: `git clone [repository URL]`
2. Navigate to the project directory: `cd [project-directory]`
3. Navigate to the project directory: `cd client`
4. Install dependencies: `npm install`
5. Run the development server: `npm run dev`
6. Open your browser and go to `http://localhost:5173` (or different port depending on your set-up) to see the app in action during development.
