// @ts-nocheck
import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { NewsData } from '../utils/types'
import { Button, Card, useTheme } from 'react-native-paper'
import { NavigationProp } from '@react-navigation/native'

type props = {
  title: string
  description: string
  image_url: string
  content: string
  navigation: NavigationProp<Route>
  handleDelete?: (val: string) => void
}

const CardItem = (props: props) => {
  const theme = useTheme()

  const handlePress = () => {
    props.navigation.navigate('NewsOverView', {
      title: props.title,
      description: props.description,
      content: props.content,
      image_url: props.image_url
    })
  }
  return (
    <Pressable onPress={handlePress}>
      <Card
        style={{
          marginVertical: 10,
          backgroundColor: theme.colors.elevation.level5
        }}
      >
        <Card.Cover borderRadius={10} source={{ uri: props.image_url }} />
        <Card.Title
          title={props.title}
          subtitle={props.description.split('/n')[0]}
          titleNumberOfLines={1}
        ></Card.Title>
        {props.handleDelete && (
          <Card.Actions>
            <Button
              onPress={() =>
                props.handleDelete && props.handleDelete(props.title)
              }
            >
              Delete
            </Button>
          </Card.Actions>
        )}
      </Card>
    </Pressable>
  )
}

export default CardItem

const styles = StyleSheet.create({})
