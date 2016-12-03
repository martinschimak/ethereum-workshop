const Chaithereum = require('chaithereum')
const contracts = require('../modules/contracts')

const chaithereum = new Chaithereum

before(() => {
  return chaithereum.promise
})

describe('Attendance', () => {
  let attendance

  beforeEach(() => {
    attendance = chaithereum.web3.eth.contract(contracts.Attendance.abi).new.q({ 
      data: contracts.Attendance.bytecode 
    })
  })

  it('should deploy', () => {
    return attendance.should.eventually.be.contract
  })

  it('should allow owner to set name', () => {
    const key = chaithereum.accounts[1]
    return attendance.then((attendance) => 
      attendance.setName.q(key, "Vitalik")
      .then(() => attendance.nameToKey.q("Vitalik").should.eventually.be.equal(key))
    )
  })

  it('should not allow others to set name', () => {
    const key = chaithereum.accounts[1]
    return attendance.then((attendance) => 
      attendance.setName.q(key, "Vitalik", { from: chaithereum.accounts[2] }).should.eventually.be.rejected
    )
  })

  it('should allow owner to add event', () => {
    return attendance.then((attendance) =>
      attendance.addEvent.q("Beginner Workshop")
      .then(() => attendance.events.q(0).should.eventually.be.ascii("Beginner Workshop"))
    )
  })

  it('should allow owner to set attendance', () => {
    const key = chaithereum.accounts[1]
    const event = 0
    return attendance.then((attendance) => 
      attendance.setAttendance.q(key, event, true)
      .then(() => attendance.hasAttended.q(key, event).should.eventually.be.true)
    )
  })

  it('should not allow others to set attendance', () => {
    const key = chaithereum.accounts[1]
    const event = 0
    return attendance.then((attendance) => 
      attendance.setAttendance.q(key, event, true, { from: chaithereum.accounts[1] }).should.eventually.be.rejected
    )
  })

  it('should fire Attendance event on attendance', () => {
    const key = chaithereum.accounts[1]
    const eventId = 0
    return attendance.then((attendance) =>        
      attendance.setAttendance.q(key, eventId, true).then(() => {
        return attendance.Attended({key, eventId}, { fromBlock: 'latest', toBlock: 'latest' }).q().should.eventually.have.length(1)
      }))
  })

  it('should not fire Attendance event on negative attendance', () => {
    const key = chaithereum.accounts[1]
    const eventId = 0
    return attendance.then((attendance) =>        
      attendance.setAttendance.q(key, eventId, false).then(() => {
        return attendance.Attended({key, eventId}, { fromBlock: 'latest', toBlock: 'latest' }).q().should.eventually.have.length(0)
      }))
  })

})