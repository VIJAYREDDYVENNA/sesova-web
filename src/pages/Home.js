import React, { useEffect } from 'react';
import useHomeVals from '../hooks/useHomeVals';
import Hero from './home/Hero';
import Ecosystem from './home/Ecosystem';
import Fragmented from './home/Fragmented';
import Capabilities from './home/Capabilities';
import Architecture from './home/Architecture';
import PlatformLayers from './home/PlatformLayers';
import Product from './home/Product';
import Solutions from './home/Solutions';
import Intelligence from './home/Intelligence';
import Demo from './home/Demo';

export default function Home() {
  const v = useHomeVals();

  useEffect(() => {
    document.title = 'SeSova — Connecting Portfolios. Commanding Certainty.';
  }, []);

  return (
    <div>
      <Hero v={v} />
      <Ecosystem v={v} />
      <Fragmented v={v} />
      <Capabilities v={v} />
      <Architecture v={v} />
      <PlatformLayers v={v} />
      <Product v={v} />
      <Solutions v={v} />
      <Intelligence v={v} />
      <Demo v={v} />
    </div>
  );
}
