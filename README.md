# FootyStats ⚽  
🚀 **An advanced football statistics tracking and betting application**

## 📌 Project Description

**FootyStars** is a modern web application for tracking football match results, team and player statistics, and making match predictions. It features a **betting slip** with an odds calculator, **favorites**, and **customizable user settings**. The frontend is built with **React**, styled with **styled-components**, and fetches football data from an external API.

## 🔹 Tech Stack

- **React** with custom hooks, React Router, Axios  
- **Styled-components** for styling and theming  
- **React Context API** for state management  
- **Custom hooks** for optimized performance (e.g., useMemo, useCallback, useDebouncedResize)  

## ✨ Features

- ✅ **Live match tracking** with real-time statistics  
- ✅ **Favorites**: Add matches, leagues, and teams to your favorites  
- ✅ **Match & Player Statistics** with comprehensive data visualization  
- ✅ **Head-to-Head (H2H) Comparison** for in-depth analysis  
- ✅ **Betting Slip**: Build your betting slip with an odds calculator and potential winnings computation  
- ✅ **User Settings**: Customize your timezone, dark/light mode, and match sorting style  
- ✅ **Drag-and-Drop League Ordering**  
- ✅ **Customizable Tabs** for different data views  

## ⚙️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mawler7/footy-front.git
   cd footy-front
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

The application will run at [http://localhost:3000](http://localhost:3000).

## 🚀 API Endpoints Used

The frontend fetches data from the backend API. Some key endpoints:

| Method | Endpoint                           | Description                              |
|--------|------------------------------------|------------------------------------------|
| GET    | `/fixture/{date}`                  | Get matches for a specific date          |
| GET    | `/fixture/id/{id}`                 | Get match details                        |
| GET    | `/fixture/upcoming/{leagueId}`     | Get upcoming fixtures for a league       |
| GET    | `/fixture/current/{leagueId}`      | Get completed fixtures for a league      |
| GET    | `/h2h/{homeId}/{awayId}`           | Get Head-to-Head matches                 |
| GET    | `/standing/{leagueId}`             | Get league standings                     |

## 🔧 Custom Hooks

Some of the key custom hooks include:
- **`useFetchMatches`** – Fetches match data using axios.
- **`useMatchDetails`** – Retrieves detailed match information.
- **`useLeagueData`** – Retrieves league data (standings, fixtures, top scorers).
- **`useTeamData`** – Fetches team-specific data.
- **`useMatchesGrouping`** – Groups matches (Favorites, Live, Scheduled, Finished).
- **`useTabs`** – Manages active tab and sub-tab states.
- **`useTeamForm`** – Computes a team’s recent form (W/D/L indicators).
- **`useDebouncedResize`** – Handles responsive behavior with debounced window resizing.

## 🎨 Styling and Theming

The project uses **styled-components** with a unified theme defined in `themes.js` and shared base styles in `SharedStyles.js`. Key points include:

- **Breakpoints & Media Queries:**  
  Defined in the `media` object for mobile, tablet, and desktop.

- **Global Colors, Spacing, and Font Sizes:**  
  All components rely on a centralized theme, ensuring consistent styling.

- **Light & Dark Themes:**  
  Two themes (`lightTheme` and `darkTheme`) are provided for flexible UI customization.

## 👥 Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (e.g., `feature/my-new-feature`).
3. Commit your changes.
4. Push the branch and submit a pull request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📧 Contact

For any questions or suggestions, feel free to contact me:

- **Email:** mawler50@gmail.com  
- **GitHub:** [mawler7](https://github.com/mawler7)
