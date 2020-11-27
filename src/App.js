import aws_conf from './aws-exports.js';
import './App.css';
import Amplify from 'aws-amplify';
import { useEffect, useState } from 'react';
import { makeStyles, Paper, TextField, Typography, Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { getAllTodos, addTodo, removeTodo } from './graphql/index.js';
import DeleteIcon from '@material-ui/icons/Delete';

Amplify.configure(aws_conf)

const useStyles = makeStyles((theme) => ({
  textfield: {
    margin: '10px 0'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    padding: 20
  },
  paper_todo: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15
  },
  paper_one_todo: {
    marginTop: 10
  }
}))

function App() {
  const classes = useStyles()

  const [todos, setTodos] = useState([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [loading, setLoading] = useState(false)

  const addOneTodo = async () => {
    setLoading(true)
    await addTodo({ title, description })
    fetchTodos()
    setTitle('')
    setDescription('')
    setLoading(false)
  }

  const deleteTodo = async (id) => {
    setLoading(true)
    await removeTodo(id)
    fetchTodos()
    setLoading(false)
  }

  const fetchTodos = async () => {
    const todoResponse = await getAllTodos()
    setTodos(todoResponse)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  console.log(todos)

  return (
    <div className="App">
      <Paper 
        elevation={5}
        className={classes.paper}
      >
        <Paper className={classes.paper_todo} elevation={5}>
          <Typography variant='h4'>Ajouter un TODO</Typography>
          <TextField
            onChange={(event) => { setTitle(event.target.value) }}
            value={title}
            className={classes.textfield}
            label='Titre'
            placeholder='Veuillez renseigner un titre'
            variant='outlined'
          />
          <TextField
            className={classes.textfield}
            value={description}
            onChange={(event) => { setDescription(event.target.value) }}
            label='Description'
            placeholder='Veuillez renseigner la description'
            variant='outlined'
            multiline
            rows={5}
          />
          <Button 
            onClick={addOneTodo} 
            startIcon={loading ? <CircularProgress color="secondary" size={20} /> : <AddIcon />} 
            variant='contained' 
            color="primary"
            disabled={loading}
          >
            Créer
          </Button>
        </Paper>
        {todos.map((todo) => {
          return (
            <Paper className={classes.paper_one_todo}>
              <p>{todo.title}</p>
              <p>{todo.description}</p>
              <Button 
                onClick={() => {
                  deleteTodo(todo.id)
                }}  
                variant='contained' 
                color='secondary' 
                disabled={loading}
              >
                {loading ? <CircularProgress color="secondary" size={20} /> : <DeleteIcon />}
              </Button>
            </Paper>
          )
        })}
      </Paper>
    </div>
  );
}

export default App;
