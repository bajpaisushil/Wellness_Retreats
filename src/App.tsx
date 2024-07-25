import React from 'react';
import Header from './components/Headers';
import RetreatList from './components/RetreatList';
import yogaBg from './assets/yogabg.png';
import Footer from './components/Footer';


const App: React.FC = () => (
  <div className="min-h-screen">
    <Header />
    <main className="container mx-auto p-4">
      <div className='bg-[#e0d9cf] p-8 flex flex-col gap-2 shadow-xl my-4 rounded-lg mx-4 hidden lg:block'>
        <img src={yogaBg} className='w-full h-[60vh] rounded-lg' />
        <p className='text-[2rem] font-bold my-4'>Discover Your Inner Peace</p>
        <p className='text-[1.2rem] font-medium'>Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation.</p>
      </div>
      <RetreatList />
    </main>
    <Footer />
  </div>
);

export default App;
