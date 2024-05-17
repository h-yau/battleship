# Battleship Game

Live repo: [here](https://h-yau.github.io/battleship/)

This project is a web-based implementation of the classic Battleship game, developed using JavaScript, HTML, and CSS. It serves as a practice project for Jest and test-driven development (TDD).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)

## Introduction

Battleship is a strategy type guessing game for two players. This implementation allows a single player to play against a computer. The game is built as a practice exercise for learning Jest and TDD principles.

## Features

- Single player mode against a computer.
- Random ship placement for both player and computer.
- Interactive UI for placing ships and attacking.
- Turn-based gameplay.
- Visual feedback for hits and misses.
- Score tracking.

## Technologies Used

- **JavaScript**: Game logic and functionality.
- **HTML**: Structure of the web page.
- **CSS**: Styling and layout of the game interface.
- **Jest**: Testing framework for JavaScript.
- **TDD**: Test-driven development methodology.

## Setup

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/battleship.git

   ```

2. **Navigate to the project directory:**

   ```bash
    cd battleship

   ```

3. **Install the dependencies:**
   ```bash
    npm install
   ```

## Usage

To start the game, open the index.html file in your web browser. You can do this by double-clicking the file or by using a local server.

Example:

    ```bash
    open index.html
    ```

## Introduction

This project uses Jest for testing. All tests are located in the **tests** directory. To run the tests, use the following command:

    ```bash
    npm test
    ```

The tests are written following TDD principles, ensuring that the game logic is thoroughly tested before implementation.

## Project Structure

    ```bash
    battleship/
    ├── **tests**/ # Test files
    ├── css/ # CSS files
    │ └── styles.css
    ├── js/ # JavaScript files
    │ ├── game.js
    │ ├── player.js
    │ ├── ship.js
    │ └── board.js
    ├── index.html # HTML file
    ├── README.md # Project README
    └── package.json # NPM package file
    ```
