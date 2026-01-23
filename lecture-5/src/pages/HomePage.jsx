import Counter from '@/components/Counter';

import reactLogo from '@assets/react.svg';

import './HomePage.css';

export default function HomePage() {
  return (
    <div className='home'>
      <div className='home__content'>
        <img src={reactLogo} className='home__logo' />
        <h1 className='home__heading'>React + Webpack Demo</h1>
        <div className='home__counter-wrapper'>
          <Counter />
          <Counter />
        </div>
      </div>
    </div>
  );
}
