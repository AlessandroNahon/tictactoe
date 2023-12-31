import { useRef, useState } from 'react';

type Board = string[][]

type Shape = 'x' | 'o'

type Player = Shape

const defaultBoard: Board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

const player1: Player = 'o'
const player2: Player = 'x'
const players: Player[] = [player1, player2]

function App() {
  const [board, setBoard] = useState<Board>(defaultBoard)
  const [activePlayer, setActivePlayer] = useState<Player>(player1)
  const winner = useRef<string>('')

  function selectSquare(row: number, col: number): void {
    const updatedBoard: Board = board.map((r, i) => r.map((player, j) => {

      if (row === i && col === j && player === '') {

        if (activePlayer === player1) {
          setActivePlayer(player2)
        } else {
          setActivePlayer(player1)
        }
        return activePlayer
      }
      return player
    }))

    if (winner.current === '') {
      setBoard(updatedBoard)
    }
  }

  function arrCol(b: Board, n: number): string[] {
    return b.map((x: { [x: string]: any; }) => x[n])
  }

  function diagRow(b: Board): string[] {
    return b.map((_, i) => b[i][i])
  }

  function reverseDiagRow(board: Board): string[] {
    return diagRow(board.map((row) => row.reverse()))
  }

  function tictactoe(a: string[], p: Player): boolean {
    return a.every(c => c === p)
  }

  function fullBoard(b: Board): boolean {
    let result = true;

    b.forEach((row: string[]) => {
      row.forEach(element => {
        if (typeof element !== 'string' || element.trim() === '') {
          result = false;
        }
      });
    });

    return result;
  }

  function findWinner(): void {
    if (fullBoard(board)) {
      winner.current = 'Game over.'
    }
    board.forEach((row, i) => {
      const col = arrCol(board, i)
      const diag = [reverseDiagRow(board), reverseDiagRow(board)]

      players.forEach((p: Player) => {
        const winnerFound = tictactoe(row, p) || tictactoe(col, p) || tictactoe(diag[0], p) || tictactoe(diag[1], p)

        if (winnerFound) {
          winner.current = `${p} is the winner!`
        }
      })
    })
  }

  findWinner()

  return (
    <div className="flex flex-col items-center justify-start bg-neutral-900 text-white h-screen">
      <h1 className='text-9xl my-16'>{winner.current === '' ? `Turn: ${activePlayer}` : winner.current}</h1>
      <div data-testid='board' className='w-3/6 h-2/4 grid grid-cols-3'>
        {
          board.map((row, i) => row.map((col, j) => (
            <div data-testid={`row:${i}, col:${j}`} key={`row:${i}, col:${j}`} className={`flex cursor-pointer items-center justify-center h-40 w-39  ${j !== 2 ? 'border-r-2' : ''} ${i !== 2 ? 'border-b-2' : ''}`} onClick={() => selectSquare(i, j)}>
              <h2 data-testid='square' className='text-center text-8xl'>{col}</h2>
            </div>
          )))
        }
      </div>

    </div>
  );
}

export default App;
