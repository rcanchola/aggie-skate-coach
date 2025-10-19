import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { router } from 'expo-router';

export default function Game() {
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [obstacleLeft, setObstacleLeft] = useState(new Animated.Value(400)); // start off screen
  const jumpValue = useRef(new Animated.Value(0)).current;
  const [Score, setScore] = useState(0);

const clickSound = useRef<Audio.Sound | null>(null);


//Loads in the hurt sound effect
useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/images/AppImages/retro-hurt.mp3')
      );
      clickSound.current = sound;
    };
    loadSound();

    return () => {
      clickSound.current?.unloadAsync();
    };
  }, []);
  const playClick = async () => {
    if (!clickSound.current) return;
  if (clickSound.current) {
    await clickSound.current.replayAsync();
  }
};

const clickSoundReward = useRef<Audio.Sound | null>(null);
//Loads in the Reward sound effect
useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/images/AppImages/Reward.mp3')
      );
      clickSoundReward.current = sound;
    };
    loadSound();

    return () => {
      clickSoundReward.current?.unloadAsync();
    };
  }, []);
  const playReward = async () => {
  if (clickSoundReward.current) {
    await clickSoundReward.current.replayAsync();
  }
};

  // Jump animation
  const jump = () => {
    if (isJumping || gameOver) return;
    setIsJumping(true);
    Animated.sequence([
      Animated.timing(jumpValue, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(jumpValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => setIsJumping(false));
  };

  //tracks when it is jumping
  const [jumpHeight, setJumpHeight] = useState(0);

useEffect(() => {
  const listener = jumpValue.addListener(({ value }) => {
    setJumpHeight(value);
  });

  return () => {
    jumpValue.removeListener(listener);
  };
}, []);


//Keeps the same value 
const gameOverRef = useRef(gameOver);
useEffect(() => {
  gameOverRef.current = gameOver;
}, [gameOver]);

//Keeps the same value 
const ScoreRef = useRef(Score);
useEffect(() => {
  ScoreRef.current = Score;
}, [Score]);


var StartingPosition = 400;
//Makes the moving obstacle
useEffect(() => {
  if (gameOver) return;

  const animateObstacle = () => {
    obstacleLeft.setValue(StartingPosition); // reset start position
    
    Animated.timing(obstacleLeft, {
      toValue: -400,
      duration: 2500,  // slower for visibility
      useNativeDriver: true,
    }).start(() => {
      if (!gameOver) 
        
        
        animateObstacle();
        if (!gameOverRef.current) {
          playReward();   
          setScore(ScoreRef.current + 1);
        }
       
    });
  };

  animateObstacle();
}, [gameOver]);

//Track obstacle position
const [obstacleX, setObstacleX] = useState(StartingPosition);

useEffect(() => {
  const listener = obstacleLeft.addListener(({ value }) => {
    setObstacleX(value);
  });

  return () => {
    obstacleLeft.removeListener(listener);
  };
}, []);



//Collision detector
useEffect(() => {

  if (obstacleX < -200 && jumpHeight > -20 && obstacleX > -300) {
    

    playClick();  

    // Mark game over first
    setGameOver(true);
 

  }
}, [obstacleX]);





  return (
    <View style={styles.container}>
      {/* Floor */}
      <View style={styles.floor} />

      {/* Dog (player) */}
      <Animated.View
        style={[
          styles.dog,
          {
            transform: [{ translateY: jumpValue }],
          },
        ]}
      >
        <Image
          source={require('../../assets/images/AppImages/DogOnBoard.png')}
          style={{ width: 250, height: 250,bottom:-90, left:-120 }}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Obstacle */}
      <Animated.Image
  source={require('../../assets/images/AppImages/PibbleSkating.png')} // replace with your obstacle image
  style={[
    {
      width: 100,
      top: 340,
      right: -0,
      position: 'absolute',
      transform: [{ translateX: obstacleLeft }],
    },
  ]}
  resizeMode="contain"
/>

      {/* Buttons */}
      <View style={styles.buttons}>
        <Pressable
          onPress={async () => {
            
            router.back();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>

        <Pressable onPress={jump} style={[styles.button, { backgroundColor: '#3DDC84' }]}>
          <Text style={styles.buttonText}>Jump</Text>
        </Pressable>
      </View>

      {gameOver && <Text style={styles.gameOver}>Game Over 😢</Text>}


        {/* Score Display */}
        <Text style={{ position: 'absolute', top: 50, fontSize: 30, fontWeight: 'bold', color: 'black' }}>
          Score: {Score}
        </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3ff2ff',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  floor: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#ffd64f',
  },
  dog: {
    position: 'absolute',
    bottom: 60,
    left: 50,
  },
  obstacle: {
    position: 'absolute',
    bottom: 60,
    left: 300,
    width: 40,
    height: 60,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  buttons: {
    position: 'absolute',
    bottom: 120,
    flexDirection: 'row',
    gap: 10,
  },
  button: {

    backgroundColor: '#ff5151',
    borderRadius: 10,
    width: 100,
    height: 75,
    bottom: 600,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,

  },
  gameOver: {
    position: 'absolute',
    top: 250,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
  },
});
