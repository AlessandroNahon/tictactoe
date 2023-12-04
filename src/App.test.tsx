import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

import App from './App';

test('renders the game', () => {
  render(<App />)

  const startHeader = screen.getByText(/Turn: o/i)
  const board = screen.getByTestId("board")

  expect(startHeader).toBeInTheDocument()
  expect(board).toBeInTheDocument()
});

test('player O starts the game and makes the first move', () => {
  render(<App />)
  const firstSquare = screen.getByTestId(`row:0, col:0`);

  fireEvent.click(firstSquare)

  const squareContent = within(firstSquare)?.getByTestId('square')
  const nextHeader = screen.getByText(/Turn: x/i)

  expect(squareContent).toHaveTextContent("o")
  expect(nextHeader).toBeInTheDocument()

})

test('player X makes the second move after player O', () => {
  render(<App />)
  const firstSquare = screen.getByTestId(`row:0, col:0`);
  const secondSquare = screen.getByTestId(`row:0, col:1`);

  fireEvent.click(firstSquare)
  fireEvent.click(secondSquare)

  const squareContent = within(secondSquare)?.getByTestId('square')
  const nextHeader = screen.getByText(/Turn: o/i)

  expect(squareContent).toHaveTextContent("x")
  expect(nextHeader).toBeInTheDocument()

})

test('game is won by player O diagonally', () => {
  render(<App />)

  const firstSquare = screen.getByTestId(`row:0, col:0`);
  const secondSquare = screen.getByTestId(`row:0, col:1`);
  const thirdSquare = screen.getByTestId(`row:1, col:1`);
  const fourthSquare = screen.getByTestId(`row:0, col:2`);
  const fifthSquare = screen.getByTestId(`row:2, col:2`);

  fireEvent.click(firstSquare)
  fireEvent.click(secondSquare)
  fireEvent.click(thirdSquare)
  fireEvent.click(fourthSquare)
  fireEvent.click(fifthSquare)

  const winnerText = screen.getByText(/o is the winner!/i)
  expect(winnerText).toBeInTheDocument()
})

test('player x clicks on already selected square and nothing happens', () => {
  render(<App />)

  const firstSquare = screen.getByTestId(`row:0, col:0`);

  fireEvent.click(firstSquare)

  const nextHeader = screen.getByText(/Turn: x/i)

  expect(nextHeader).toBeInTheDocument()

  fireEvent.click(firstSquare)

  expect(nextHeader).toBeInTheDocument()
})
