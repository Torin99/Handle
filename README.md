![Handle](https://user-images.githubusercontent.com/87572723/229592216-d4319f09-f6cd-40f6-a808-da9785cc7857.png)
---
A twist on the popular New York Times Puzzle game 'Wordle', this variation uses the ASL alphabet as input to help you get a **Handle** of Sign Language

## About

Handle is a **Sign Language Detection** game created for submission to the W23 Project Program Competition. Created in React, It uses Google's open source machine learning API **MediaPipe Hands** to detect hand landmark placement and accurately predict sign letters from user input. With example hand gestures, it is a fun and interactive way to learn Sign Language. 

Handle is submitted to Project Program for team **IBM & Chandler** with contributions from team members:
- Riley Adams
- Chandler Mayberry


## 💻 Demo:
<img src="/public/HandleGif.gif" width="600" height="400">


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

## Project Structure:

  │
  ├── data                    # Test files (alternatively `spec` or `tests`)
  │   ├── benchmarks          # Load and stress tests
  │   ├── integration         # End-to-end, integration tests (alternatively `e2e`)
  │   └── unit                # Unit tests
  │
  ├── public
  │
  ├── src
  └── ...
