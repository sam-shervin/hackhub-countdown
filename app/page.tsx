import Image from 'next/image';
import FlipClock from '@/components/Timer/Timer';

export default function BgImage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Image
        src="/Title.png" // update with your image path
        alt="Background Image"
        layout="fill"
        objectFit="contain"
        priority
      />
      <div style={{ position: 'absolute', zIndex: 1 }} className='bottom-0 mx-auto w-full'>
        <section className='w-[90vw] mx-auto scale-80 -mb-12'>
        <FlipClock /></section>
      </div>
    </div>
  );
}
