import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import NavBar from './assets/components/NavBar';
import Algorithm from './assets/components/Algorithm';
import InsertionSort from './assets/components/InsertionSort';
import SelectionSort from './assets/components/SelectionSort';
import BubbleSort from './assets/components/BubbleSort';
import CompareAlgorithms from './assets/components/CompareAlgorithms';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ParticlesBackground from './assets/components/ParticlesBackground';


function App() {
  const [selectedOption, setSelectedOption] = useState('RunAlgorithm');
  const appContainerRef = useRef(null);
  const [theme, setTheme] = useState('light');
  const codeStyle = theme === 'dark' ? vscDarkPlus : vs;

  const [algorithmState, setAlgorithmState] = useState({
    algorithm: '',
    inputArray: '',
    sortedArray: [],
    sortingSteps: [],
    showAnimation: false,
    displayAnimation: false,
    fullAlgorithm: '',
    inputtedArray: [],
    displaySteps: false,
    keyVal: 0
  });

  const updateAlgorithmState = (newState) => {
    setAlgorithmState((prevState) => ({
      ...prevState,
      ...newState
    }));
  };

  const [compareAlgorithmState, setCompareAlgorithmState] = useState({
    algorithm1: '',
    algorithm2: '',
    inputArray: '',
    sortedArray: [],
    fullAlgorithm1: '',
    fullAlgorithm2: '',
    inputtedArray: [],
    keyVal: 0
  });

  const updateCompareAlgorithmState = (newState) => {
    setCompareAlgorithmState((prevState) => ({
      ...prevState,
      ...newState
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const appContainer = appContainerRef.current;

      if (selectedOption !== 'InsertionSort' &&
        selectedOption !== 'SelectionSort' &&
        selectedOption !== 'BubbleSort') {

        appContainer.classList.remove('shadow-top');
        appContainer.classList.remove('shadow-bottom');

        return;
      }

      const scrollTop = appContainer.scrollTop;
      const scrollHeight = appContainer.scrollHeight;
      const clientHeight = appContainer.clientHeight;

      if (scrollTop > 0) {
        appContainer.classList.add('shadow-top');
      } else {
        appContainer.classList.remove('shadow-top');
      }

      if (scrollTop + clientHeight < scrollHeight) {
        appContainer.classList.add('shadow-bottom');
      } else {
        appContainer.classList.remove('shadow-bottom');
      }
    };

    const appContainer = appContainerRef.current;
    appContainer.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      appContainer.removeEventListener('scroll', handleScroll);
    };
  }, [selectedOption]);

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(matchMedia.matches ? 'dark' : 'light');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    matchMedia.addEventListener('change', handler);

    return () => {
      matchMedia.removeEventListener('change', handler);
    };
  }, []);

  return (
    <>
      <NavBar setSelectedOption={setSelectedOption} />

      <div className="app-container" ref={appContainerRef}>
        <ParticlesBackground />
        {selectedOption === 'RunAlgorithm' &&
          <Algorithm algorithmState={algorithmState} updateAlgorithmState={updateAlgorithmState} />
        }
        {selectedOption === 'CompareAlgorithm' && <CompareAlgorithms algorithmState={compareAlgorithmState} updateAlgorithmState={updateCompareAlgorithmState} />}
        {selectedOption === 'InsertionSort' && <InsertionSort codeStyle={codeStyle} />}
        {selectedOption === 'SelectionSort' && <SelectionSort codeStyle={codeStyle} />}
        {selectedOption === 'BubbleSort' && <BubbleSort codeStyle={codeStyle} />}
      </div>

      <div className='fixed-footer'>
        <div className="left-footer">
          <p></p>
        </div>
        <div className="center-footer">
          <p>© 2024 • Built by Andreas</p>
        </div>
        <div className="right-footer"></div>
        <p></p>
      </div>
    </>
  );
}

export default App;