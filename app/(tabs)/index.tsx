import React, { useState,useEffect,useRef } from 'react';
import { View, Text, StyleSheet, Button,Pressable,Image,Linking } from 'react-native';
import { router } from 'expo-router';
import { Audio } from 'expo-av';

export default function HomeScreen() {


  //Deals with the animation and the sprites for the dog
  const frames = [
    require('../../assets/images/AppImages/DogOnBoard.png'),
  ];

  const requestRef = useRef<number | null>(null);
  const lastTime = useRef<number>(0);
  const frameDuration = 200; // ms per frame







  useEffect(() => {

    // Play Music once on app open
    Audio.Sound.createAsync(
      require('../../assets/images/AppImages/BackgroundMusic.mp3'),
      { shouldPlay: true, isLooping: true, volume: 1 }
    );
  }, []);


  const clickSound = useRef<Audio.Sound | null>(null);

useEffect(() => {
  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/images/AppImages/Open.mp3')
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



  const openLink = (url: string) => {
  Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
};

  return (
    <View
      style={
        styles.container
      }
    >
      

      {/* This will create the A&M background */}
      <Image
  source={require('../../assets/images/AppImages/Background2.png')}
  style={{ width: '50%', height: '50%', position: 'absolute',  }}

/>
      <Image
  source={require('../../assets/images/AppImages/Background2.png')}
  style={{ width: '50%', height: '50%', position: 'absolute',bottom:"0%"  }}

/>
<Image
  source={require('../../assets/images/AppImages/Background2.png')}
  style={{ width: '59%', height: '50%', position: 'absolute',right:"0%"  }}

/>
<Image
  source={require('../../assets/images/AppImages/Background2.png')}
  style={{ width: '59%', height: '50%', position: 'absolute',bottom:"0%",right:"0%"  }}

/>

      {/* This container contains the light red stuff in the middle */}
      <View style={styles.container2}>

        

         <Image
  source={require('../../assets/images/AppImages/Background.png')}
  style={{ width: '95%', height: '100%', position: 'absolute', bottom: "2.5%",top: "2.5%", right: "2.5%",borderRadius: 40,  }}

/>
        {/* Animated Dog Sprite */}
        <Image
          key={0}
          source={frames[0]}
          style={{ width: 400, height: 300,left:-20 }}
          resizeMode="contain"
        />

        <Image
          source= {require('../../assets/images/AppImages/TrailWind.png')}
          style={{ width: 100, height: 300,left:0,position:'absolute' }}
          resizeMode="contain"
        />
        
         <Text style={styles.text}>Reveille's Skate School</Text>


     



      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: "-3%" }}>
  
        {/* Box 1 */}
        <View style={styles.box}>
          <Pressable
            onPress={() => 
              {
                
                openLink('https://rcanchola.github.io/aggie-skate-coach/');
                playClick();
              }
            
            
            }
            style={[styles.InsideBox, { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>Skate</Text>
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>Tool</Text>
          </Pressable>
        </View>
        
        {/* Box 2 */}
        <View style={styles.box}> 
          <Pressable
            onPress={() => {
              
              playClick();
              router.push('/Social')

            }}
            style={styles.InsideBox}>
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>Social</Text>
          </Pressable>
        </View>

        {/* Box 3 */}
        <View style={styles.box}> 

          

          <Pressable
            onPress={() =>  {
              
              router.push('/SkateSpots')
              playClick();

            }}
            style={[styles.InsideBox, { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }]}>

            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>Skate</Text>
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>Spots</Text>


           
          </Pressable>
        </View>

        {/* Box 4 */}
        <View style={styles.box}> 
          <Pressable
            onPress={() =>  {
              
              router.push('/game');
              playClick();

            }}
            style={styles.InsideBox}>
            <Text style={{ color: 'Black', fontSize: 37, fontWeight: 'bold' }}>Game</Text>
          </Pressable>
        </View>
            

                    


      </View>

    </View>

    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                
   
  },
  container2: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: '80%',
    height: '85%',
    justifyContent: 'flex-start', // move children to the top
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: '10%',
    marginTop: '10%',
    marginBottom: '0%',
    paddingBottom: '0%',
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
  },
  subtext: {
    fontSize: 16,
    color: '#000000ff',
    textAlign: 'center',
  },
  box: {
    flexDirection: 'row',
    width: 108,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 200, // <-- rounded corners
  },
  InsideBox: {
    flexDirection: 'row',
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#ff5151ff', 
    borderBlockColor: 'black',
    borderWidth: 8,
    },
  
  
});
