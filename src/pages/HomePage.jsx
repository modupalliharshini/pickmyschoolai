import Hero from '../components/Hero';
import TopPicks from '../components/TopPicks';
import AiMatch from '../components/AiMatch';
import BrowseByCity from '../components/BrowseByCity';
import ForSchoolsHero from '../components/ForSchoolsHero';

const HomePage = () => (
  <div className="flex flex-col">
    <Hero />
    <TopPicks />
    <AiMatch />
    <BrowseByCity />
    <ForSchoolsHero />
  </div>
);
export default HomePage;
