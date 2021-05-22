import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import CreateAccountPage from './components/pages/CreateAccountPage'
import RestoreAccountPage from './components/pages/RestoreAccountPage'
import AccountPage from './components/pages/AccountPage'
import TransactionPage from './components/pages/TransactionPage'
import Header from './components/stateless/Header'

function App() {
	return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="py-10">
          <main>
            <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
              <Switch>
                <Route path="/create" component={CreateAccountPage} />
                <Route path="/restore" component={RestoreAccountPage} />
                <Route path="/account" component={AccountPage} />
                <Route path="/transaction" component={TransactionPage} />

                <Route exact path="/">
                  {localStorage.getItem('address') !== null ? (
                    <Redirect to="/account" />
                  ) : (
                    <Redirect to="/create" />
                  )}
                </Route>
              </Switch>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
