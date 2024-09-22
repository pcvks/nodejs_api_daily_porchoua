
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const path = require('path');
const multer = require('multer');

const bcrypt = require('bcrypt');


app.use(bodyParser.json());
app.use(cors());
app.use(express.static('uploads'));

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect MySQL Database
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connection successfully');
});

// Login route
app.post('/login', (req, res) => {
    const {
        phone,
        password
    } = req.body;
    if (!phone || !password) {
        return res.status(400).send({
            error: true,
            message: 'Please provide phone and password'
        });
    }

    db.query('SELECT * FROM users WHERE phone = ?', [phone], (error, results, fields) => {
        if (error) throw error;

        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    res.send({
                        error: false,
                        message: 'Login successfully',
                        user
                    });
                } else {
                    res.status(401).send({
                        error: true,
                        message: 'phone or password incorrect'
                    });
                }
            });
        } else {
            res.status(401).send({
                error: true,
                message: 'phone or password incorrect'
            });
        }
    });
});

// API Create Admin
app.post('/api/create-admin', async (req, res) => {
    const {
        name,
        email,
        password,
        phone
    } = req.body;

    // Check if fields are present and not empty strings
    if (!name || !email || !password || !phone || name.trim() === '' || email.trim() === '' || password.trim() === '' || phone.trim() === '') {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users (name, email,  password, phone, timestamp) VALUES (?, ?, ?, ?, NOW())`;
        const values = [name, email, hashedPassword, phone];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send({
                    error: 'Database error'
                });
            }
            res.status(201).send({
                message: 'Admin added successfully',
                userId: result.insertId
            });
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        return res.status(500).send({
            error: 'Server error'
        });
    }
});

// API Create Daily
app.post('/api/create-daily', (req, res) => {
    const {
        five_six,
        six_seven,
        seven_eight,
        eight_nine,
        nine_ten,
        ten_eleven,
        eleven_twelve,
        twelve_thirteen,
        thirteen_fourteen,
        fourteen_fifteen,
        fifteen_sixteen,
        sixteen_seventeen,
        seventeen_eighteen,
        eighteen_nineteen,
        nineteen_twenty,
        twenty_twentyone,
        twentyone_twentytwo,
        twentytwo_twentythree,
        twentythree_five,
        days
    } = req.body;

    if (!five_six || !six_seven ||
        !seven_eight || !eight_nine ||
        !nine_ten || !ten_eleven ||
        !eleven_twelve || !twelve_thirteen ||
        !thirteen_fourteen || !fourteen_fifteen ||
        !fifteen_sixteen || !sixteen_seventeen ||
        !seventeen_eighteen || !eighteen_nineteen ||
        !nineteen_twenty || !twenty_twentyone ||
        !twentyone_twentytwo || !twentytwo_twentythree ||
        !twentythree_five || !days ||
        five_six.trim() === "" || six_seven.trim() === "" ||
        seven_eight.trim() === "" || eight_nine.trim() === "" ||
        nine_ten.trim() === "" || ten_eleven.trim() === "" ||
        eleven_twelve.trim() === "" || twelve_thirteen.trim() === "" ||
        thirteen_fourteen.trim() === "" || fourteen_fifteen.trim() === "" ||
        fifteen_sixteen.trim() === "" || sixteen_seventeen.trim() === "" ||
        seventeen_eighteen.trim() === "" || eighteen_nineteen.trim() === "" ||
        nineteen_twenty.trim() === "" || twenty_twentyone.trim() === "" ||
        twentyone_twentytwo.trim() === "" || twentytwo_twentythree.trim() === "" ||
        twentythree_five.trim() === "" || days.trim() === "") {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }

    console.log('Request body:', req.body);

    const query = `INSERT INTO daily (five_six, six_seven, seven_eight, eight_nine, nine_ten, ten_eleven, eleven_twelve, twelve_thirteen, thirteen_fourteen, fourteen_fifteen, fifteen_sixteen, sixteen_seventeen, seventeen_eighteen, eighteen_nineteen, nineteen_twenty, twenty_twentyone, twentyone_twentytwo, twentytwo_twentythree, twentythree_five, days, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
    const values = [five_six, six_seven, seven_eight, eight_nine, nine_ten, ten_eleven, eleven_twelve, twelve_thirteen, thirteen_fourteen, fourteen_fifteen, fifteen_sixteen, sixteen_seventeen, seventeen_eighteen, eighteen_nineteen, nineteen_twenty, twenty_twentyone, twentyone_twentytwo, twentytwo_twentythree, twentythree_five, days];

    console.log('Executing query:', query);
    console.log('With values:', values);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err); // Log the exact error
            return res.status(500).send({
                error: 'Database error'
            });
        }
        res.status(201).send({
            message: 'User added successfully',
            userId: result.insertId
        });
    });
});


