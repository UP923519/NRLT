const ServiceOperator = require('./SerivceOperator');
const ServiceOrigin = require('./ServiceOrigin');
const ServiceDestination = require('./ServiceDestination');
const CallingPoint = require('./CallingPoint');

class Service {

    /**
     * The Service Operator
     * @type {ServiceOperator}
     */

    operator = {
        name: this.operator.name,
        code: this.operator.code,
    }

    /**
     * The Service's STP
     * @type {String}
     */

    stp = this.stp

    /**
     * The Planned Arrival Time
     * @type {String}
     */

    plannedArrival = this.plannedArrival

    /**
     * The Actual Arrival Time
     * @type {String}
     */

    actualArrival = this.actualArrival

    /**
     * The Planned Departure Time
     * @type {String}
     */

    plannedDeparture = this.plannedDeparture

    /**
     * The Actual Departure Time
     * @type {String}
     */

    actualDeparture = this.actualDeparture

    /**
     * The Origin Station of the Service
     * @type {ServiceOrigin}
     */

    origin = {
        name: this.origin.name,
        code: this.origin.code,
    }

    /**
     * The Destination Station of the Service
     * @type {ServiceDestination}
     */

    destination = {
        name: this.destination.name,
        code: this.destination.code,
    }

    /**
     * The Calling Points of the Service
     * @type {CallingPoint[]}
     */

    callingPoints = this.callingPoints

    /**
     * The Platform on which the Service Arrives
     * @type {String}
     */

    platform = this.platform

    /**
     * The Service's UID
     * @type {String}
     */

    uid = this.uid

    /**
     * The ID of the Train
     * @type {String}
     */

    trainid = this.trainid

    /**
     * The Source of the Information for the Service
     * @type {String}
     */

     sourceURL = this.sourceURL

    /**
     * Whether the Service is for Passengers
     * @type {Boolean}
     */

    isPassengerTrain = this.isPassengerTrain

    /**
     * Whether the Service is Calling at the Requested Station
     * @type {Boolean}
     */

    isCalling = this.isCalling

    /**
     * Whether the Service is Cancelled
     * @type {Boolean}
     */

    isCancelled = this.isCancelled

    /**
     * Whether the Service Only Runs when it is Required
     * @type {Boolean}
     */

    runsAsRequired = this.runsAsRequired
}

module.exports = Service;