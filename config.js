var config = {
	database: {
		host:	  'localhost', 	// database host
		user: 	  'root', 		// your database username
		password: '', 		// your database password
		port: 	  3306, 		// default MySQL port
		db: 	  'db_thelocker' 		// your database name
	},
	server: {
		//host: '127.0.0.1',
		host: '0.0.0.0',
		port: '4001'
	},
	report: {
		//host: '127.0.0.1',
		host: '0.0.0.0',
		port: '5488'
	}
}

module.exports = config
