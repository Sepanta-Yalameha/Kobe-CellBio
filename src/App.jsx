import { GameProvider, useGame } from './contexts/GameContext';
import Navbar from './components/Navbar';
import WelcomeScreen from './components/WelcomeScreen';
import IngredientDiscovery from './components/IngredientDiscovery';
import CookingLab from './components/CookingLab';
import MolecularAnimation from './components/MolecularAnimation';
import RecipeBuilder from './components/RecipeBuilder';
import ScoreBoard from './components/ScoreBoard';
import QuizModal from './components/QuizModal';
import QuizPractice from './components/QuizPractice';
import ScienceFact from './components/ScienceFact';

function GameContent() {
  const { state } = useGame();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'ingredients':
        return <IngredientDiscovery />;
      case 'cooking':
        return <CookingLab />;
      case 'pathways':
        return <MolecularAnimation />;
      case 'builder':
        return <RecipeBuilder />;
      case 'scoreboard':
        return <ScoreBoard />;
      case 'quiz':
        return <QuizPractice />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 font-body">
      {state.currentScreen !== 'welcome' && <Navbar />}
      <main>{renderScreen()}</main>
      <QuizModal />
      <ScienceFact />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
