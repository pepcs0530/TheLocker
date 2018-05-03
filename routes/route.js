///// required modules 
var config = require('../config')
var express = require('express')
var app = express()

var client = require("jsreport-client")("http://"+config.report.host+":"+config.report.port, "admin", "password")

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
				//console.log(rows)
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

// SHOW MEMBER BY CONDITION
app.post('/search', function(req, res, next){

	console.log('---START SHOW MEMBER BY CONDITION---')	

	var keyword = req.sanitize('keyword').escape().trim();

	console.log('keyword : ', keyword);

	req.getConnection(function(error, conn) {
		conn.query("SELECT * FROM tb_member WHERE (mem_fname like '%" + keyword + "%' or mem_lname like '%"+ keyword +"%') " , function(err, rows, fields) {
			if(err) {
				console.log(err)
				throw err
			}
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'Member not found with keyword = ' + keyword)
				console.log('Member not found with keyword = ' + keyword)
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
		console.log('---END SHOW MEMBER BY CONDITION---')	

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
					res.end();
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
			mem_birthdate: req.sanitize('mem_birthdate').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO tb_member SET ?', member, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					console.log(err)	
					
					
				} else {				
					req.flash('success', 'Data added successfully!')
					res.end();
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
				res.end();
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
				//res.end(JSON.stringify(rows));

				res.write(JSON.stringify(rows));
				res.end();
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
				//console.log(rows)
				res.write(JSON.stringify(rows));
				res.end();
			}
		})
        console.log('---END QUERY LIST OF LOCKER---')
	})
})

// SHOW LOCKER BY CONDITION
app.post('/searchLocker', function(req, res, next){

	console.log('---START SHOW LOCKER BY CONDITION---')	

	var keyword = req.sanitize('keyword').escape().trim();

	console.log('keyword : ', keyword);

	req.getConnection(function(error, conn) {
		
		conn.query(" SELECT * FROM tb_locker WHERE (loc_id LIKE '%" + keyword + "%' OR loc_name LIKE '%" + keyword + "%' ) ORDER BY loc_gen ASC ", function(err, rows, fields) {

			if(err) {
				console.log(err)
				throw err
			}
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'Locker not found with keyword = ' + keyword)
				console.log('Locker not found with keyword = ' + keyword)
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
		console.log('---START SHOW LOCKER BY CONDITION---')	

	})
})

// SHOW EDIT LOCKER BY PK FORM
app.get('/getLockerByPk/(:id)', function(req, res, next){

	console.log('---START SHOW EDIT LOCKER BY PK FORM---')	

	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM tb_locker WHERE loc_gen = ' + req.params.id, function(err, rows, fields) {
			if(err) {
				console.log(err)
				throw err
			}
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'Locker not found with id = ' + req.params.id)
				console.log('Locker not found with id = ' + req.params.id)
				//console.log(rows)
				res.end(JSON.stringify(rows));
				console.log(rows)
			}
			else { // if locker found
				// render to views/member/edit.ejs template file
				//console.log(rows)
				res.end(JSON.stringify(rows));
				console.log(rows)
				
			}			
		})
		console.log('---END SHOW EDIT LOCKER BY PK FORM---')	

	})
})

// EDIT LOCKER PUT ACTION
app.put('/editLocker/(:id)', function(req, res, next) {

	console.log('---EDIT LOCKER PUT ACTION---')

    var errors = req.validationErrors()
    var locker = {
		loc_status: req.sanitize('loc_status').escape().trim()
	}
    
	console.log(locker);
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
			conn.query('UPDATE tb_locker SET ? WHERE loc_gen = ' + req.params.id, locker, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					console.log(locker)
					console.log(err)
					
				} else {
					req.flash('success', 'Data updated successfully!')
					
					console.log(locker)
					res.end();
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
				//res.end(JSON.stringify(rows));

				res.write(JSON.stringify(rows));
				res.end();
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
					res.end();
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
				res.end();
				console.log('Keycard deleted successfully! id = ' + req.params.id)
			}
		})

	})
})

