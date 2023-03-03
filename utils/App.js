import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image, Dimensions, Button } from 'react-native'
import {NativeModules} from 'react-native'
import CardTemplate from './components/CardTemplate';

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

function App() {
  const {PackageModule} = NativeModules

  const [data, setData] = React.useState([]);
  //toggle render variable, to rerender page
  const [render, setRender] = React.useState(true);

  const getData = async () => { 
    try{
        let asyncUnitSet = await PackageModule.findPlayStoreApplication(); 
        setData(asyncUnitSet)
    }catch(e){
        console.log(e)
    }
  }

  

  //Call the Java Module in React Native, to get list of Play Store installed application.
  React.useEffect( ()=>{
    getData();
  },[])

  //Function to generate a Card for each installed temaplte
  const installedApplication = (data) => {
    return(
      <>
        {data.map((apps)=>(
          <CardTemplate key = {apps} application = {apps}></CardTemplate>
        ))}

      </>
    )
  }
  
  const URI = 'https://i.ibb.co/M9LB3Kq/Glassmorphism-Background.png'

  return (
    <View style={styles.body}>

    <View>
        <Image style={styles.backgroundPicture} source={{ uri: URI }} />
    </View>

    <ScrollView style={styles.scrollBody}>
      <View style={styles.mainContent}>
        <Text style = {styles.heading}>List of Installed Application</Text>
        {installedApplication(data)}
        
      </View>
      <Button title="refresh" onClick={()=>setRender(!render)}></Button>
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor: 'transparent'
  },
  backgroundPicture: {
    height: height,
    width: width,
    position: 'absolute',
    top:0,
    left:0
  },
  scrollBody:{
    flex:1
  },
  mainContent:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "10%"
  },
  heading:{
    fontSize:20,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
})

export default App