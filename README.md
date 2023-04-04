![Handle](https://user-images.githubusercontent.com/87572723/229592216-d4319f09-f6cd-40f6-a808-da9785cc7857.png)
---
A twist on the popular New York Time's Puzzle game 'Wordle', this variation uses the ASL alphabet as input to help you get a **Handle** of Sign Language

## ⁉️ About

Handle is a **Sign Language Detection** game created for submission to the W23 Project Program Competition. Created in React, it uses Google's open source machine learning API **MediaPipe Hands** to detect hand landmark placement and accurately predict sign letters from user input. With example hand gestures, it is a fun and interactive way to learn Sign Language. 

Handle is submitted to Project Program for team **IBM & Chandler** with contributions from team members:
- Riley Adams
- Chandler Mayberry


## 💻 Demo:
<img src="/public/HandleGif.gif" width="700" height="400">


## ⚙️ Run Locally:

**Follow the Below Commands to Run Handle on Your Machine:**

Running Handle Requires 2 Terminals. 
In the First Terminal Run the Following:

```bash
# Clone The Latest Version
git clone https://github.com/Torin99/Handle.git

# Change Into Project Directory
cd Handle

# Install Dependencies
npm install -- force

# Start the Data Server
json-server ./data/library.json --port 3001
```

In the Second Terminal Run the Following:

```bash
# Change Into Project Directory
cd Handle

# Run The Project
npm run dev
```

Finally in Browser navigate to the localhost url presented in the Terminal:
[http://localhost:5173/](http://localhost:5173/)

## 🏗️ Project Structure:
    .
    │
    ├── data/                       # data files
    │   ├── library.json            # data to be fetched from server, contains solution words and letters
    │   └── sign_data.js            # contains min and max values of hand landmark data and their letters
    │ 
    ├── public/                     # public files
    │   ├── a.png                   # images used in Letters.jsx for demo hand placement
    │   ├── ...
    │   └── z.png               
    │
    ├── src/                        # main app files
    ├── components/                 # react components to be rendered in App.jsx
    │   │   ├── Board/              # components used in center board component
    │   │   │   ├── Board.jsx       # main Board component containing BoardRows
    │   │   │   └── BoardRow.jsx    # Board Rows containing Board Squares of current/previous guesses
    │   │   │   
    │   │   ├── Detection.jsx       # webcam and canvas components
    │   │   ├── EntrySquare.jsx     # component to display most recent signed letter
    │   │   ├── GameEnd.jsx         # message to display on game end
    │   │   ├── Handle.jsx          # main game component, takes in game logic and assigns to components accordingly
    │   │   └── Letters.jsx         # keypad component to show letters and their color relation to solution
    │   │ 
    │   ├── hooks/
    │   │   ├── UseDetection.js     # webcam & canvas logic
    │   └── UseHandle.js            # game logic
    │   ├── App.css                 # app styling
    │   ├── App.jsx                 # main component to contain all above components
    │   ├── index.css               # index styling
    │   └── main.jsx                # component sent to index.html containing app.jsx
    │
    ├── index.html                  # web application, contains app and MediaPipe scripts    
    ├── package.json                # dependencies
    .
