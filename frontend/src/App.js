import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './Components/404'
import Footer from './Components/Footer'
import Header from './Components/Header'
import CreateNote from './Screens/CreateNote'
import Home from './Screens/Home'
import Login from './Screens/Login'
import MyNotes from './Screens/MyNotes'
import MyProfile from './Screens/MyProfile'
import Register from './Screens/Register'
import UpdateNote from './Screens/UpdateNote'

function App() {
  // const [search, setSearch] = useState()

  // console.log(search)
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/MyNote' component={MyNotes} />
          <Route exact path='/CreateNote' component={CreateNote} />
          <Route exact path='/note/:id' component={UpdateNote} />

          <Route exact path='/Profile' component={MyProfile} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/Register' component={Register} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