// API Create Income
app.post('/api/create-income', (req, res) => {
    const {
        income,
        income_reason,
        m_status,
    } = req.body;

    if (!income || !income_reason || !m_status ||
        income_reason.trim() === "" || m_status.trim() === "") {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }

    console.log('Request body:', req.body);

    const query = `INSERT INTO daily (income, income_reason, m_status, timestamp) VALUES (?, ?, ?, NOW())`;
    const values = [income, income_reason, m_status];

    console.log('Executing query:', query);
    console.log('With values:', values);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err); // Log the exact error
            return res.status(500).send({
                error: 'Database error'
            });
        }
        res.status(201).send({
            message: 'Income added successfully',
            incomeId: result.insertId
        });
    });
});

// API Create Expenditure
app.post('/api/create-expenditure', (req, res) => {
    const {
        expenditure,
        expenditure_reason,
        m_status
    } = req.body;

    if (!expenditure || !expenditure_reason || !m_status ||
        expenditure_reason.trim() === "" || m_status.trim() === "") {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }

    console.log('Request body:', req.body);

    const query = `INSERT INTO daily (expenditure, expenditure_reason, m_status, timestamp) VALUES (?, ?, ?, NOW())`;
    const values = [expenditure, expenditure_reason, m_status];

    console.log('Executing query:', query);
    console.log('With values:', values);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err); // Log the exact error
            return res.status(500).send({
                error: 'Database error'
            });
        }
        res.status(201).send({
            message: 'Expenditure added successfully',
            expenditureId: result.insertId
        });
    });
});



// API Create Note
app.post('/api/create-note', (req, res) => {
    const {
        content,
        module
    } = req.body;

    if (!content || !module || content.trim() === ""||
        module.trim() === "" ) {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }

    console.log('Request body:', req.body);

    const query = `INSERT INTO notes (content, module, timestamp) VALUES ( ?, ?, NOW())`;
    const values = [content, module];

    console.log('Executing query:', query);
    console.log('With values:', values);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err); // Log the exact error
            return res.status(500).send({
                error: 'Database error'
            });
        }
        res.status(201).send({
            message: 'note added successfully',
            noteId: result.insertId
        });
    });
});

// API Create Plan
app.post('/api/create-plan', (req, res) => {
    const {
        plan_name,
        percent,
    } = req.body;

    if (!plan_name || !percent || plan_name.trim() === "" ) {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }

    console.log('Request body:', req.body);

    const query = `INSERT INTO plans (plan_name, percent, timestamp) VALUES ( ?, ?, NOW())`;
    const values = [plan_name, percent];

    console.log('Executing query:', query);
    console.log('With values:', values);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err); // Log the exact error
            return res.status(500).send({
                error: 'Database error'
            });
        }
        res.status(201).send({
            message: 'plan added successfully',
            planId: result.insertId
        });
    });
});


