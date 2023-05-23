// @ts-nocheck
import { Dimensions, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { Card, Text, useTheme } from 'react-native-paper'

type props = {
  title: string
  description: string
  image_url: string
  content: string
}
const DetailsCard = (props: props) => {
  const theme = useTheme()
  return (
    <ScrollView>
      <Text
        style={{ marginVertical: 10, color: 'black' }}
        variant="headlineMedium"
      >
        {props.title}
      </Text>
      <Card
        style={{ backgroundColor: theme.colors.background }}
        contentStyle={{ width: Dimensions.get('window').width }}
      >
        {props.image_url && <Card.Cover source={{ uri: props.image_url }} />}
        <Card.Content>
          <Text
            textBreakStrategy="highQuality"
            variant="headlineSmall"
            style={{ marginVertical: 10, textAlign: 'left' }}
          >
            {props.content}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

export default DetailsCard

const styles = StyleSheet.create({})
