// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Chess {
    struct Game {
        address player1;
        address player2;
        uint256 startTime;
        uint256 lastMoveTime;
        string pgn;
        address winner;
    }

    Game[] public games;
    mapping(address => uint256[]) public playerGames;

    event GameCreated(uint256 gameId, address player1, address player2);
    event MoveMade(uint256 gameId, address player, string pgn);
    event GameEnded(uint256 gameId, address winner);

    function createGame(address _player2) public {
        games.push(Game({
            player1: msg.sender,
            player2: _player2,
            startTime: block.timestamp,
            lastMoveTime: block.timestamp,
            pgn: "",
            winner: address(0)
        }));
        uint256 gameId = games.length - 1;
        playerGames[msg.sender].push(gameId);
        playerGames[_player2].push(gameId);
        emit GameCreated(gameId, msg.sender, _player2);
    }

    function makeMove(uint256 _gameId, string memory _pgn) public {
        Game storage game = games[_gameId];
        require(msg.sender == game.player1 || msg.sender == game.player2, "Not a player in this game");
        require(game.winner == address(0), "Game has already ended");
        game.pgn = _pgn;
        game.lastMoveTime = block.timestamp;
        emit MoveMade(_gameId, msg.sender, _pgn);
    }

    function endGame(uint256 _gameId, address _winner) public {
        Game storage game = games[_gameId];
        require(msg.sender == game.player1 || msg.sender == game.player2, "Not a player in this game");
        require(game.winner == address(0), "Game has already ended");
        game.winner = _winner;
        emit GameEnded(_gameId, _winner);
    }

    function getGame(uint256 _gameId) public view returns (address, address, uint256, uint256, string memory, address) {
        Game storage game = games[_gameId];
        return (game.player1, game.player2, game.startTime, game.lastMoveTime, game.pgn, game.winner);
    }
}
