const Router = require("express");
const { pool } = require("../db");
const{ validate }= require('../middlewares')

const bookcontroller = new Router();
const { Book } = require('../tables/tables')


Book()





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
        getId(lastRow !== undefined ? lastRow : { id: 0 });
      }
    });

    const getId = (idObj) => {
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
    rejected(err);
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
      text: "SELECT * from books WHERE id = $1",
      values: [req.params.id]
    };

    pool.query(query, (err, res) => {
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
      message: "books could not be updated",
    }) 
    : 
    res.status(401).json({
      message: message.stack
    })
  };
  try {
    const query = {
      text: "UPDATE books SET name=$1, snippet=$2, deweyDecimal=$3, review=$4",
      values: [name, snippet, deweyDecimal, review]
    };
    pool.query(query, (err, res) => {
      if (err) {
        rejected(err)
      } else {
        resolved()
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
      message: "books could not be deleted",
    }) 
  };
  try {
    const query = {
      text: 'DELETE FROM books WHERE id=$1',
      values: [req.params.id]
    }
  pool.query(query, (err, res) => err ? rejected() : resolved())
    
  } catch (e) {
    res.status(500).json({
      message: "failed to remove employee",
    });
  }
});

module.exports = bookcontroller;
