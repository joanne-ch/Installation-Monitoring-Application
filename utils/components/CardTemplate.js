import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

function CardTemplate(props) {
  
  return (
    <View style={styles.card}>
      <Text style = {styles.applicationText}>{props.application}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 105,
    borderRadius: 30,
    borderColor: "rgba( 31, 38, 135, 0.05 )",
    borderWidth: 2,
    margin: "5%",
    minWidth: "60%",
    backgroundColor: 'rgba( 218, 223, 225, 0.1 )',
    marginTop: "3%",
    marginBottom: "2%"
  },
  applicationText:{
    fontSize: 20,
  }
})

export default CardTemplate;