// API Create School Table
app.post('/api/create-school_table', (req, res) => {
    const {
        days,
        first_time,
        second_time,
        third_time,
        fourth_time
    } = req.body;

    if (!days || !first_time || !second_time || !third_time || !fourth_time 
        || days.trim() === ""|| first_time.trim() === ""|| second_time.trim() === "" 
        || third_time.trim() === ""|| fourth_time.trim() === "" ) {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }

    console.log('Request body:', req.body);

    const query = `INSERT INTO school_tables (days, first_time, second_time, third_time, fourth_time, timestamp) VALUES ( ?, ?, ?, ?, ?, NOW())`;
    const values = [days, first_time, second_time, third_time, fourth_time];

    console.log('Executing query:', query);
    console.log('With values:', values);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err); // Log the exact error
            return res.status(500).send({
                error: 'Database error'
            });
        }
        res.status(201).send({
            message: 'Table added successfully',
            s_tableId: result.insertId
        });
    });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.post('/api/upload', upload.single('image'), (req, res) => {
    const { filename } = req.file;
    const filepath = `/${filename}`;
    const query = 'INSERT INTO images (filename, path) VALUES (?, ?)';
    db.query(query, [filename, filepath], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save image metadata in the database' });
      }
      res.json({ filePath: filepath });
    });
  });
  

  // Endpoint to get the list of uploaded images
app.get('/api/images', (req, res) => {
    const query = 'SELECT * FROM images';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve images from the database' });
      }
      res.json(results);
    });
  });
  
  // Serve uploaded files
  app.use('/uploads', express.static('uploads'));
  
// API Select Admin

app.get('/api/admin', (req, res) => {
    const query = "SELECT * FROM users ORDER BY id DESC";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});

// API Select daily

app.get('/api/daily', (req, res) => {
    const query = "SELECT * FROM daily WHERE five_six IS NOT NULL ORDER BY id DESC";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});

// API Select Income

app.get('/api/income', (req, res) => {
    const query = "SELECT * FROM daily WHERE income IS NOT NULL ORDER BY id DESC LIMIT 5";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching daily:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});

// API Select Income

app.get('/api/all-income', (req, res) => {
    const query = "SELECT * FROM daily WHERE income IS NOT NULL ORDER BY id DESC";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching daily:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});

// API Select Expenditure

app.get('/api/expenditure', (req, res) => {
    const query = "SELECT * FROM daily WHERE expenditure IS NOT NULL ORDER BY id DESC LIMIT 5";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching daily:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});

// API Select Expenditure

app.get('/api/all-expenditure', (req, res) => {
    const query = "SELECT * FROM daily WHERE expenditure IS NOT NULL ORDER BY id DESC";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching daily:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});

// API Select Note

app.get('/api/note', (req, res) => {
    const query = "SELECT * FROM notes ORDER BY id DESC LIMIT 5";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching note:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});

// API Select Note

app.get('/api/all-note', (req, res) => {
    const query = "SELECT * FROM notes ORDER BY id DESC";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching note:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});

// API Select School_Table

app.get('/api/school_table', (req, res) => {
    const query = "SELECT * FROM school_tables";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching daily:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});


// API Select Plan

app.get('/api/plan', (req, res) => {
    const query = "SELECT * FROM plans ORDER BY id DESC";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching Plan:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});


// API Select Plan Success

app.get('/api/plan_success', (req, res) => {
    const query = "SELECT * FROM plans WHERE status = 1 ORDER BY id DESC";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching Plan:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});

// API Select Plan Not Yet Success

app.get('/api/plan_not_yet_success', (req, res) => {
    const query = "SELECT * FROM plans WHERE status = 0 ORDER BY id DESC";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching Plan:', err);
            return res.status(500).send({
                error: "Database Error"
            });
        }
        res.status(200).send(results);
    });
});



