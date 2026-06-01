'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '../../lib/store';
import { increment, decrement } from '../../lib/features/counter/counterSlice';

// TODO: Remove, useful only for testing
export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }} className='z-20'>
      <h1>Next.js + Redux (TypeScript)</h1>
      <p style={{ fontSize: '2rem' }}>{count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())} style={{ marginLeft: '10px' }}>Decrement</button>
    </main>
  );
}
