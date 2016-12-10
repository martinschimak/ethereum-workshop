pragma solidity >= 0.4.5;

contract Taxi {

  address driver;
  address public passenger;
  Drive public drive;

  struct Drive {
      address passenger;
      string from;
      string to;
      uint calledAt;
      uint boardedAt;
      uint arrivedAt;
      uint price;
      bool payed;
  }

  event Called(address indexed passenger);
  event Boarded();
  event Arrived();
  event Deboarded();

  function Taxi() {
      driver = msg.sender;
  }

  modifier vacant() {
    if (passenger == 0) {
        _;
    } else throw;
  }

  modifier reserved() {
    if (passenger == msg.sender) {
        _;
    } else throw;
  }

  modifier owned() {
    if (driver == msg.sender) {
        _;
    } else throw;
  }

  function price() returns (uint) {
      return 100 ether;
  }

  function callTaxi(string location) vacant {
      passenger = msg.sender;
      drive = Drive({
          passenger: passenger,
          from: location,
          to: "",
          calledAt: now,
          boardedAt: 0,
          arrivedAt: 0,
          price: 0,
          payed: false
      });
      Called(passenger);
  }

  function boardTaxi(string location) reserved {
      drive.boardedAt = now;
      drive.to = location;
      Boarded();
  }

  function arriveAtLocation() owned {
      drive.arrivedAt = now;
      drive.price = price();
      Arrived();
  }

  function deboardTaxi() reserved payable {
      if (msg.value != drive.price) throw;
      if (!driver.send(msg.value)) throw;
      passenger = 0;
      Deboarded();
  }

}