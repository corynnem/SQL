const Router = require("express");
const { pool } = require("../db");
const{ validate }= require('../middlewares')

const bookcontroller = new Router();
const { Book } = require('../tables/tables')


Book()
setTimeout(() => {
  pool.query('ALTER TABLE books ADD FOREIGN KEY (userId) REFERENCES users(id)', (err, res) => err ? console.log(err): console.log('ALTER TABLE users ADD FOREIGN KEY (userId) REFERENCES users(id)') )
}, 500)


bookcontroller.post("/new-book", validate,  async (req, res) => {
  const { name, snippet, deweyDecimal, review } = req.body;

  const resolved = (id) => {
    let userId = req.user.id
    res.status(200).json({
      message: "book entered sucessfully",
      book: { id, name, snippet, deweyDecimal, review, userId},
    });
  };
  const rejected = (message) => {
    res.status(401).json({
      message,
    });
  };

  try {
    pool.query("SELECT id FROM books", (err, res) => {
      if (err) {
        rejected(err);
      } else {
        let lastRow = res.rows[res.rows.length - 1];
        sendBooks(lastRow !== undefined ? lastRow : { id: 0 });
      }
    });

    const sendBooks = (idObj) => {
      let id = (idObj.id += 1);
      const query = {
        text: "INSERT INTO books(id, name, snippet, deweyDecimal, review, userId) VALUES($1, $2, $3, $4, $5, $6)",
        values: [id, name, snippet, deweyDecimal, review, req.user.id],
      };

      pool.query(query, (err, res) => {
        if (err) {
          rejected(err.stack);
        } else {
          resolved(id);
        }
      });
    };
  } catch (err) {
    console.log(err);
  }
});




bookcontroller.route('/:id')
.get(validate, async (req, res) => {
  const resolved = (data) => {
    res.status(200).json({
      message: "data retrieved sucessfully",
      data,
    });
  };
  const rejected = (message) => {
    message === undefined ?
    res.status(401).json({
      message: "no books found",
    }) 
    : 
    res.status(401).json({
      message: message.stack
    })
  };
  try {
    const query = {
      text: "SELECT * from books WHERE id = $1 AND userId=$2",
      values: [req.params.id, req.user.id]
    };

    pool.query(query, (err, res) => {
      console.log(res)
      if (err || res.rows[0] === undefined) {
        rejected(err)
      } else {
        resolved(res.rows);
      }
    });
  } catch (e) {
    rejected(e);
  }
})
.put(validate, async (req, res) => {
  const { name, snippet, deweyDecimal, review } = req.body;
  const resolved = () => {
    res.status(200).json({
      message: "book details updated",
    });
  };
  const rejected = (message) => {
    message === undefined ?
    res.status(401).json({
      message: "book not found or could not be updated",
    })
    : 
    res.status(401).json({
      message: message.stack
    })
  };
  try {

    const query = {
      text: "UPDATE books SET name=$1, snippet=$2, deweyDecimal=$3, review=$4 WHERE userId=$5 AND id=$6",
      values: [name, snippet, deweyDecimal, review, req.user.id, req.params.id]
    };
    console.log(req.user.id, req.params.id)
    pool.query(query, (err, res) => {
      if (err) {
        rejected(err)
      } else {
        res.rowCount > 0 ? resolved() : rejected(undefined)
        
       
      }
    });
  } catch (e) {
    rejected(e);
  }
})
// Challenge DELETE
.delete( validate, async (req, res) => {
  const resolved = () => {
    res.status(200).json({
      message: "book deleted",
    });
  };
  const rejected = () => {
    res.status(401).json({
      message: "book could not be deleted",
    }) 
  };
  try {
    const query = {
      text: 'DELETE FROM books WHERE id=$1 and userId=$2',
      values: [req.params.id, req.user.id]
    }

  pool.query(query, (err, res) => {
    console.log(res)
    return err  ?  rejected() : res.rowCount > 0 ? resolved() : rejected()
  })
    
  } catch {
   rejected()
  }
});

module.exports = bookcontroller;
