///// required modules 

var express = require('express')
var app = express()

//--------------------START MEMBER ROUTE-----------------------

// SHOW LIST OF MEMBER
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
        console.log('---START QUERY LIST OF MEMBER---')
		conn.query('SELECT * FROM tb_member ORDER BY mem_gen ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				console.log(err)
				req.flash('error', err)
				
			} else {
				console.log(rows)
				res.end(JSON.stringify(rows));
			}
		})
        console.log('---END QUERY LIST OF MEMBER---')
	})
})

// SHOW EDIT MEMBER FORM
app.get('/edit/(:id)', function(req, res, next){

	console.log('---START SHOW EDIT MEMBER FORM---')	

	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM tb_member WHERE mem_gen = ' + req.params.id, function(err, rows, fields) {
			if(err) {
				console.log(err)
				throw err
			}
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'Member not found with id = ' + req.params.id)
				console.log('Member not found with id = ' + req.params.id)
				//console.log(rows)
				res.end(JSON.stringify(rows));
				console.log(rows)
			}
			else { // if member found
				// render to views/member/edit.ejs template file
				//console.log(rows)
				res.end(JSON.stringify(rows));
				console.log(rows)
				
			}			
		})
		console.log('---END SHOW EDIT MEMBER FORM---')	

	})
})

// SHOW FIND MEMBER FORM
app.post('/find', function(req, res, next){

	console.log('---START SHOW FIND MEMBER FORM---')
	
	var member = {
		mem_uname: req.sanitize('mem_uname').escape().trim(),
		mem_pass: req.sanitize('mem_pass').escape().trim(),
	}

	console.log('mem_uname : ', member.mem_uname);
	console.log('mem_pass : ', member.mem_pass);

	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM tb_member WHERE mem_uname = ' + "'" + member.mem_uname + "'" + ' AND mem_pass = ' + "'" + member.mem_pass + "'", function(err, rows, fields) {
			if(err) {
				console.log(err)
				throw err
			}
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'Member not found with mem_uname = ' + member.mem_uname)
				console.log('Member not found with mem_uname = ' + member.mem_uname)
				//console.log(rows)
				res.end(JSON.stringify(rows));
				console.log(rows)
			}
			else { // if member found
				// render to views/member/edit.ejs template file
				//console.log(rows)
				res.end(JSON.stringify(rows));
				console.log(rows)
				
			}			
		})
		console.log('---END SHOW FIND MEMBER FORM---')	

	})
})

// EDIT MEMBER POST ACTION
app.put('/edit/(:id)', function(req, res, next) {

	console.log('---EDIT MEMBER POST ACTION---')

	//req.assert('name', 'Name is required').notEmpty()           //Validate name
	//req.assert('age', 'Age is required').notEmpty()             //Validate age
    req.assert('mem_email', 'A valid email is required').isEmail()  //Validate email
    var errors = req.validationErrors()
    var member = {
		/*name: req.sanitize('name').escape().trim(),
		age: req.sanitize('age').escape().trim(),
		email: req.sanitize('email').escape().trim(),*/

		/*editid: req.sanitize('editid').escape().trim(),
		edittname: req.sanitize('edittname').escape().trim(),
		editfname: req.sanitize('editfname').escape().trim(),
		editlname: req.sanitize('editlname').escape().trim(),
		editage: req.sanitize('editage').escape().trim(),
		editemail: req.sanitize('editemail').escape().trim(),*/

		mem_id: req.sanitize('mem_id').escape().trim(),
		mem_tname: req.sanitize('mem_tname').escape().trim(),
		mem_fname: req.sanitize('mem_fname').escape().trim(),
		mem_lname: req.sanitize('mem_lname').escape().trim(),
		mem_age: req.sanitize('mem_age'),
		mem_email: req.sanitize('mem_email').escape().trim(),
        mem_birthdate: req.sanitize('mem_birthdate').escape().trim()
	}
    
	console.log(member);
	console.log(errors)
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE tb_member SET ? WHERE mem_gen = ' + req.params.id, member, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					console.log(member)
					console.log(err)
					
				} else {
					req.flash('success', 'Data updated successfully!')
					
					console.log(member)
					console.log('Data updated successfully!')
					
				}
			})

		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
	
        console.log(error_msg)
    }
})

// ADD NEW MEMBER POST ACTION
app.post('/add', function(req, res, next){

	console.log('---ADD NEW MEMBER POST ACTION---')	

	//req.assert('name', 'Name is required').notEmpty()           //Validate name
	//req.assert('age', 'Age is required').notEmpty()             //Validate age
    req.assert('mem_email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var member = {
			mem_id: req.sanitize('mem_id').escape().trim(),
			mem_tname: req.sanitize('mem_tname').escape().trim(),
			mem_fname: req.sanitize('mem_fname').escape().trim(),
			mem_lname: req.sanitize('mem_lname').escape().trim(),
			mem_age: req.sanitize('mem_age').escape().trim(),
			mem_email: req.sanitize('mem_email').escape().trim(),
			mem_useflg: req.sanitize('mem_useflg').escape().trim(),
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO tb_member SET ?', member, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					console.log(err)	
					
					
				} else {				
					req.flash('success', 'Data added successfully!')
					console.log('Data added successfully!')	
					
				}
			})

		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		
        console.log(error_msg)
    }
})

