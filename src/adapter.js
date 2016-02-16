import merge from 'merge'
import mosca from 'mosca'

// MQTT server
var getClient = (config, cb) => {
	var _cb = (err) => {
		config._ready = true
		cb(err, config._client)
	}

	// Create client
	if ( ! config._client) {
		config._client = new mosca.Server(config)
		config._client.on('ready', _cb)
		return
	}

	// Client not ready yet, so also wait for 'ready' event
	if ( ! config._ready) return config._client.on('ready', _cb)

	// Ready, so call immediately
	_cb()
}

// Authorization adapter
export let auth = (req, config, data, cb) => {
	cb('MQTT authorization not supported.')
}

// Metadata adapter
export let metadata = (req, config, data, cb) => {
	cb('MQTT metadata not supported.')
}

// Storage adapter
export let storage = (req, { config }, data, { SensorData }, cb) => {
	if ( ! (data instanceof SensorData)) return cb('Invalid SensorData given.')

	var payload = merge({}, data.getData())

	payload.timestamp = (new Date(payload.timestamp).getTime() || Date.now())

	getClient(config, (err, client) => {
		if (err) return cb(err)

		client.publish({
			topic: 'concava/' + data.getDeviceId(),
			payload: JSON.stringify(payload),
		}, cb)
	})
}