// API Update Admin
app.get('/api/admin/:Admin_ID', (req, res) => {
    const adminId = req.params.Admin_ID;
    const query = "SELECT * FROM users WHERE id = ?";

    db.query(query, [adminId], (err, results) => {
        if (err) {
            console.error('Error fetching admin:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }
        if (results.length === 0) {
            return res.status(404).send({
                error: 'admin not found'
            });
        }
        res.status(200).send(results[0]);
    });
});

app.put('/api/update-admin/:AdminId', async (req, res) => {
    const adminId = req.params.AdminId;
    const {
        name,
        phone,
        email,
        password
    } = req.body;

    // Check if fields are present and not empty strings
    if (!name || !phone || !email || name.trim() === '' || phone.trim() === '' || email.trim() === '') {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }

    try {
        // Hash the password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Construct the query based on whether password is provided
        let query, values;
        if (hashedPassword) {
            query = `UPDATE users SET name = ?, phone = ?, email = ?, password = ? WHERE id = ?`;
            values = [name, phone, email, hashedPassword, adminId];
        } else {
            query = `UPDATE users SET name = ?, phone = ?, email = ? WHERE id = ?`;
            values = [name, phone, email, adminId];
        }

        db.query(query, values, (err, result) => {
            if (err) {
                console.error('Error updating Admin:', err);
                return res.status(500).send({
                    error: 'Database error'
                });
            }

            // Check if any row was updated
            if (result.affectedRows === 0) {
                return res.status(404).send({
                    error: 'Admin not found'
                });
            }

            res.status(200).send({
                message: 'Admin updated successfully',
                adminId: adminId
            });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).send({
            error: 'Server error'
        });
    }
});


// API Update Daily
app.get('/api/daily/:dailyId', (req, res) => {
    const dailyId = req.params.dailyId;
    const query = "SELECT * FROM daily WHERE id = ?";

    db.query(query, [dailyId], (err, results) => {
        if (err) {
            console.error('Error fetching admin:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }
        if (results.length === 0) {
            return res.status(404).send({
                error: 'daily not found'
            });
        }
        res.status(200).send(results[0]);
    });
});


// API Update Income
app.get('/api/daily/:dailyId', (req, res) => {
    const dailyId = req.params.dailyId;
    const query = "SELECT * FROM daily WHERE id = ?";

    db.query(query, [dailyId], (err, results) => {
        if (err) {
            console.error('Error fetching admin:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }
        if (results.length === 0) {
            return res.status(404).send({
                error: 'daily not found'
            });
        }
        res.status(200).send(results[0]);
    });
});

app.put('/api/update-daily/:dailyId', async (req, res) => {
    const dailyId = req.params.dailyId;
    const {
        five_six,
        six_seven,
        seven_eight,
        eight_nine,
        nine_ten,
        ten_eleven,
        eleven_twelve,
        twelve_thirteen,
        thirteen_fourteen,
        fourteen_fifteen,
        fifteen_sixteen,
        sixteen_seventeen,
        seventeen_eighteen,
        eighteen_nineteen,
        nineteen_twenty,
        twenty_twentyone,
        twentyone_twentytwo,
        twentytwo_twentythree,
        twentythree_five,
        days
    } = req.body;

    if (!five_six || !six_seven ||
        !seven_eight || !eight_nine ||
        !nine_ten || !ten_eleven ||
        !eleven_twelve || !twelve_thirteen ||
        !thirteen_fourteen || !fourteen_fifteen ||
        !fifteen_sixteen || !sixteen_seventeen ||
        !seventeen_eighteen || !eighteen_nineteen ||
        !nineteen_twenty || !twenty_twentyone ||
        !twentyone_twentytwo || !twentytwo_twentythree ||
        !twentythree_five || !days ||
        five_six.trim() === "" || six_seven.trim() === "" ||
        seven_eight.trim() === "" || eight_nine.trim() === "" ||
        nine_ten.trim() === "" || ten_eleven.trim() === "" ||
        eleven_twelve.trim() === "" || twelve_thirteen.trim() === "" ||
        thirteen_fourteen.trim() === "" || fourteen_fifteen.trim() === "" ||
        fifteen_sixteen.trim() === "" || sixteen_seventeen.trim() === "" ||
        seventeen_eighteen.trim() === "" || eighteen_nineteen.trim() === "" ||
        nineteen_twenty.trim() === "" || twenty_twentyone.trim() === "" ||
        twentyone_twentytwo.trim() === "" || twentytwo_twentythree.trim() === "" ||
        twentythree_five.trim() === "" || days.trim() === "") {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }
    const query = `UPDATE daily SET five_six = ?, six_seven = ?, seven_eight = ?, eight_nine = ?, nine_ten = ?, ten_eleven = ?, eleven_twelve = ?, twelve_thirteen = ?, thirteen_fourteen = ?, fourteen_fifteen = ?, fifteen_sixteen = ?, sixteen_seventeen = ?, seventeen_eighteen = ?, eighteen_nineteen = ?, nineteen_twenty = ?, twenty_twentyone = ?, twentyone_twentytwo = ?, twentytwo_twentythree = ?, twentythree_five = ?, days = ? WHERE id = ?`;
    const values = [five_six, six_seven, seven_eight, eight_nine, nine_ten, ten_eleven, eleven_twelve, twelve_thirteen, thirteen_fourteen, fourteen_fifteen, fifteen_sixteen, sixteen_seventeen, seventeen_eighteen, eighteen_nineteen, nineteen_twenty, twenty_twentyone, twentyone_twentytwo, twentytwo_twentythree, twentythree_five, days, dailyId];
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating Employee:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }

        // Check if any row was updated
        if (result.affectedRows === 0) {
            return res.status(404).send({
                error: 'Daily not found'
            });
        }

        res.status(200).send({
            message: 'Daily updated successfully',
            dailyId: dailyId
        });
    });
});

// API Update Income
app.get('/api/income/:IncomeID', (req, res) => {
    const IncomeID = req.params.IncomeID;
    const query = "SELECT * FROM daily WHERE id = ?";

    db.query(query, [IncomeID], (err, results) => {
        if (err) {
            console.error('Error fetching admin:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }
        if (results.length === 0) {
            return res.status(404).send({
                error: 'daily not found'
            });
        }
        res.status(200).send(results[0]);
    });
});

app.put('/api/update-income/:IncomeID', async (req, res) => {
    const IncomeID = req.params.IncomeID;
    const {
        income,
        income_reason,
        m_status
    } = req.body;

    if (!income || !income_reason ||
        !m_status || income_reason.trim() === "" ||
        m_status.trim() === "") {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }
    const query = `UPDATE daily SET income = ?, income_reason = ?, m_status = ? WHERE id = ?`;
    const values = [income, income_reason, m_status, IncomeID];
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating Employee:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }

        // Check if any row was updated
        if (result.affectedRows === 0) {
            return res.status(404).send({
                error: 'Daily not found'
            });
        }

        res.status(200).send({
            message: 'Daily updated successfully',
            IncomeID: IncomeID
        });
    });
});



// API Update Expenditure
app.get('/api/Expenditure/:ExpenditureID', (req, res) => {
    const ExpenditureID = req.params.ExpenditureID;
    const query = "SELECT * FROM daily WHERE id = ?";

    db.query(query, [ExpenditureID], (err, results) => {
        if (err) {
            console.error('Error fetching admin:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }
        if (results.length === 0) {
            return res.status(404).send({
                error: 'daily not found'
            });
        }
        res.status(200).send(results[0]);
    });
});

app.put('/api/update-expenditure/:ExpenditureID', async (req, res) => {
    const ExpenditureID = req.params.ExpenditureID;
    const {
        expenditure,
        expenditure_reason,
        m_status
    } = req.body;

    if (!expenditure || !expenditure_reason ||
        !m_status || expenditure_reason.trim() === "" ||
        m_status.trim() === "") {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }
    const query = `UPDATE daily SET expenditure = ?, expenditure_reason = ?, m_status = ? WHERE id = ?`;
    const values = [expenditure, expenditure_reason, m_status, ExpenditureID];
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating Employee:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }

        // Check if any row was updated
        if (result.affectedRows === 0) {
            return res.status(404).send({
                error: 'Daily not found'
            });
        }

        res.status(200).send({
            message: 'Daily updated successfully',
            ExpenditureID: ExpenditureID
        });
    });
});

// API Update Note
app.get('/api/note/:noteID', (req, res) => {
    const noteID = req.params.noteID;
    const query = "SELECT * FROM notes WHERE id = ?";

    db.query(query, [noteID], (err, results) => {
        if (err) {
            console.error('Error fetching note:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }
        if (results.length === 0) {
            return res.status(404).send({
                error: 'note not found'
            });
        }
        res.status(200).send(results[0]);
    });
});

app.put('/api/update-note/:noteID', async (req, res) => {
    const noteID = req.params.noteID;
    const {
        content,
        module
    } = req.body;

    if (!content || !module  || module.trim() === "" ||
        content.trim() === "") {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }
    const query = `UPDATE notes SET content = ?, module = ? WHERE id = ?`;
    const values = [content, module, noteID];
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating Employee:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }

        // Check if any row was updated
        if (result.affectedRows === 0) {
            return res.status(404).send({
                error: 'Note not found'
            });
        }

        res.status(200).send({
            message: 'Note updated successfully',
            noteID: noteID
        });
    });
});

// API Update Plan
app.get('/api/plan/:PlanID', (req, res) => {
    const PlanID = req.params.PlanID;
    const query = "SELECT * FROM plans WHERE id = ?";

    db.query(query, [PlanID], (err, results) => {
        if (err) {
            console.error('Error fetching note:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }
        if (results.length === 0) {
            return res.status(404).send({
                error: 'note not found'
            });
        }
        res.status(200).send(results[0]);
    });
});

app.put('/api/update-plan/:PlanID', async (req, res) => {
    const PlanID = req.params.PlanID;
    const {
        plan_name,
        percent,
        active,
        status
    } = req.body;

    if (!plan_name || !percent || !active || !status ||
        plan_name.trim() === "") {
        return res.status(400).send({
            error: 'All fields are required'
        });
    }
    const query = `UPDATE plans SET plan_name = ?, percent = ?, active = ?, status = ? WHERE id = ?`;
    const values = [plan_name, percent, active, status, PlanID];
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating Employee:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        }

        // Check if any row was updated
        if (result.affectedRows === 0) {
            return res.status(404).send({
                error: 'Note not found'
            });
        }

        res.status(200).send({
            message: 'Plan updated successfully',
            PlanID: PlanID
        });
    });
});


