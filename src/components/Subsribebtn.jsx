'use client';
import React, { useState, useEffect } from 'react'; 
import { Button } from './ui/button';
import { auth, firestore } from '../../firebase/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';
function Subscribers() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const subscribersRef = collection(firestore, 'subscribers');
      const q = query(subscribersRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsSubscribed(true); 
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubscribe = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to subscribe.');
      return;
    }

    if (isSubscribed) {
      alert('You are already subscribed.');
      return;
    }

    try {
      const subscribersRef = collection(firestore, 'subscribers');
      await addDoc(subscribersRef, { email: user.email, timestamp: new Date() });
      setIsSubscribed(true);
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <a href='/signup' className='m-2 text-white p-2 rounded-md bg-blue-400'>
      Register
      </a>
      <a href='/Login' className='m-2 text-white p-2 rounded-md bg-blue-400'>

  Login
      </a>

      <Button onClick={handleSubscribe} className='m-2' disabled={isSubscribed}>
        {isSubscribed ? 'Subscribed' : 'Subscribe'}
      </Button>
    </div>
  );
}

export default Subscribers;
