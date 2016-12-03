pragma solidity >= 0.4.5;
import "std.sol";

contract Attendance is owned {
  struct Attendee {
    bytes32 name;
    mapping (uint => bool) attended;
  }

  mapping (bytes32 => address) reverseMap;
  mapping (address => Attendee) public attendees;
  bytes32[] public events;

  event Attended(address indexed key, uint indexed eventId);

  modifier ownerorthrow() {
      if (msg.sender == owner) {
          _;
      } else throw;
  }

  function setName(address key, bytes32 name) ownerorthrow {
    attendees[key] = Attendee(name);
    reverseMap[name] = key;
  }

  function addEvent(bytes32 name) ownerorthrow returns (uint) {
    events.push(name);
    return events.length - 1;
  }

  function setAttendance(address key, uint eventId, bool y) ownerorthrow {
    attendees[key].attended[eventId] = y;
    if(y) Attended(key, eventId);
  }

  function nameToKey(bytes32 name) constant returns (address) {
    return reverseMap[name];
  }

  function hasAttended(address key, uint eventId) constant returns (bool) {
    return attendees[key].attended[eventId];
  }

}