// API Delete Admin
app.delete('/api/delete-admin/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = 'DELETE FROM users WHERE id = ?';
    const values = [userId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error deleting admin:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        } else if (result.affectedRows === 0) {
            // No admin found with the given ID
            return res.status(404).send({
                error: 'Admin not found'
            });
        }
        res.status(200).send({
            message: 'Admin deleted successfully'
        });
    });
});

// API Delete Daily
app.delete('/api/delete-daily/:dailyId', (req, res) => {
    const dailyId = req.params.dailyId;

    const query = 'DELETE FROM daily WHERE id = ?';
    const values = [dailyId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error deleting daily:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        } else if (result.affectedRows === 0) {
            // No admin found with the given ID
            return res.status(404).send({
                error: 'Daily not found'
            });
        }
        res.status(200).send({
            message: 'Daily deleted successfully'
        });
    });
});

// API Delete Note
app.delete('/api/delete-note/:noteId', (req, res) => {
    const noteId = req.params.noteId;

    const query = 'DELETE FROM notes WHERE id = ?';
    const values = [noteId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error deleting note:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        } else if (result.affectedRows === 0) {
            // No note found with the given ID
            return res.status(404).send({
                error: 'note not found'
            });
        }
        res.status(200).send({
            message: 'Note deleted successfully'
        });
    });
});


