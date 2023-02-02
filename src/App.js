import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ExerciseScreen from './screens/ExerciseScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import RecordBodybuilderScreen from './screens/RecordBodybuilderScreen'
import RecordPersonalScreen from './screens/RecordPersonalScreen'
import ResumeScreen from './screens/ResumeScreen'
import DataScreen from './screens/DataScreen'
import IndicationsScreen from './screens/IndicationsScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ExerciseListScreen from './screens/ExerciseListScreen'
import ExerciseEditScreen from './screens/ExerciseEditScreen'
import FeedScreen from './screens/FeedScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/data' component={DataScreen} />
          <Route path='/indications' component={IndicationsScreen} />
          <Route path='/exercise/:id' component={ExerciseScreen} />
          <Route path='/record/bodybuilder' component={RecordBodybuilderScreen} />
          <Route path='/record/personal' component={RecordPersonalScreen} />
          <Route path='/resume' component={ResumeScreen} />

          <Route path='/feed' component={FeedScreen} />

          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route path='/admin/exerciselist' component={ExerciseListScreen} />
          <Route path='/admin/exercise/:id/edit' component={ExerciseEditScreen} />

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
