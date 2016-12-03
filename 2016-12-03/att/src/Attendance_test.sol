pragma solidity >= 0.4.5;
import 'dapple/test.sol';
import 'Attendance.sol';

contract AttendanceTest is Test {
  Attendance attendance;
  Tester proxy_tester;

  function setUp() {
    attendance = new Attendance();
    proxy_tester = new Tester();
    proxy_tester._target(attendance);
  }

  function testSetName() {
    attendance.setName(0x2, "Vitalik");
    assertEq(attendance.nameToKey("Vitalik"), 0x2);
  }

  function testThrowSetNameNotOwner() {
    Attendance(proxy_tester).setName(0x2, "Vitalik");
  }

  function testAddEvent() {
    uint id = attendance.addEvent("Beginner Workshop");
    assertEq(id, 0);
    assertEq32(attendance.events(id), "Beginner Workshop");
  }

  function testSetAttendance() {
    attendance.setAttendance(0x2, 0, true);
    assertTrue(attendance.hasAttended(0x2, 0));
  }

  function testThrowSetAttendanceNotOwner() {
    Attendance(proxy_tester).setAttendance(0x2, 0, true);
  }

  event Attended(address indexed key, uint indexed eventId);
  function testAttendanceEvent() {
    expectEventsExact(attendance);
    Attended(0x2, 0);
    attendance.setAttendance(0x2, 0, true);
  }

  function testAttendanceEventIfFalse() {
    expectEventsExact(attendance);    
    attendance.setAttendance(0x2, 0, false);
  }
}