// SHOW KEYCARD BY CONDITION
app.post('/searchKeycard', function(req, res, next){

	console.log('---START SHOW KEYCARD BY CONDITION---')	

	var keyword = req.sanitize('keyword').escape().trim();

	console.log('keyword : ', keyword);

	req.getConnection(function(error, conn) {
		//conn.query("SELECT * FROM tb_member WHERE (mem_fname like '%" + keyword + "%' or mem_lname like '%"+ keyword +"%') " , function(err, rows, fields) {
		conn.query(" SELECT * FROM tb_rfid r INNER JOIN tb_member m ON m.mem_gen = r.mem_gen "
			+ " WHERE (m.mem_fname LIKE '%" + keyword + "%' OR m.mem_lname LIKE '%" + keyword + "%' OR r.rfid_id LIKE '%" + keyword + "%') "
			+ " ORDER BY rfid_gen ASC ", function(err, rows, fields) {

			if(err) {
				console.log(err)
				throw err
			}
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'Keycard not found with keyword = ' + keyword)
				console.log('Keycard not found with keyword = ' + keyword)
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
		console.log('---END SHOW KEYCARD BY CONDITION---')	

	})
})

// SHOW KEYCARD FOR CHECK DUP
app.post('/searchKeycardCheckDup', function(req, res, next){
	console.log('---START SHOW KEYCARD FOR CHECK DUP---')	

	var keyword = req.sanitize('keyword').escape().trim();

	console.log('keyword : ', keyword);

	req.getConnection(function(error, conn) {
		//conn.query("SELECT * FROM tb_member WHERE (mem_fname like '%" + keyword + "%' or mem_lname like '%"+ keyword +"%') " , function(err, rows, fields) {
		conn.query(" SELECT * FROM tb_rfid r  "
			+ " WHERE ( r.rfid_id LIKE '%" + keyword + "%' ) "
			+ " ORDER BY rfid_gen ASC ", function(err, rows, fields) {

			if(err) {
				console.log(err)
				throw err
			}
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'Keycard not found with keyword = ' + keyword)
				console.log('Keycard not found with keyword = ' + keyword)
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
		console.log('---END SHOW SHOW KEYCARD FOR CHECK DUP---')	

	})
})

// SHOW KEYCARD BY CONDITION
app.post('/searchRightMember', function(req, res, next){

	console.log('---START SHOW RIGHT MEMBER BY CONDITION---')	

	var keyword = req.sanitize('keyword').escape().trim();

	console.log('keyword : ', keyword);

	req.getConnection(function(error, conn) {
		
		conn.query(" SELECT * FROM tb_member  "
			+ " WHERE mem_useflg = '1' AND (mem_id LIKE '%" + keyword + "%' OR mem_fname LIKE '%" + keyword + "%' OR mem_lname LIKE '%" + keyword + "%') "
			+ " ORDER BY mem_gen ASC ", function(err, rows, fields) {

			if(err) {
				console.log(err)
				throw err
			}
			
			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'Right member not found with keyword = ' + keyword)
				console.log('Right member not found with keyword = ' + keyword)
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
		console.log('---START SHOW RIGHT MEMBER BY CONDITION---')	

	})
})

// READ KEYCARD FROM RFID
app.get('/readKeycards/(:id)', function(req, res, next) {
	res.write(JSON.stringify(req.params.id));
	res.end();
})

// QUERY CURRENT TAGGING KEYCARD INDEX 0 GET ACTION
app.get('/qryCurrentTaggingKeycard', function(req, res, next) {
	console.log('---START QUERY CURRENT TAGGING KEYCARD INDEX 0 GET ACTION---')
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM tb_current_tag_rfid WHERE cur_tag_gen = 0 ORDER BY cur_tag_gen ASC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				console.log(err)
				req.flash('error', err)
				
			} else {
				//console.log(rows)
				//res.end(JSON.stringify(rows));

				res.write(JSON.stringify(rows));
				res.end();
			}
		})
	})
	console.log('---END QUERY CURRENT TAGGING KEYCARD INDEX 0 GET ACTION---')
})

