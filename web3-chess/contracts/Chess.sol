// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Chess {
    enum GameStatus { InProgress, Finished }

    struct Game {
        address player1;
        address player2;
        address currentPlayer;
        string[] moves;
        uint256 lastMoveTime;
        GameStatus status;
    }

    Game[] public games;
    mapping(address => uint256[]) public playerGames;

    event GameCreated(uint256 gameId, address player1, address player2);
    event MoveMade(uint256 gameId, address player, string move);
    event GameEnded(uint256 gameId, address winner);

    function createGame(address _player2) public {
        require(_player2 != msg.sender, "Cannot create a game with yourself");
        games.push(Game({
            player1: msg.sender,
            player2: _player2,
            currentPlayer: msg.sender, // Player 1 (White) starts
            moves: new string[](0),
            lastMoveTime: block.timestamp,
            status: GameStatus.InProgress
        }));
        uint256 gameId = games.length - 1;
        playerGames[msg.sender].push(gameId);
        playerGames[_player2].push(gameId);
        emit GameCreated(gameId, msg.sender, _player2);
    }

    function makeMove(uint256 _gameId, string memory _move) public {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.InProgress, "Game has already ended");
        require(msg.sender == game.currentPlayer, "Not your turn");

        game.moves.push(_move);
        game.lastMoveTime = block.timestamp;

        if (game.currentPlayer == game.player1) {
            game.currentPlayer = game.player2;
        } else {
            game.currentPlayer = game.player1;
        }

        emit MoveMade(_gameId, msg.sender, _move);
    }

    function endGame(uint256 _gameId, address _winner) public {
        Game storage game = games[_gameId];
        require(game.status == GameStatus.InProgress, "Game has already ended");
        require(msg.sender == game.player1 || msg.sender == game.player2, "Not a player in this game");

        game.status = GameStatus.Finished;
        // The winner is passed in from the frontend, which will determine the winner based on game logic (checkmate, resignation)
        emit GameEnded(_gameId, _winner);
    }

    function getGame(uint256 _gameId) public view returns (address, address, address, string[] memory, uint256, GameStatus) {
        Game storage game = games[_gameId];
        return (game.player1, game.player2, game.currentPlayer, game.moves, game.lastMoveTime, game.status);
    }

    function getGamesCount() public view returns (uint256) {
        return games.length;
    }
}
