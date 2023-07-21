import './App.css';
import NotFound from './screens/NotFound/NotFound.js';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignUp/SignUp';
import PasswordRecovery from './screens/PasswordRecovery/PasswordRecovery';
import ChangePassword from './screens/ChangePassword/ChangePassword';
import Home from './screens/Home/Home';
import PreviewScreen from './screens/PreviewScreen/PreviewScreen';
import FinalResults from './screens/FinalResults/FinalResults';
import Play from './screens/Play/Play';
import ChallengePlayer from  './screens/ChallengePlayer/ChallengePlayer'
import RivalJoined from './screens/RivalJoined/RivalJoined';
import Question from './screens/Questions/Questions';
import Profile from './screens/Profile/Profile';
import SearchUser from './screens/SearchUser/SearchUser';
import RateQuestion from './screens/RateQuestion/RateQuestion';
import CreateQuestion from './screens/CreateQuestion/CreateQuestion';
import EnterCode from './screens/EnterCode/EnterCode';
import Game from './screens/Game/Game';
import CreateGame from './screens/CreateGame/CreateGame';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<SignIn />}></Route>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/register" element={<SignUp />}></Route>
      <Route path="/password-recovery" element={<PasswordRecovery />}></Route>
      <Route path="/restore-password/:code" element={ <ChangePassword/> }></Route>
      <Route path="/results" element={<FinalResults />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/preview-screen" element={<PreviewScreen/>}></Route>
      <Route path="/play" element={<Play />}></Route>
      <Route path="/challenge-player" element={<ChallengePlayer />}></Route>
      <Route path="/join-game" element={<EnterCode />}></Route>
      <Route path="/rival-joined/:player2/:game_start" element={<RivalJoined />}></Route>
      <Route path="/question-menu" element={<Question />}></Route>
      <Route path="/play" element={<Play />}></Route>
      <Route path="/profile/:username" element={<Profile />}></Route>
      <Route path="/search-user" element={<SearchUser />}></Route>
      <Route path="/rate-question" element={<RateQuestion />}></Route>
      <Route path="/questions" element={<CreateQuestion />}></Route>
      <Route path="/game" element={<Game />}></Route>
      <Route path="/create-game" element={<CreateGame />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;