// ADD CURRENT TAGGING KEYCARD POST ACTION
app.get('/insertCurrentTaggingKeycard/(:id)', function(req, res, next){
	console.log('---START ADD CURRENT TAGGING KEYCARD POST ACTION---')

	var errors = req.validationErrors()
    var keycard = {
		cur_tag_id : req.params.id
	}

	console.log(keycard);
	console.log(errors)
    if( !errors ) { 
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO tb_current_tag_rfid SET ? , cur_tag_updDt = CURRENT_TIMESTAMP() ' , keycard, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					console.log(keycard)
					console.log(err)
					
				} else {
					req.flash('success', 'Data inserted successfully!')
					
					console.log(keycard)
					res.end();
					console.log('Data inserted successfully!')
					
				}
			})

		})
	}else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
	
        console.log(error_msg)
	}
	console.log('---END ADD CURRENT TAGGING KEYCARD POST ACTION---')
})

// EDIT CURRENT TAGGING KEYCARD PUT ACTION
app.put('/updateCurrentTaggingKeycard/(:id)', function(req, res, next) {
	console.log('---START EDIT CURRENT TAGGING KEYCARD PUT ACTION---')

    var errors = req.validationErrors()
    var keycard = {
		cur_tag_id : req.params.id
	}

	console.log(keycard);
	console.log(errors)
    if( !errors ) { 
		req.getConnection(function(error, conn) {
			conn.query('UPDATE tb_current_tag_rfid SET ? , cur_tag_updDt = CURRENT_TIMESTAMP()  WHERE cur_tag_id = ' + '"'+ req.params.id +'"', keycard, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					console.log(keycard)
					console.log(err)
					
				} else {
					req.flash('success', 'Data updated successfully!')
					
					console.log(keycard)
					res.end();
					console.log('Data updated successfully!')
					
				}
			})

		})
	}else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
	
        console.log(error_msg)
	}
	console.log('---END EDIT CURRENT TAGGING KEYCARD PUT ACTION---')
})

// DELETE CURRENT TAGGING KEYCARD DELETE ACTION
app.delete('/deleteCurrentTaggingKeycard', function(req, res, next) {

	console.log('---START DELETE CURRENT TAGGING KEYCARD DELETE ACTION---')

	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM tb_current_tag_rfid ', function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to users list page
				console.log(err)
			} else {
				req.flash('success', 'Data deleted successfully! ')
				// redirect to users list page
				res.end();
				console.log('Data deleted successfully! ' )
			}
		})

	})
	console.log('---END DELETE CURRENT TAGGING KEYCARD DELETE ACTION---')
})

// DELETE CURRENT TAGGING KEYCARD DELETE ACTION
app.get('/deleteCurrentTaggingKeycard', function(req, res, next) {

	console.log('---START DELETE CURRENT TAGGING KEYCARD DELETE ACTION---')

	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM tb_current_tag_rfid ', function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to users list page
				console.log(err)
			} else {
				req.flash('success', 'Data deleted successfully! ')
				// redirect to users list page
				res.end();
				console.log('Data deleted successfully! ' )
			}
		})

	})
	console.log('---END DELETE CURRENT TAGGING KEYCARD DELETE ACTION---')
})

//--------------------END KEYCARD ROUTE-----------------------

//--------------------START REPORT ROUTE-----------------------
app.get("/report", function(req, res, next) {
    client.render({
        template: { content: "Hello World", recipe: "phantom-pdf"}
    }, function(err, response) {
        if (err) {
            return next(err);
        }
        response.pipe(res);
    });
});
//--------------------END REPORT ROUTE-----------------------

module.exports = app