// API Delete Plan
app.delete('/api/delete-plan/:planId', (req, res) => {
    const planId = req.params.planId;

    const query = 'DELETE FROM plans WHERE id = ?';
    const values = [planId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error deleting Plan:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        } else if (result.affectedRows === 0) {
            // No note found with the given ID
            return res.status(404).send({
                error: 'Plan not found'
            });
        }
        res.status(200).send({
            message: 'Plan deleted successfully'
        });
    });
});

// API Delete Plan
app.delete('/api/delete-school_table/:school_table_id', (req, res) => {
    const school_table_id = req.params.school_table_id;

    const query = 'DELETE FROM school_tables WHERE id = ?';
    const values = [school_table_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error deleting Plan:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        } else if (result.affectedRows === 0) {
            // No note found with the given ID
            return res.status(404).send({
                error: 'Plan not found'
            });
        }
        res.status(200).send({
            message: 'School Table deleted successfully'
        });
    });
});


// API DELETE image
app.delete('/api/delete-image/:imageId', (req, res) => {
    const imageId = req.params.imageId;

    const query = 'DELETE FROM images WHERE id = ?';
    const values = [imageId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error deleting admin:', err);
            return res.status(500).send({
                error: 'Database error'
            });
        } else if (result.affectedRows === 0) {
            // No admin found with the given ID
            return res.status(404).send({
                error: 'Image not found'
            });
        }
        res.status(200).send({
            message: 'Admin deleted successfully'
        });
    });
});

