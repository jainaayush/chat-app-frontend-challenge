import logo from './logo.svg';
import './App.css';
import Yourself from './component/Yourself';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import SelectContact from './component/SelectContact';
import SelecttoMessage from './component/SelecttoMessage';
import Conversation from './component/Conversation';
import Allgroup from './component/Allgroup';
import CreateNew from './component/CreateNew';
function App() {

  const userid = localStorage.getItem('user_id')
  console.log(userid);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Yourself/>}/>
          <Route exact path='/selectcontact' element={<SelectContact/>}/>
          <Route exact path='/select-to-message' element={<SelecttoMessage/>}/>
          <Route exact path='/conversations' element={<Conversation/>}/>
          <Route exact path='/allconversations' element={<Allgroup/>}/>
          <Route exact path='/createNew' element={<CreateNew/>}/>




        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
