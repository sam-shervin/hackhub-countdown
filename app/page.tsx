import FlipClock from '@/components/Timer/Timer';

export default function BgImage() {
  return (
    <div className="flex flex-col justify-center text-[1.3vw]  items-center" style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div style={{zIndex: 1 }} className=' mx-auto w-full'>
        <section className='w-[98vw] mx-auto -mb-12'>
        <FlipClock /></section>
      </div>
    </div>
  );
}