// DELETE MEMBER
app.delete('/delete/(:id)', function(req, res, next) {

	console.log('---DELETE MEMBER---')

	var member = { mem_gen: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM tb_member WHERE mem_gen = ' + req.params.id, member, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to users list page
				console.log(err)
			} else {
				req.flash('success', 'Member deleted successfully! id = ' + req.params.id)
				// redirect to users list page
				console.log('Member deleted successfully! id = ' + req.params.id)
			}
		})

	})
})

// SHOW LIST OF MEMBER BY USERFLG
app.get('/qryUseflgMembers', function(req, res, next) {
	req.getConnection(function(error, conn) {
        console.log('---START QUERY LIST OF MEMBER BY USERFLG---')
		conn.query('SELECT * FROM tb_member WHERE mem_useflg = "1" ORDER BY mem_gen ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				console.log(err)
				req.flash('error', err)
				
			} else {
				//console.log(rows)
				res.end(JSON.stringify(rows));
			}
		})
        console.log('---END QUERY LIST OF MEMBER BY USERFLG---')
	})
})

// EDIT USEFLG MEMBER POST ACTION
app.put('/updateUseflgMember/(:id)', function(req, res, next) {

	console.log('---EDIT EDIT USEFLG MEMBER POST ACTION---')

	//req.assert('name', 'Name is required').notEmpty()           //Validate name
	//req.assert('age', 'Age is required').notEmpty()             //Validate age
    //req.assert('mem_email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()
    var member = {
		mem_useflg: req.sanitize('mem_useflg').escape().trim()
	}
	console.log(member)
	console.log(errors)
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE tb_member SET ? WHERE mem_gen = ' + req.params.id, member, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					console.log(member)
					console.log(err)
					
				} else {
					req.flash('success', 'Data updated successfully!')
					
					console.log(member)
					console.log('Data updated successfully!')
					
				}
			})

		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
	
        console.log(error_msg)
    }
})

//--------------------END MEMBER ROUTE-----------------------

//--------------------START LOCKER ROUTE-----------------------

// SHOW LIST OF LOCKER
app.get('/qryLockers', function(req, res, next) {
	req.getConnection(function(error, conn) {
        console.log('---START QUERY LIST OF LOCKER---')
		conn.query('SELECT * FROM tb_locker ORDER BY loc_gen ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				console.log(err)
				req.flash('error', err)
				
			} else {
				console.log(rows)
				res.end(JSON.stringify(rows));
			}
		})
        console.log('---END QUERY LIST OF LOCKER---')
	})
})

//--------------------END LOCKER ROUTE-----------------------

//--------------------START KEYCARD ROUTE-----------------------

// SHOW LIST OF KEYCARD
app.get('/qryKeycards', function(req, res, next) {
	req.getConnection(function(error, conn) {
        console.log('---START QUERY LIST OF KEYCARD---')
		conn.query('SELECT * FROM tb_rfid r INNER JOIN tb_member m ON m.mem_gen = r.mem_gen ORDER BY rfid_gen ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				console.log(err)
				req.flash('error', err)
				
			} else {
				//console.log(rows)
				res.end(JSON.stringify(rows));
			}
		})
        console.log('---END QUERY LIST OF KEYCARD---')
	})
})

// ADD NEW KEYCARD POST ACTION
app.post('/addKeycard', function(req, res, next){

	console.log('---ADD NEW KEYCARD POST ACTION---')	

	//req.assert('name', 'Name is required').notEmpty()           //Validate name
	//req.assert('age', 'Age is required').notEmpty()             //Validate age
    //req.assert('mem_email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var keycard = {
			/*mem_id: req.sanitize('mem_id').escape().trim(),
			mem_tname: req.sanitize('mem_tname').escape().trim(),
			mem_fname: req.sanitize('mem_fname').escape().trim(),
			mem_lname: req.sanitize('mem_lname').escape().trim(),
			mem_age: req.sanitize('mem_age').escape().trim(),
			mem_email: req.sanitize('mem_email').escape().trim(),
			mem_useflg: req.sanitize('mem_useflg').escape().trim(),*/

			rfid_id: req.sanitize('rfid_id').escape().trim(),
			rfid_status: req.sanitize('rfid_status').escape().trim(),
			mem_gen: req.sanitize('mem_gen')
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO tb_rfid SET ?', keycard, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					console.log(err)	
					
					
				} else {				
					req.flash('success', 'Data added successfully!')
					console.log('Data added successfully!')	
					
				}
			})

		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		
        console.log(error_msg)
    }
})

// DELETE KEYCARD
app.delete('/deleteKeycard/(:id)', function(req, res, next) {

	console.log('---DELETE KEYCARD---')

	var rfid = { rfid_gen: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM tb_rfid WHERE rfid_gen = ' + req.params.id, rfid, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to users list page
				console.log(err)
			} else {
				req.flash('success', 'Keycard deleted successfully! id = ' + req.params.id)
				// redirect to users list page
				console.log('Keycard deleted successfully! id = ' + req.params.id)
			}
		})

	})
})

//--------------------END KEYCARD ROUTE-----------------------

module.exports = app