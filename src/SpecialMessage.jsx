import React, { useState } from "react";
import { motion } from "framer-motion";
import YouTube from "react-youtube";
import { Button } from "./components/ui/Button";
import FloatingItems from './components/FloatingItems';
import Letter from './components/Letter';
import "./styles/SpecialMessage.css";

export default function SpecialMessage() {
  const [showHidden, setShowHidden] = useState(false);
  const [player, setPlayer] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const messageContent = [
    
    "I always thought that when the time came, I'd be writing my resignation letter to you not those manager-clowns. It never crossed my mind that you'd leave before me. But here we are.",
    "Thank you for the incredible years we've shared. You have taught me so much—far beyond just the job itself. I still remember the first time you showed me how to fit the napkin papers inside the box—that was the moment you introduced yourself to me. It seems like such a small thing, but in that moment, and in so many others—like when you taught me how to make coffee—you never rushed me. You let me learn at my own pace, always patient, always supportive, and always optimistic. That's just the kind of person you are.",
    "Even though we met at this shitty place, if there's one thing I'm truly grateful for, it's you. I hope you know that. Every shift I've spent with you has been an absolute joy—not just because you're an incredible coworker, but because you are one of the most genuine, kindhearted, and inspiring people I have ever met.",
    "You've been my rock—the person I turned to when I had too much on my mind, the one who prayed for me and my family when things were tough, the one who stood by me through everything that happened in this lala land.",
    "I'm going to miss your morning singing. I'll miss the way you point at the screen, trying to find something on the register, how you roll your eyes after faking a smile, and the way you almost pinch me when you find something funny. I'll miss all the little things that made working with you feel like home.",
    "You have always been love, kindness, and quiet strength, and I can only hope to be half as inspiring as you. I'm so grateful to have known you and to call you my friend. And if I'm being honest, I probably wouldn't have had the courage to leave this place if you hadn't done it first. So, thank you—for everything.",
    "Wherever you go next, they are so lucky to have you. I already miss you more than words can say.",
    "With all my love and gratitude,\nNikita"
  ];

  const videoId = "gte3BoXKwP0"; // Example: relaxing music video ID

  const opts = {
    height: "1",
    width: "1",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      rel: 0,
      playsinline: 1, // Required for iOS
      modestbranding: 1,
      iv_load_policy: 3,
      origin: window.location.origin
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const toggleMusic = async () => {
    try {
      if (!player) return;

      if (!musicPlaying) {
        // Try to load and play the video
        await player.loadVideoById({
          videoId: videoId,
          startSeconds: 0,
        });
        
        // Force playback attempt
        const playPromise = player.playVideo();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setMusicPlaying(true);
          }).catch(error => {
            console.error("Playback failed:", error);
          });
        }
      } else {
        await player.pauseVideo();
        setMusicPlaying(false);
      }
    } catch (error) {
      console.error("Music toggle error:", error);
    }
  };

  const nextSection = () => {
    if (currentSection < messageContent.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleLetterOpen = () => {
    setCurrentSection(messageContent.length - 1); // Show entire message at once
  };

  return (
    <div className="message-container">
      <FloatingItems />
      
      <Button 
        onClick={toggleMusic} 
        className="button button-music"
      >
        {!player ? "Loading..." : 
         musicPlaying ? "Pause Music 🎵" : "Let's play our music, shall we? 🎵"}
      </Button>

      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Dear D ✨
      </motion.h1>
      
      <Letter onOpen={handleLetterOpen}>
        <div className="letter-container">
          {messageContent.map((section, index) => (
            <motion.p
              key={index}
              className="message-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 * index, duration: 0.5 }}
            >
              {section}
            </motion.p>
          ))}
        </div>
      </Letter>

      {currentSection === messageContent.length - 1 && (
        <>
          {/* <Button 
            onClick={() => setShowHidden(!showHidden)} 
            className="button button-reveal"
          >
            {showHidden ? "Close" : "🌟"}
          </Button> */}
          
          {/* {showHidden && (
            <motion.p
              className="hidden-message"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              "Friendship is like a star; it shines brightest in the darkest times. Thank you for being my star!" 🌟
            </motion.p>
          )} */}
        </>
      )}
      
      <YouTube 
        videoId={videoId} 
        opts={opts} 
        onReady={onReady}
        className="youtube-player"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />
    </div>
  );
}