// API endpoint to get the count plan
app.get('/api/count-plan_success', (req, res) => {
    const query = 'SELECT COUNT(`plan_name`) as count_plan_success FROM `plans` WHERE `status` = 1';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ count_plan_success: results[0].count_plan_success });
    });
});
  

  // API endpoint to get the count plan
app.get('/api/count-plan_not_yet_success', (req, res) => {
    const query = 'SELECT COUNT(`plan_name`) as count_plan_not_yet_success FROM `plans` WHERE `status` = 0';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ count_plan_not_yet_success: results[0].count_plan_not_yet_success });
    });
});


  // API endpoint to get the count plan
  app.get('/api/count-plan', (req, res) => {
    const query = 'SELECT COUNT(`plan_name`) as count_plan FROM `plans`';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ count_plan: results[0].count_plan });
    });
});

  // API endpoint to get the count daily
  app.get('/api/count-days', (req, res) => {
    const query = 'SELECT COUNT(`five_six`) as count_days FROM `daily` WHERE expenditure IS NULL AND income IS NULL';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ count_days: results[0].count_days });
    });
});


  // API endpoint to get the sum Income
app.get('/api/sum-income', (req, res) => {
    const query = 'SELECT SUM(`income`) as sum_income FROM `daily`';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ sum_income: results[0].sum_income });
    });
});

  // API endpoint to get the sum Income
  app.get('/api/sum-expenditure', (req, res) => {
    const query = 'SELECT SUM(`expenditure`) as sum_expenditure FROM `daily`';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ sum_expenditure: results[0].sum_expenditure });
    });
});

 // API endpoint to get the sum Income
 app.get('/api/sum-money_remaining', (req, res) => {
    const query = 'SELECT SUM(`income`) - SUM(`expenditure`) as sum_money_remaining FROM `daily`';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ sum_money_remaining: results[0].sum_money_remaining });
    });
});

 // API endpoint to get the sum Income
 app.get('/api/sum-expenditure_todays', (req, res) => {
    const query = 'SELECT SUM(`expenditure`) as sum_expenditure_todays FROM `daily` WHERE DATE(timestamp) = CURRENT_DATE()';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ sum_expenditure_todays: results[0].sum_expenditure_todays });
    });
});
// Run on Port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
})