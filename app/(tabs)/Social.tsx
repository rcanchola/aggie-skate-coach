import React, { useState,useEffect,useRef } from 'react';
import { View, Text, StyleSheet, Button,Pressable,Image,Linking } from 'react-native';
import { router } from 'expo-router';
import { Audio } from 'expo-av';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/Colors';

export default function Social() {


  const clickSound = useRef<Audio.Sound | null>(null);

useEffect(() => {
  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/images/AppImages/Close.mp3')
    );
    clickSound.current = sound;
  };
  loadSound();

  return () => {
    clickSound.current?.unloadAsync();
  };
}, []);
const playClick = async () => {
  if (clickSound.current) {
    await clickSound.current.replayAsync();
  }
};



  const openLink = (url: string) => {
  Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
};

  return (
    <View
      style={[
        styles.container
      ]}
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
         source={require('../../assets/images/AppImages/SocialBackground.png')}
         style={{ width: '95%', height: '97%', position: 'absolute',top: "1.25%", right: "2.5%",borderRadius: 40,  }}
       
       /> 


             {/* Exit Button */}
                    <View style={styles.box}> 
                      <Pressable
                        onPress={() =>  {
                          
                          router.push('/');
                          playClick();
            
                        }}
                        style={styles.InsideBox}>
                        <Text style={{ color: 'Black', fontSize: 37, fontWeight: 'bold' }}>Back</Text>
                      </Pressable>
                    </View>
           
                    {/* Box 1 */}
                    <View style={styles.box}>
                      <Pressable
                        onPress={() => 
                          {
                            
                            openLink('https://www.instagram.com/tamuskaters/?hl=en');
                            playClick();
                          }
                        
                        
                        }
                        style={[styles.InstagramBox, ]}>

                        <Image
                                source={require('../../assets/images/AppImages/InstagramLogo.png')}
                                style={{ width: 100, height: 75 }}
                                resizeMode="contain"
                                
                                
                              />
                        <Text style={styles.InstagramText}> TAMU SKATE</Text>
                        <Text style={styles.ClickInstagramText}> Click</Text>
                      </Pressable>
                    </View>



                    <View style={styles.box}>
                      <Pressable
                        onPress={() => 
                          {
                            
                            openLink('https://discord.com/invite/5sVdF6Fwkj?fbclid=PAVERFWANhm_tleHRuA2FlbQIxMQABpzP-uX8-RHxO0hL_gSG4Q6PRab_YZderWpw3FsvQ5335MRE-c602ajpgqyAc_aem_s6qVEYkGI3B30y8eSON-ag');
                            playClick();
                          }
                        
                        
                        }
                        style={[styles.InstagramBox2, ]}>

                        <Image
                                source={require('../../assets/images/AppImages/DiscordLogo.png')}
                                style={{ width: 100, height: 75 }}
                                resizeMode="contain"
                                
                                
                              />
                        <Text style={styles.InstagramText2}> TAMU SKATE's Discord</Text>
                        <Text style={styles.ClickInstagramText2}> Click</Text>
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
    height: '90%',
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
    height: 60,

    borderRadius: 200, // <-- rounded corners
    position: 'absolute',
    left: '2%',
  },
  InstagramBox: {
    width: 200,
    height: 150,
    top: 200,
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
    InstagramText: {
        position: 'absolute',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 80,
        color: '#E1306C',
        textShadowColor: 'black',      // border color
  textShadowOffset: { width: 1, height: 1 }, // direction
  textShadowRadius: 2,  
    },
    ClickInstagramText: {
        position: 'absolute',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 80,
        right: 75,
        top: -16,
        color: '#30c9e1ff',
        textShadowColor: 'black',      // border color
  textShadowOffset: { width: 1, height: 1 }, // direction
  textShadowRadius: 2,  
    },

      InstagramBox2: {
    width: 200,
    height: 150,
    top: 330,
},
    InstagramText2: {
        position: 'absolute',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 80,
        color: '#2ab8ffff',
        textShadowColor: 'black',      // border color
  textShadowOffset: { width: 1, height: 1 }, // direction
  textShadowRadius: 2,  
    },
    ClickInstagramText2: {
        position: 'absolute',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 80,
        right: 75,
        top: -16,
        color: '#30c9e1ff',
        textShadowColor: 'black',      // border color
  textShadowOffset: { width: 1, height: 1 }, // direction
  textShadowRadius: 2,  
    },
  
  
});
