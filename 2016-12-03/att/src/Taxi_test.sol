pragma solidity >= 0.4.5;
import 'dapple/test.sol';
import 'Taxi.sol';

contract TaxiTest is Test {

  Taxi taxi;
  Tester proxy_tester;

  function setUp() {
    taxi = new Taxi();
    proxy_tester = new Tester();
    proxy_tester._target(taxi);
  }

  function testCall() {
    taxi.callTaxi("Neubaugasse 64-66");
    if (taxi.passenger() == 0)
      throw;
  }

}