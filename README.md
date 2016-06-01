# ConCaVa MQTT storage adapter

> ConCaVa adapter for storage through MQTT.

This storage adapter receives data from ConCaVa and publishes the JSON payload on topic `concava/<device ID>`. [Mosca](https://github.com/mcollina/mosca) is used as the MQTT broker.

See [ConCaVa with MariaDB and MQTT](https://github.com/kukua/concava-setup-mysql-mqtt) for a working setup.

Requires ConCaVa v0.4+.

## Install

```bash
npm install concava-adapter-mqtt
```

## Configure

A ConCaVa configuration example:

```js
const storage = require('concava-adapter-mqtt').storage

module.exports = {
	debug: true,

	...

	storage: {
		method: storage,
		config: {
			port: 1883,
			backend: {
				type: 'mongo',
				url: 'mongodb://example.com:27017/mqtt',
				pubsubCollection: 'concava',
				mongo: {},
			},
		},
	},
}
```

## License

This software is licensed under the [MIT license](https://github.com/kukua/node-concava-adapter-mqtt/blob/master/LICENSE).

© 2016 Kukua BV
