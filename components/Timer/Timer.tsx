'use client';

import React, { Component, useState, useEffect } from 'react';
import './Timer.css';   

type FlipUnitContainerProps = {
  digit: number;
  shuffle: boolean;
  unit: 'days' | 'hours' | 'minutes' | 'seconds';
};

const AnimatedCard: React.FC<{ animation: string; digit: string }> = ({
  animation,
  digit,
}) => (
  <div className={`flipCard ${animation}`}>
    <span>{digit}</span>
  </div>
);

const StaticCard: React.FC<{ position: string; digit: string }> = ({
  position,
  digit,
}) => (
  <div className={position}>
    <span>{digit}</span>
  </div>
);

const FlipUnitContainer: React.FC<FlipUnitContainerProps> = ({
  digit,
  shuffle,
  unit,
}) => {
    console.log(digit, shuffle, unit);
  const currentDigit = digit.toString().padStart(2, '0');
  let previousDigit =
    digit === 59 ? '00' : (digit + 1).toString().padStart(2, '0');

  if (unit === 'days' && digit === 0) previousDigit = '00';
  else if (unit === 'hours' && digit === 0) previousDigit = '23';
  else if (unit !== 'days' && unit !== 'hours' && digit === 0)
    previousDigit = '59';

  return (
    <div className='flipUnitContainer'>
      <div className='digit-separator'></div>
      <StaticCard position='upperCard' digit={currentDigit} />
      <StaticCard position='lowerCard' digit={previousDigit} />
      <AnimatedCard
        digit={shuffle ? previousDigit : currentDigit}
        animation={shuffle ? 'fold' : 'unfold'}
      />
      <AnimatedCard
        digit={!shuffle ? previousDigit : currentDigit}
        animation={!shuffle ? 'fold' : 'unfold'}
      />
      <div className='label'>{unit.toUpperCase()}</div>
    </div>
  );
};

type FlipClockState = {
  days: number;
  daysShuffle: boolean;
  hours: number;
  hoursShuffle: boolean;
  minutes: number;
  minutesShuffle: boolean;
  seconds: number;
  secondsShuffle: boolean;
};

const FlipClock: React.FC = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    setTargetDate(new Date(2025, 2, 9, 12)); // March 9, 2025, 12:00 PM
  }, []);

  if (!targetDate) return null;

  return <FlipClockInternal targetDate={targetDate} />;
};

class FlipClockInternal extends Component<
  { targetDate: Date },
  FlipClockState
> {
  private timerID?: NodeJS.Timeout;

  constructor(props: { targetDate: Date }) {
    super(props);
    this.state = this.getTimeRemaining();
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
  }

  componentWillUnmount() {
    if (this.timerID) clearInterval(this.timerID);
  }

  getTimeRemaining() {
    const now = new Date();
    const diff = this.props.targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return {
        days: 0,
        daysShuffle: false,
        hours: 0,
        hoursShuffle: false,
        minutes: 0,
        minutesShuffle: false,
        seconds: 0,
        secondsShuffle: false,
      };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      daysShuffle: true,
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      hoursShuffle: true,
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      minutesShuffle: true,
      seconds: Math.floor((diff / 1000) % 60),
      secondsShuffle: true,
    };
  }

  updateTime() {
    this.setState((prevState) => {
      const newState = this.getTimeRemaining();
      return {
        ...newState,
        daysShuffle:
          prevState.days !== newState.days
            ? !prevState.daysShuffle
            : prevState.daysShuffle,
        hoursShuffle:
          prevState.hours !== newState.hours
            ? !prevState.hoursShuffle
            : prevState.hoursShuffle,
        minutesShuffle:
          prevState.minutes !== newState.minutes
            ? !prevState.minutesShuffle
            : prevState.minutesShuffle,
        secondsShuffle:
          prevState.seconds !== newState.seconds
            ? !prevState.secondsShuffle
            : prevState.secondsShuffle,
      };
    });
  }

  render() {
    const {
      days,
      hours,
      minutes,
      seconds,
      daysShuffle,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle,
    } = this.state;

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      return null;
    }

    return (
      <div className='flipClock font-powerGrotesk'>
        <FlipUnitContainer unit='days' digit={days} shuffle={daysShuffle} />
        <FlipUnitContainer unit='hours' digit={hours} shuffle={hoursShuffle} />
        <FlipUnitContainer
          unit='minutes'
          digit={minutes}
          shuffle={minutesShuffle}
        />
        <FlipUnitContainer
          unit='seconds'
          digit={seconds}
          shuffle={secondsShuffle}
        />
      </div>
    );
  }
}

export default FlipClock;